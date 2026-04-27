export interface UserStats {
  sessionsCompleted: number;
  totalPracticeMinutes: number;
  streakDays: number;
  streakLastDate: string | null; // ISO date string (YYYY-MM-DD)
  weeklyMinutes: number;
  weeklyGoalMinutes: number;
  weeklySessionCount: number;
  weeklyStartDate: string | null; // ISO date string for start of current tracking week
  latestScores: { fluency: number; grammar: number; vocabulary: number; clarity: number; pronunciation: number }[];
  cefrLevel: string | null;
  lastScenarioId: string | null;
  completedScenarioIds: string[];
}

const STORAGE_KEY = 'jobenglish_stats';

function defaultStats(): UserStats {
  return {
    sessionsCompleted: 0,
    totalPracticeMinutes: 0,
    streakDays: 0,
    streakLastDate: null,
    weeklyMinutes: 0,
    weeklyGoalMinutes: 45,
    weeklySessionCount: 0,
    weeklyStartDate: null,
    latestScores: [],
    cefrLevel: null,
    lastScenarioId: null,
    completedScenarioIds: [],
  };
}

/** Returns the Monday of the week containing the given date (ISO string YYYY-MM-DD). */
function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay(); // 0=Sun, 1=Mon ...
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  d.setDate(d.getDate() - diff);
  return d.toISOString().split('T')[0];
}

export function getStats(): UserStats {
  if (typeof window === 'undefined') return defaultStats();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultStats();
  try {
    const parsed = JSON.parse(raw) as UserStats;
    // Ensure completedScenarioIds exists (migration for older data)
    if (!Array.isArray(parsed.completedScenarioIds)) {
      parsed.completedScenarioIds = [];
    }
    // Reset weekly stats if the stored week is stale
    const today = new Date().toISOString().split('T')[0];
    const currentWeekStart = getWeekStart(today);
    if (parsed.weeklyStartDate && parsed.weeklyStartDate !== currentWeekStart) {
      parsed.weeklyMinutes = 0;
      parsed.weeklySessionCount = 0;
      parsed.weeklyStartDate = currentWeekStart;
    }
    return parsed;
  } catch {
    return defaultStats();
  }
}

export function recordSession(
  durationSeconds: number,
  scores: { fluency: number; grammar: number; vocabulary: number; clarity: number; pronunciation: number },
  cefrEstimate: string,
  scenarioId: string,
) {
  const stats = getStats();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const minutes = Math.max(1, Math.round(durationSeconds / 60));

  stats.sessionsCompleted++;
  stats.totalPracticeMinutes += minutes;
  stats.cefrLevel = cefrEstimate;
  stats.lastScenarioId = scenarioId;

  // Track completed scenarios
  if (!stats.completedScenarioIds.includes(scenarioId)) {
    stats.completedScenarioIds.push(scenarioId);
  }

  // Weekly tracking — reset if new week
  const currentWeekStart = getWeekStart(today);
  if (!stats.weeklyStartDate || stats.weeklyStartDate !== currentWeekStart) {
    stats.weeklyMinutes = 0;
    stats.weeklySessionCount = 0;
    stats.weeklyStartDate = currentWeekStart;
  }
  stats.weeklyMinutes += minutes;
  stats.weeklySessionCount++;

  // Update streak
  if (stats.streakLastDate === today) {
    // Already practiced today — no streak change
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stats.streakLastDate === yesterdayStr) {
      stats.streakDays++;
    } else if (!stats.streakLastDate) {
      stats.streakDays = 1;
    } else {
      stats.streakDays = 1; // Reset streak — missed a day
    }
    stats.streakLastDate = today;
  }

  // Keep last 4 score sets for trend display
  stats.latestScores.push(scores);
  if (stats.latestScores.length > 4) stats.latestScores.shift();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

/** Map a CEFR level code to a human-readable label. */
export function cefrLabel(level: string | null, lang: 'pt' | 'en'): string {
  if (!level) return '';
  const labels: Record<string, Record<'pt' | 'en', string>> = {
    A1: { pt: 'iniciante', en: 'beginner' },
    A2: { pt: 'elementar', en: 'elementary' },
    B1: { pt: 'intermedi\u00e1rio', en: 'intermediate' },
    B2: { pt: 'intermedi\u00e1rio-avan\u00e7ado', en: 'upper-intermediate' },
    C1: { pt: 'avan\u00e7ado', en: 'advanced' },
    C2: { pt: 'proficiente', en: 'proficient' },
  };
  return labels[level]?.[lang] ?? level;
}
