import type { OrgProfile } from "../state/orgProfile";
import { matchPolicyOptions } from "../data/protectionLevels";

const FIELD_RE = /\[([^[\]]+)\]/g;
const MAX_LABEL_CONTEXT = 60;

/** Generic "fill in the blank" markers like "___" — every occurrence is a distinct field,
 * unlike named placeholders (e.g. "[מיקום]") which repeat the same value everywhere they appear. */
function isGenericBlank(raw: string): boolean {
  return /^_+$/.test(raw.trim());
}

/** For a generic blank, use the text right before it (since the last sentence break) as a
 * human label — e.g. "חינוך: [___]" is labeled "חינוך" instead of the meaningless "___". */
function contextLabel(body: string, matchIndex: number, occurrence: number): string {
  const before = body.slice(0, matchIndex);
  const delimIndex = Math.max(
    before.lastIndexOf("."),
    before.lastIndexOf(";"),
    before.lastIndexOf("\n"),
    before.lastIndexOf("]")
  );
  const ctx = before
    .slice(delimIndex + 1)
    .trim()
    .replace(/^[,،]\s*/, "")
    .replace(/:$/, "")
    .trim();
  if (ctx && ctx.length <= MAX_LABEL_CONTEXT) return ctx;
  return `פרט ${occurrence}`;
}

/** Many bracket placeholders already encode a closed set of alternatives, e.g.
 * "[חירום/פעילות מצומצמת]" — split on "/" and treat as quick-pick options, unless any
 * part is itself a nested blank/placeholder (too complex to offer as a single chip). */
function parseOptions(raw: string): string[] | null {
  if (!raw.includes("/")) return null;
  const parts = raw
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  if (parts.some((p) => p.includes("___") || p.includes("[") || p.includes("]"))) return null;
  return parts;
}

interface Occurrence {
  /** key used to store/substitute this field's value */
  key: string;
  /** human label shown above the input */
  label: string;
  isGlobal: boolean;
  options: string[] | null;
  /** true when `options` came from the condensed protection-policy summary, not the template text itself */
  isPolicyOptions: boolean;
  matchText: string;
  index: number;
}

/** Walks every [placeholder] occurrence in order. Generic blanks ("___") get a unique key per
 * occurrence; named placeholders (e.g. "[מיקום]") share one key across all their occurrences,
 * since those really do mean "repeat this same value everywhere it appears". */
function walkOccurrences(body: string): Occurrence[] {
  const result: Occurrence[] = [];
  let blankCount = 0;
  for (const m of body.matchAll(FIELD_RE)) {
    const raw = m[1];
    const index = m.index ?? 0;
    if (isGenericBlank(raw)) {
      blankCount += 1;
      const label = contextLabel(body, index, blankCount);
      const policyOptions = matchPolicyOptions(label);
      result.push({
        key: `${raw}#${blankCount}`,
        label,
        isGlobal: false,
        options: policyOptions,
        isPolicyOptions: policyOptions !== null,
        matchText: m[0],
        index,
      });
    } else {
      const isGlobal = GLOBAL_FIELD_KEYS.has(raw);
      const nativeOptions = isGlobal ? null : parseOptions(raw);
      const policyOptions = isGlobal || nativeOptions ? null : matchPolicyOptions(raw);
      result.push({
        key: raw,
        label: raw,
        isGlobal,
        options: nativeOptions ?? policyOptions,
        isPolicyOptions: policyOptions !== null,
        matchText: m[0],
        index,
      });
    }
  }
  return result;
}

export const GLOBAL_FIELD_KEYS = new Set(["שם הרשות", "מוקד", "תאריך", "שעה"]);

export interface ParsedField {
  key: string;
  label: string;
  isGlobal: boolean;
  options: string[] | null;
  isPolicyOptions: boolean;
}

/** Returns unique placeholder fields in a template body, in order of first appearance. */
export function extractFields(body: string): ParsedField[] {
  const seen = new Set<string>();
  const fields: ParsedField[] = [];
  for (const { key, label, isGlobal, options, isPolicyOptions } of walkOccurrences(body)) {
    if (seen.has(key)) continue;
    seen.add(key);
    fields.push({ key, label, isGlobal, options, isPolicyOptions });
  }
  return fields;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Computed once per compose session so date/time stay stable while filling the form. */
export function autoNow(): { date: string; time: string } {
  const now = new Date();
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return { date, time };
}

/** Prefill values for the global fields, from the saved org profile and the current clock. */
export function globalDefaults(profile: OrgProfile): Record<string, string> {
  const { date, time } = autoNow();
  return {
    "שם הרשות": profile.orgName,
    "מוקד": profile.hotline,
    "תאריך": date,
    "שעה": time,
  };
}

/** Substitutes every [field] occurrence in the body with its value, keyed per-occurrence for
 * generic blanks so repeated "[___]" markers in the same message get independent answers. */
export function renderMessage(body: string, values: Record<string, string>): string {
  const parts: string[] = [];
  let lastIndex = 0;
  for (const { key, matchText, index } of walkOccurrences(body)) {
    parts.push(body.slice(lastIndex, index));
    const value = values[key];
    parts.push(value && value.trim() ? value : matchText);
    lastIndex = index + matchText.length;
  }
  parts.push(body.slice(lastIndex));
  return parts.join("");
}

/** True once every field in the body has a non-empty value. */
export function isComplete(body: string, values: Record<string, string>): boolean {
  return extractFields(body).every((f) => Boolean(values[f.key]?.trim()));
}
