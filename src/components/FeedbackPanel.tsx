import type { SpeechFeedback } from '../lib/claude';

interface Props {
  feedback: SpeechFeedback;
}

function ScoreBar({ label, score, feedback }: { label: string; score: number; feedback: string }) {
  const color = score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-400';
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}/10</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{feedback}</p>
    </div>
  );
}

export default function FeedbackPanel({ feedback }: Props) {
  const overall = feedback.overallScore;
  const emoji = overall >= 9 ? '🏆' : overall >= 7 ? '🌟' : overall >= 5 ? '📈' : '💪';
  const label = overall >= 9 ? 'Outstanding!' : overall >= 7 ? 'Great work!' : overall >= 5 ? 'Good progress!' : 'Keep practising!';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <div>
            <div className="text-lg font-bold text-gray-900">{label}</div>
            <div className="text-sm text-gray-500">Overall score: {overall}/10</div>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="px-6 py-5">
        <ScoreBar label="Opening" score={feedback.openingScore} feedback={feedback.openingFeedback} />
        <ScoreBar label="Structure" score={feedback.structureScore} feedback={feedback.structureFeedback} />
        <ScoreBar label="Closing" score={feedback.closingScore} feedback={feedback.closingFeedback} />

        {/* Tips */}
        <div className="mt-4 bg-amber-50 rounded-xl p-4">
          <div className="text-sm font-semibold text-amber-800 mb-2">🎯 3 Things to Try Next Time</div>
          <ul className="space-y-1.5">
            {feedback.tips.map((tip, i) => (
              <li key={i} className="text-sm text-amber-900 flex gap-2">
                <span className="font-bold shrink-0">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
