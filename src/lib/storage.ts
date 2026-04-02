export interface SessionRecord {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  timestamp: number;
  topic: string;
  mode: 'free-write' | 'builder';
  speechText: string;
  scores: {
    opening: number;
    structure: number;
    closing: number;
    overall: number;
  };
  tips: string[];
}

export interface AppSettings {
  apiKey: string;
  reminderEnabled: boolean;
  reminderTime: string; // HH:MM format
  reminderLastSent: string; // ISO date YYYY-MM-DD
}

const SESSIONS_KEY = 'tt_sessions';
const SETTINGS_KEY = 'tt_settings';
const STREAK_KEY = 'tt_streak';

// ── Sessions ──────────────────────────────────────────────

export function getSessions(): SessionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSession(session: Omit<SessionRecord, 'id' | 'date' | 'timestamp'>): SessionRecord {
  const sessions = getSessions();
  const now = new Date();
  const record: SessionRecord = {
    ...session,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: now.toISOString().slice(0, 10),
    timestamp: now.getTime(),
  };
  sessions.unshift(record);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  updateStreak(record.date);
  return record;
}

// ── Streak ────────────────────────────────────────────────

export interface StreakData {
  current: number;
  longest: number;
  lastPracticeDate: string; // YYYY-MM-DD
}

export function getStreak(): StreakData {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY) || 'null') ?? { current: 0, longest: 0, lastPracticeDate: '' };
  } catch {
    return { current: 0, longest: 0, lastPracticeDate: '' };
  }
}

function updateStreak(date: string): void {
  const streak = getStreak();
  if (streak.lastPracticeDate === date) return; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newCurrent = streak.lastPracticeDate === yesterdayStr ? streak.current + 1 : 1;
  const updated: StreakData = {
    current: newCurrent,
    longest: Math.max(streak.longest, newCurrent),
    lastPracticeDate: date,
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
}

// ── Settings ──────────────────────────────────────────────

export function getSettings(): AppSettings {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null') ?? {
      apiKey: '',
      reminderEnabled: false,
      reminderTime: '09:00',
      reminderLastSent: '',
    };
  } catch {
    return { apiKey: '', reminderEnabled: false, reminderTime: '09:00', reminderLastSent: '' };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── Practice days for heatmap ─────────────────────────────

export function getPracticeDays(): Set<string> {
  return new Set(getSessions().map(s => s.date));
}

// ── Notes ──────────────────────────────────────────────────

import type { CategorizedNote } from './claude';

const NOTES_KEY = 'tt_notes';

export function getNotes(): CategorizedNote[] {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveNotes(notes: CategorizedNote[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function deleteNote(id: string): void {
  const updated = getNotes().filter(n => n.id !== id);
  localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
}
