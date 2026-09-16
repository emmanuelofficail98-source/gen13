export interface SavedCreation {
  id: string;
  kind: "video" | "image";
  title: string;
  src: string;
  createdAt: string;
}

const KEY = "gen12.creations.v1";
const MAX = 30;

export function loadCreations(): SavedCreation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedCreation[]) : [];
  } catch {
    return [];
  }
}

export function saveCreation(item: Omit<SavedCreation, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const entry: SavedCreation = {
    ...item,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  try {
    const next = [entry, ...loadCreations()].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage full (large images) — keep only the newest item.
    try {
      window.localStorage.setItem(KEY, JSON.stringify([entry]));
    } catch {
      /* ignore */
    }
  }
}

export function removeCreation(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY,
    JSON.stringify(loadCreations().filter((c) => c.id !== id)),
  );
}
