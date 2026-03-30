import { NavLink } from 'react-router-dom';
import { getStreak } from '../lib/storage';

const links = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/learn', label: 'Learn', icon: '📖' },
  { to: '/practice', label: 'Practice', icon: '🎤' },
  { to: '/builder', label: 'Builder', icon: '🏗️' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Navigation() {
  const streak = getStreak();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <span className="font-semibold text-gray-900 text-sm hidden sm:block">Table Topics Coach</span>
          </div>

          <div className="flex items-center gap-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                <span className="hidden md:block">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {streak.current > 0 && (
            <div className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span>🔥</span>
              <span>{streak.current}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
