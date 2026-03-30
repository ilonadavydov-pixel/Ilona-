import type { Topic } from '../lib/topics';

interface Props {
  topic: Topic;
  onNew: () => void;
  showHint?: boolean;
}

export default function TopicCard({ topic, onNew, showHint = true }: Props) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wide">
          {topic.category}
        </span>
        <button
          onClick={onNew}
          className="text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
        >
          New Topic ↻
        </button>
      </div>
      <p className="text-xl font-semibold leading-snug mb-3">{topic.question}</p>
      {showHint && topic.hint && (
        <p className="text-sm text-indigo-200 italic">💡 {topic.hint}</p>
      )}
    </div>
  );
}
