import type { StreakData } from '../lib/storage';

interface Props {
  streak: StreakData;
  large?: boolean;
}

export default function StreakBadge({ streak, large = false }: Props) {
  if (streak.current === 0) {
    return (
      <div className={`flex items-center gap-2 text-gray-400 ${large ? 'text-base' : 'text-sm'}`}>
        <span>🎤</span>
        <span>Start your streak today!</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${large ? '' : ''}`}>
      <div className={`flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full ${large ? 'px-5 py-2.5' : 'px-3 py-1.5'}`}>
        <span className={large ? 'text-2xl' : 'text-base'}>🔥</span>
        <div>
          <div className={`font-bold text-orange-700 leading-none ${large ? 'text-2xl' : 'text-sm'}`}>
            {streak.current} day{streak.current !== 1 ? 's' : ''}
          </div>
          {large && <div className="text-xs text-orange-500">current streak</div>}
        </div>
      </div>
      {large && streak.longest > streak.current && (
        <div className="text-xs text-gray-400">Best: {streak.longest} days</div>
      )}
    </div>
  );
}
