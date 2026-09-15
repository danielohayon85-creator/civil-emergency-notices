import { describe, it, expect } from "vitest";
import { extractFields, renderMessage, isComplete, globalDefaults } from "./templateEngine";

describe("extractFields", () => {
  it("finds unique fields in order, marking globals", () => {
    const body = "[שם הרשות] מודיעה כי [מיקום] נסגר. [שם הרשות] תעדכן.";
    const fields = extractFields(body);
    expect(fields.map((f) => f.key)).toEqual(["שם הרשות", "מיקום"]);
    expect(fields[0].isGlobal).toBe(true);
    expect(fields[1].isGlobal).toBe(false);
  });
});

describe("renderMessage", () => {
  it("substitutes every occurrence of a repeated named field with the same value", () => {
    const body = "[שם הרשות] מודיעה: [שם הרשות] פועלת.";
    const out = renderMessage(body, { "שם הרשות": "עיריית לדוגמה" });
    expect(out).toBe("עיריית לדוגמה מודיעה: עיריית לדוגמה פועלת.");
  });

  it("leaves an unfilled field bracket untouched", () => {
    const body = "פינוי לכיוון [נקודת קליטה].";
    const out = renderMessage(body, {});
    expect(out).toBe("פינוי לכיוון [נקודת קליטה].");
  });

  it("treats repeated generic ___ blanks in one template as independent fields", () => {
    const body = "חינוך: [___]. תחבורה: [___].";
    const fields = extractFields(body);
    expect(fields).toHaveLength(2);
    expect(fields[0].label).toBe("חינוך");
    expect(fields[1].label).toBe("תחבורה");

    const out = renderMessage(body, {
      [fields[0].key]: "לימודים כרגיל",
      [fields[1].key]: "ללא שינוי",
    });
    expect(out).toBe("חינוך: לימודים כרגיל. תחבורה: ללא שינוי.");
  });
});

describe("isComplete", () => {
  it("is false until every field has a non-empty value", () => {
    const body = "[שם הרשות] ב[מיקום]";
    expect(isComplete(body, { "שם הרשות": "עירייה" })).toBe(false);
    expect(isComplete(body, { "שם הרשות": "עירייה", "מיקום": "רחוב הרצל" })).toBe(true);
    expect(isComplete(body, { "שם הרשות": "עירייה", "מיקום": "   " })).toBe(false);
  });
});

describe("globalDefaults", () => {
  it("prefills org name and hotline from the profile, plus a current date/time", () => {
    const defaults = globalDefaults({ orgName: "מועצה אזורית", hotline: "106" });
    expect(defaults["שם הרשות"]).toBe("מועצה אזורית");
    expect(defaults["מוקד"]).toBe("106");
    expect(defaults["תאריך"]).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(defaults["שעה"]).toMatch(/^\d{2}:\d{2}$/);
  });
});
