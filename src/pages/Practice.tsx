import { useState, useEffect, useRef } from 'react';
import TopicCard from '../components/TopicCard';
import FeedbackPanel from '../components/FeedbackPanel';
import { getRandomTopic } from '../lib/topics';
import type { Topic } from '../lib/topics';
import { getSpeechFeedback } from '../lib/claude';
import type { SpeechFeedback } from '../lib/claude';
import { saveSession } from '../lib/storage';
import { Link } from 'react-router-dom';

const TIMER_SECONDS = 120;

export default function Practice() {
  const [topic, setTopic] = useState<Topic>(() => getRandomTopic());
  const [speech, setSpeech] = useState('');
  const [feedback, setFeedback] = useState<SpeechFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timeLeft]);

  function handleNewTopic() {
    setTopic(t => getRandomTopic(t.id));
    setSpeech('');
    setFeedback(null);
    setError('');
    setTimerActive(false);
    setTimeLeft(TIMER_SECONDS);
  }

  function toggleTimer() {
    if (timeLeft === 0) setTimeLeft(TIMER_SECONDS);
    setTimerActive(a => !a);
  }

  async function handleFeedback() {
    if (!speech.trim()) return;
    setLoading(true);
    setError('');
    setFeedback(null);
    try {
      const result = await getSpeechFeedback(topic.question, speech);
      setFeedback(result);
      saveSession({
        topic: topic.question,
        mode: 'free-write',
        speechText: speech,
        scores: {
          opening: result.openingScore,
          structure: result.structureScore,
          closing: result.closingScore,
          overall: result.overallScore,
        },
        tips: result.tips,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerColor = timeLeft <= 20 ? 'text-red-600' : timeLeft <= 60 ? 'text-amber-600' : 'text-gray-700';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Free-Write Practice</h1>
      <p className="text-gray-500 mb-6">Get a topic, write your response, and receive AI coaching on your opening, structure, and closing.</p>

      <TopicCard topic={topic} onNew={handleNewTopic} />

      {/* Timer */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          {timerActive ? '⏸ Pause' : timeLeft < TIMER_SECONDS ? '▶ Resume' : '⏱ Start Timer'}
        </button>
        <span className={`font-mono text-lg font-bold ${timerColor}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
        {timeLeft === 0 && <span className="text-sm text-red-500">Time's up!</span>}
      </div>

      {/* Text area */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Response
          <span className="text-gray-400 font-normal ml-2">({speech.trim().split(/\s+/).filter(Boolean).length} words)</span>
        </label>
        <textarea
          value={speech}
          onChange={e => setSpeech(e.target.value)}
          placeholder="Type your table topic response here. Aim for 150–250 words (about 1–2 minutes of speaking)."
          rows={10}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleFeedback}
          disabled={loading || speech.trim().length < 20}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
        >
          {loading ? 'Analysing…' : 'Get AI Feedback'}
        </button>
        <span className="text-sm text-gray-400">Powered by Claude</span>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}{' '}
          {error.includes('API key') && (
            <Link to="/settings" className="font-semibold underline">Go to Settings</Link>
          )}
        </div>
      )}

      {feedback && (
        <div className="mt-6">
          <FeedbackPanel feedback={feedback} />
        </div>
      )}
    </div>
  );
}
