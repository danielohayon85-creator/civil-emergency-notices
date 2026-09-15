export interface Category {
  id: string;
  order: string; // Hebrew letter, e.g. "א"
  name: string;
}

export interface MessageTemplate {
  id: string;
  categoryId: string;
  number: number | null; // null for the "כריזה" announcements, which are lettered/numbered separately
  title: string;
  body: string; // raw text including [placeholder] tokens
}
