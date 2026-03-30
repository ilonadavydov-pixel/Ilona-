import { useState } from 'react';
import TopicCard from '../components/TopicCard';
import StepProgress from '../components/StepProgress';
import FeedbackPanel from '../components/FeedbackPanel';
import { getRandomTopic } from '../lib/topics';
import type { Topic } from '../lib/topics';
import { OPENING_TECHNIQUES, CLOSING_TECHNIQUES } from '../lib/techniques';
import { getSpeechFeedback } from '../lib/claude';
import type { SpeechFeedback } from '../lib/claude';
import { saveSession } from '../lib/storage';
import { Link } from 'react-router-dom';

const STEPS = [
  { label: 'Opening', icon: '⚡' },
  { label: 'Body', icon: '📐' },
  { label: 'Closing', icon: '🏁' },
  { label: 'Feedback', icon: '🌟' },
];

export default function Builder() {
  const [topic, setTopic] = useState<Topic>(() => getRandomTopic());
  const [step, setStep] = useState(0);
  const [opening, setOpening] = useState('');
  const [body, setBody] = useState('');
  const [closing, setClosing] = useState('');
  const [selectedOpener, setSelectedOpener] = useState(0);
  const [selectedCloser, setSelectedCloser] = useState(0);
  const [feedback, setFeedback] = useState<SpeechFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleNewTopic() {
    setTopic(t => getRandomTopic(t.id));
    setStep(0);
    setOpening('');
    setBody('');
    setClosing('');
    setFeedback(null);
    setError('');
  }

  async function handleGetFeedback() {
    const fullSpeech = `${opening}\n\n${body}\n\n${closing}`.trim();
    setLoading(true);
    setError('');
    try {
      const result = await getSpeechFeedback(topic.question, fullSpeech);
      setFeedback(result);
      saveSession({
        topic: topic.question,
        mode: 'builder',
        speechText: fullSpeech,
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Speech Builder</h1>
      <p className="text-gray-500 mb-6">Build your speech step by step with technique tips at every stage.</p>

      <TopicCard topic={topic} onNew={handleNewTopic} showHint />

      <div className="mt-6">
        <StepProgress steps={STEPS} current={step} />
      </div>

      {/* Step 0: Opening */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Craft Your Opening</h2>
          <p className="text-sm text-gray-500 mb-3">Choose a technique, then write your first 1–3 sentences.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {OPENING_TECHNIQUES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setSelectedOpener(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  i === selectedOpener
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                }`}
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 mb-4 text-sm">
            <div className="font-semibold text-indigo-800 mb-1">{OPENING_TECHNIQUES[selectedOpener].name}</div>
            <p className="text-indigo-700 mb-2">{OPENING_TECHNIQUES[selectedOpener].what}</p>
            <p className="italic text-indigo-600">e.g. "{OPENING_TECHNIQUES[selectedOpener].example}"</p>
          </div>

          <textarea
            value={opening}
            onChange={e => setOpening(e.target.value)}
            placeholder="Write your opening here…"
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <button
            onClick={() => setStep(1)}
            disabled={opening.trim().length < 5}
            className="mt-3 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
          >
            Next: Build the Body →
          </button>
        </div>
      )}

      {/* Step 1: Body */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Build the Body</h2>
          <p className="text-sm text-gray-500 mb-4">This is where your speech lives. Use PREP or the Rule of Three to organize your main point.</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-indigo-50 rounded-xl p-3 text-sm">
              <div className="font-semibold text-indigo-800 mb-2">📐 PREP Reminder</div>
              <ul className="space-y-1 text-indigo-700">
                <li><strong>P</strong>oint — State your main idea</li>
                <li><strong>R</strong>eason — Why do you believe it?</li>
                <li><strong>E</strong>xample — Tell a story or give an example</li>
                <li><strong>P</strong>oint — Restate your idea</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-sm">
              <div className="font-semibold text-purple-800 mb-2">3️⃣ Rule of Three</div>
              <p className="text-purple-700">Find three angles on the topic: three reasons, three moments, three people affected.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl px-4 py-2.5 mb-3 text-sm text-gray-500 border border-gray-200">
            <strong>Your opening:</strong> {opening}
          </div>

          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write the body of your speech here. This should be your longest section — 60–90 seconds of content…"
            rows={7}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => setStep(0)} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors">
              ← Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={body.trim().length < 10}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              Next: Write the Closing →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Closing */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Write Your Closing</h2>
          <p className="text-sm text-gray-500 mb-3">The last thing they hear is the thing they remember. Make it land.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {CLOSING_TECHNIQUES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setSelectedCloser(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  i === selectedCloser
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
                }`}
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-4 text-sm">
            <div className="font-semibold text-purple-800 mb-1">{CLOSING_TECHNIQUES[selectedCloser].name}</div>
            <p className="text-purple-700 mb-2">{CLOSING_TECHNIQUES[selectedCloser].what}</p>
            <p className="italic text-purple-600">e.g. "{CLOSING_TECHNIQUES[selectedCloser].example}"</p>
          </div>

          <textarea
            value={closing}
            onChange={e => setClosing(e.target.value)}
            placeholder="Write your closing here — 1–3 powerful sentences…"
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => setStep(1)} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors">
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={closing.trim().length < 5}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              Review & Get Feedback →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Feedback */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your Complete Speech</h2>
          <p className="text-sm text-gray-500 mb-4">Here's what you built. Read it aloud, then get AI coaching.</p>

          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
            <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Opening</div>
            <p className="mb-4">{opening}</p>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Body</div>
            <p className="mb-4">{body}</p>
            <div className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">Closing</div>
            <p>{closing}</p>
          </div>

          <div className="flex gap-2 mb-4">
            <button onClick={() => setStep(2)} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors">
              ← Edit Closing
            </button>
            <button
              onClick={handleGetFeedback}
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              {loading ? 'Analysing…' : 'Get AI Feedback'}
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}{' '}
              {error.includes('API key') && (
                <Link to="/settings" className="font-semibold underline">Go to Settings</Link>
              )}
            </div>
          )}

          {feedback && <FeedbackPanel feedback={feedback} />}

          <button
            onClick={() => {
              handleNewTopic();
              setStep(0);
            }}
            className="mt-4 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors"
          >
            Try a New Topic ↻
          </button>
        </div>
      )}
    </div>
  );
}
