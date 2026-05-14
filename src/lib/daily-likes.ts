// Persistence helpers for the Circle swipe daily-like limit and matches.
// All values stored in localStorage; resets automatically on date change.

export const DAILY_LIMIT = 5;

const LIKES_KEY = "circle:dailyLikes";
const CONVOS_KEY = "circle:matchedConvos";
const READ_KEY = "circle:readMatches";

export type DailyState = {
  date: string; // YYYY-MM-DD
  count: number; // likes used today
  matches: string[]; // profile ids matched today
};

export type MatchedConvo = {
  id: string;
  profileId: string;
  name: string;
  role: string;
  avatar: string; // image URL or gradient
  city: string;
  createdAt: number;
};

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getDailyState(): DailyState {
  if (typeof window === "undefined") {
    return { date: todayKey(), count: 0, matches: [] };
  }
  const today = todayKey();
  const state = safeParse<DailyState>(localStorage.getItem(LIKES_KEY), {
    date: today,
    count: 0,
    matches: [],
  });
  if (state.date !== today) {
    const fresh = { date: today, count: 0, matches: [] };
    localStorage.setItem(LIKES_KEY, JSON.stringify(fresh));
    return fresh;
  }
  return state;
}

export function incrementLike(): DailyState {
  const state = getDailyState();
  const next = { ...state, count: state.count + 1 };
  localStorage.setItem(LIKES_KEY, JSON.stringify(next));
  return next;
}

export function addMatchToday(profileId: string): DailyState {
  const state = getDailyState();
  if (state.matches.includes(profileId)) return state;
  const next = { ...state, matches: [...state.matches, profileId] };
  localStorage.setItem(LIKES_KEY, JSON.stringify(next));
  return next;
}

export function getMatchedConvos(): MatchedConvo[] {
  if (typeof window === "undefined") return [];
  return safeParse<MatchedConvo[]>(localStorage.getItem(CONVOS_KEY), []);
}

export function addMatchedConvo(c: MatchedConvo): MatchedConvo[] {
  const list = getMatchedConvos();
  if (list.some((x) => x.id === c.id)) return list;
  const next = [c, ...list];
  localStorage.setItem(CONVOS_KEY, JSON.stringify(next));
  return next;
}

export function getReadMatches(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(localStorage.getItem(READ_KEY), []);
}

export function markMatchRead(convoId: string) {
  if (typeof window === "undefined") return;
  const list = getReadMatches();
  if (list.includes(convoId)) return;
  localStorage.setItem(READ_KEY, JSON.stringify([...list, convoId]));
}

export function msUntilMidnight(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
