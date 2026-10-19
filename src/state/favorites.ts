const STORAGE_KEY = "civil-notices/favorites";

export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(templateId: string): boolean {
  return loadFavorites().includes(templateId);
}

export function toggleFavorite(templateId: string): string[] {
  const current = loadFavorites();
  const next = current.includes(templateId)
    ? current.filter((id) => id !== templateId)
    : [...current, templateId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
