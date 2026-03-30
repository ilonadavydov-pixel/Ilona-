import { Link } from 'react-router-dom';
import { getStreak } from '../lib/storage';
import StreakBadge from '../components/StreakBadge';

const cards = [
  {
    to: '/learn',
    icon: '📖',
    title: 'Learn',
    desc: 'Master the PREP formula, five opening types, and four closing techniques with examples.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    to: '/practice',
    icon: '🎤',
    title: 'Practice',
    desc: 'Get a random topic, write your full response, and receive AI coaching feedback.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    to: '/builder',
    icon: '🏗️',
    title: 'Builder',
    desc: 'Craft your speech step by step — opening, body, closing — with tips at every stage.',
    color: 'from-purple-500 to-pink-600',
  },
];

export default function Home() {
  const streak = getStreak();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎙️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Table Topics Coach</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Become a confident impromptu speaker. Learn to open with impact, structure your ideas, and close in a way that stays with your audience long after you sit down.
        </p>
        <div className="mt-5 flex justify-center">
          <StreakBadge streak={streak} large />
        </div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {cards.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-xl font-bold mb-1">{card.title}</div>
            <div className="text-sm text-white/80">{card.desc}</div>
          </Link>
        ))}
      </div>

      {/* What are table topics? */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-3">What are Table Topics?</h2>
        <p className="text-gray-600 mb-3">
          Table Topics is a segment of every Toastmasters meeting where members are asked to speak for 1–2 minutes on a topic they have never seen before. It is one of the most powerful exercises in public speaking — because real life rarely gives you a script.
        </p>
        <p className="text-gray-600">
          The best Table Topics speakers share one secret: they have internalized a few simple patterns — a great opening to hook the audience, a clear structure to carry them through, and a memorable closing to make the speech unforgettable. This app teaches you exactly those patterns, and lets you practice them with AI-powered feedback.
        </p>
      </div>
    </div>
  );
}
