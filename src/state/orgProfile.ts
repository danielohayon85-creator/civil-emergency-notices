export interface OrgProfile {
  orgName: string;
  hotline: string;
}

const STORAGE_KEY = "civil-notices/org-profile";

const EMPTY_PROFILE: OrgProfile = { orgName: "", hotline: "" };

export function loadOrgProfile(): OrgProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROFILE;
    const parsed = JSON.parse(raw);
    return { orgName: parsed.orgName ?? "", hotline: parsed.hotline ?? "" };
  } catch {
    return EMPTY_PROFILE;
  }
}

export function saveOrgProfile(profile: OrgProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
