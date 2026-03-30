import { getSessions, getStreak, getPracticeDays } from '../lib/storage';
import StreakBadge from '../components/StreakBadge';
import CalendarHeatmap from '../components/CalendarHeatmap';
import { format } from 'date-fns';

export default function Progress() {
  const sessions = getSessions();
  const streak = getStreak();
  const practiceDays = getPracticeDays();

  const avgScore = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.scores.overall, 0) / sessions.length * 10) / 10
    : null;

  const avgOpening = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.scores.opening, 0) / sessions.length * 10) / 10
    : null;

  const avgClosing = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.scores.closing, 0) / sessions.length * 10) / 10
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Progress</h1>
      <p className="text-gray-500 mb-6">Track your streak, see your history, and watch your scores improve over time.</p>

      {/* Streak + Stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-sm font-semibold text-gray-500 mb-3">Current Streak</div>
          <StreakBadge streak={streak} large />
          {streak.longest > 0 && (
            <div className="mt-3 text-xs text-gray-400">Personal best: {streak.longest} days</div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-sm font-semibold text-gray-500 mb-3">All-time Stats</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{sessions.length}</div>
              <div className="text-xs text-gray-400">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{avgScore ?? '—'}</div>
              <div className="text-xs text-gray-400">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{practiceDays.size}</div>
              <div className="text-xs text-gray-400">Days Active</div>
            </div>
          </div>
          {sessions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-center">
              <div>
                <div className="font-bold text-blue-600">{avgOpening}</div>
                <div className="text-gray-400">Avg Opening</div>
              </div>
              <div>
                <div className="font-bold text-purple-600">{avgClosing}</div>
                <div className="text-gray-400">Avg Closing</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 overflow-x-auto">
        <div className="text-sm font-semibold text-gray-700 mb-4">Practice Activity (last 14 weeks)</div>
        <CalendarHeatmap practiceDays={practiceDays} weeks={14} />
      </div>

      {/* History */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-3">Session History</div>
        {sessions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🎤</div>
            <div className="font-medium">No sessions yet</div>
            <div className="text-sm mt-1">Complete a Practice or Builder session to see your history here.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{s.topic}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {format(new Date(s.timestamp), 'MMM d, yyyy · h:mm a')} · {s.mode === 'free-write' ? '🎤 Free-Write' : '🏗️ Builder'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-indigo-600">{s.scores.overall}</div>
                      <div className="text-xs text-gray-400">Overall</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-blue-50 rounded-lg py-1.5">
                    <div className="font-bold text-blue-700">{s.scores.opening}</div>
                    <div className="text-blue-400">Opening</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-1.5">
                    <div className="font-bold text-gray-700">{s.scores.structure}</div>
                    <div className="text-gray-400">Structure</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg py-1.5">
                    <div className="font-bold text-purple-700">{s.scores.closing}</div>
                    <div className="text-purple-400">Closing</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
