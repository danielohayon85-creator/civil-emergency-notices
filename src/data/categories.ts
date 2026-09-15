import type { Category } from "./types";

export const categories: Category[] = [
  { id: "status-change", order: "א", name: "שינוי מצב ומעבר לחירום" },
  { id: "missiles", order: "ב", name: "ירי טילים ורקטות" },
  { id: "damage-site", order: "ג", name: "זירת הרס, מידע וסיוע" },
  { id: "evacuation", order: "ד", name: "פינוי וקליטת אוכלוסייה" },
  { id: "shelters", order: "ה", name: "מיגון ומקלטים" },
  { id: "electricity", order: "ו", name: "חשמל ורציפות תפקודית" },
  { id: "water-food", order: "ז", name: "מים ומזון" },
  { id: "comms", order: "ח", name: "תקשורת, התרעות ומידע חלופי" },
  { id: "fire", order: "ט", name: "שריפה" },
  { id: "hazmat", order: "י", name: "חומרים מסוכנים" },
  { id: "earthquake", order: "יא", name: "רעידת אדמה" },
  { id: "services", order: "יב", name: "חינוך, עבודה, שירותים ושגרת חירום" },
  { id: "rumors", order: "יג", name: "שמועות, מידע שגוי ורציפות מידע" },
  { id: "volunteers", order: "יד", name: "מתנדבים ואוכלוסיות הזקוקות לסיוע" },
  { id: "recovery", order: "טו", name: "התאוששות וחזרה לשגרה" },
  { id: "infiltration", order: "טז", name: "חדירת מחבלים / חשד לחדירה" },
  { id: "hostile-aircraft", order: "יז", name: "חדירת כלי טיס עוין / כטב\"ם" },
  { id: "floods", order: "יח", name: "שיטפונות והצפות" },
  { id: "announcements", order: "יט", name: "הודעות כריזה נצורות" },
];
