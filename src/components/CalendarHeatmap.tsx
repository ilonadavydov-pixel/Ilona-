import { eachDayOfInterval, format, startOfDay, subDays, getDay } from 'date-fns';

interface Props {
  practiceDays: Set<string>;
  weeks?: number;
}

export default function CalendarHeatmap({ practiceDays, weeks = 14 }: Props) {
  const today = startOfDay(new Date());
  const start = subDays(today, weeks * 7 - 1);
  const days = eachDayOfInterval({ start, end: today });

  // Pad so the grid starts on Sunday
  const startDow = getDay(start);
  const padding = Array(startDow).fill(null);

  const allCells = [...padding, ...days];

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {dayLabels.map(d => (
          <div key={d} className="text-xs text-gray-400 w-4 text-center" style={{ minWidth: 16 }}>{d[0]}</div>
        ))}
      </div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${weeks + 1}, minmax(0, 1fr))` }}
      >
        {/* Re-arrange days into columns (week by week) */}
        {Array.from({ length: weeks + 1 }, (_, col) =>
          Array.from({ length: 7 }, (_, row) => {
            const idx = col * 7 + row;
            const cell = allCells[idx];
            if (!cell) return <div key={`${col}-${row}`} className="w-4 h-4 rounded-sm" />;
            const dateStr = format(cell, 'yyyy-MM-dd');
            const practiced = practiceDays.has(dateStr);
            const isToday = dateStr === format(today, 'yyyy-MM-dd');
            return (
              <div
                key={dateStr}
                title={`${format(cell, 'MMM d')}${practiced ? ' — practiced!' : ''}`}
                className={`w-4 h-4 rounded-sm ${
                  practiced
                    ? 'bg-indigo-500'
                    : isToday
                    ? 'bg-gray-200 ring-2 ring-indigo-400'
                    : 'bg-gray-100'
                }`}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
        <div className="w-3 h-3 rounded-sm bg-gray-100" /> No practice
        <div className="w-3 h-3 rounded-sm bg-indigo-500" /> Practiced
      </div>
    </div>
  );
}
