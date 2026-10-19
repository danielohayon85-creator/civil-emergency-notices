export interface ProtectionLevel {
  name: string;
  education: string;
  workplaces: string;
  gatherings: string;
  essentialEconomy: string;
}

/**
 * Condensed from Home Front Command's official "מדרגי מדיניות ההתגוננות" table.
 * This is a summary for quick-fill purposes only — before relying on exact numbers
 * or edge-case conditions, verify against the current official table.
 */
export const protectionLevels: ProtectionLevel[] = [
  {
    name: "פעילות מלאה",
    education: "פעילות ללא הגבלות",
    workplaces: "פעילות ללא הגבלות",
    gatherings: "התקהלות ללא הגבלות (ניתן לצמצם עד 1,000 איש בשטח פתוח)",
    essentialEconomy: "היערכות ומוכנות",
  },
  {
    name: "פעילות חלקית",
    education: "פעילות במקום עם גישה למרחב מוגן תקני בזמן ההתגוננות",
    workplaces: "פעילות ללא הגבלות, פרט למקבלי קהל – פעילות במבנה/מקום עם גישה למרחב מוגן תקני",
    gatherings: "עד 300 איש במבנה עם גישה למרחב מוגן, עד 100 איש בשטח פתוח; סגירת חופים",
    essentialEconomy: "פעילות במבנה/מקום עם גישה למרחב מוגן תקני",
  },
  {
    name: "פעילות מצומצמת",
    education: "פעילות בתוך/בסמוך למרחב מוגן תקני, ללא פיצול כיתה אורגנית, עד כ-30 תלמידים",
    workplaces: "פעילות במבנה/מקום עם גישה למרחב מוגן תקני; מקבלי קהל – היערכות ומוכנות בלבד",
    gatherings: "עד 100 איש במבנה, עד 50 איש בשטח פתוח (עם גישה למרחב מוגן); סגירת חופים",
    essentialEconomy: "פעילות במבנה/מקום עם גישה למרחב מוגן תקני",
  },
  {
    name: "פעילות הכרחית",
    education: "אין לקיים פעילות",
    workplaces: "אין לקיים פעילות, למעט משק חיוני",
    gatherings: "אין לקיים התקהלות",
    essentialEconomy: "פעילות הכרחית בלבד",
  },
];

/** Checks a field's derived label against the four protection-policy domains and
 * returns the matching official (condensed) phrasing from all 4 levels as quick-pick
 * options, or null if the label isn't about protection policy at all. */
export function matchPolicyOptions(label: string): string[] | null {
  if (label.includes("התגוננות")) return protectionLevels.map((l) => l.name);
  if (label.includes("חינוך")) return protectionLevels.map((l) => l.education);
  if (label.includes("עבודה")) return protectionLevels.map((l) => l.workplaces);
  if (label.includes("התקהלו")) return protectionLevels.map((l) => l.gatherings);
  if (label.includes("משק חיוני")) return protectionLevels.map((l) => l.essentialEconomy);
  return null;
}
