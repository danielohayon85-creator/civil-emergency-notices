const STORAGE_KEY = "civil-notices/recent-templates";
const MAX_RECENT = 8;

export function loadRecentTemplateIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordRecentTemplate(templateId: string): void {
  const current = loadRecentTemplateIds().filter((id) => id !== templateId);
  const next = [templateId, ...current].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
