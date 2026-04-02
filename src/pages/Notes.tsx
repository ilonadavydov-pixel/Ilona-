import { useState, useEffect } from 'react';
import { categorizeNotes, type CategorizedNote, type NoteCategory } from '../lib/claude';
import { getNotes, saveNotes, deleteNote } from '../lib/storage';

const CATEGORY_COLORS: Record<NoteCategory, string> = {
  'Ideas': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Tasks / To-Do': 'bg-blue-100 text-blue-800 border-blue-200',
  'Quotes': 'bg-purple-100 text-purple-800 border-purple-200',
  'Reflections / Journal': 'bg-green-100 text-green-800 border-green-200',
  'Research': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Reminders': 'bg-red-100 text-red-800 border-red-200',
  'Creative Writing': 'bg-pink-100 text-pink-800 border-pink-200',
  'Miscellaneous': 'bg-gray-100 text-gray-700 border-gray-200',
};

const CATEGORY_ICONS: Record<NoteCategory, string> = {
  'Ideas': '💡',
  'Tasks / To-Do': '✅',
  'Quotes': '💬',
  'Reflections / Journal': '📔',
  'Research': '🔬',
  'Reminders': '⏰',
  'Creative Writing': '✍️',
  'Miscellaneous': '📌',
};

const ALL_CATEGORIES: NoteCategory[] = [
  'Ideas', 'Tasks / To-Do', 'Quotes', 'Reflections / Journal',
  'Research', 'Reminders', 'Creative Writing', 'Miscellaneous',
];

export default function Notes() {
  const [rawInput, setRawInput] = useState('');
  const [notes, setNotes] = useState<CategorizedNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState<NoteCategory | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  async function handleCategorize() {
    const lines = rawInput
      .split(/\n{2,}|(?:^|\n)[-–—]{3,}(?:\n|$)/)
      .map(s => s.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setError('Paste at least one note before categorizing.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const results = await categorizeNotes(lines);
      const categorized: CategorizedNote[] = lines.map((raw, i) => ({
        id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        raw,
        category: results[i]?.category ?? 'Miscellaneous',
        title: results[i]?.title ?? 'Untitled',
        summary: results[i]?.summary ?? '',
      }));
      const merged = [...categorized, ...notes];
      saveNotes(merged);
      setNotes(merged);
      setRawInput('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id: string) {
    deleteNote(id);
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  const displayed = filterCategory === 'All' ? notes : notes.filter(n => n.category === filterCategory);

  const categoryCounts = ALL_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = notes.filter(n => n.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">iPhone Notes</h1>
        <p className="text-gray-500 text-sm">
          Paste your notes below (separate multiple notes with a blank line or <code className="bg-gray-100 px-1 rounded">---</code>), then let Claude categorize them for you.
        </p>
      </div>

      {/* Input area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <textarea
          className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 h-40 placeholder-gray-400"
          placeholder={"Bought milk, eggs, and bread\n\n---\n\nRead 'Atomic Habits' this month — great concept: habit stacking\n\n---\n\nIdea: build a daily journaling app for teams"}
          value={rawInput}
          onChange={e => setRawInput(e.target.value)}
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleCategorize}
          disabled={loading || !rawInput.trim()}
          className="mt-3 w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Categorizing with Claude...' : 'Categorize Notes'}
        </button>
      </div>

      {notes.length > 0 && (
        <>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilterCategory('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filterCategory === 'All'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              All ({notes.length})
            </button>
            {ALL_CATEGORIES.filter(c => categoryCounts[c] > 0).map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {CATEGORY_ICONS[cat]} {cat} ({categoryCounts[cat]})
              </button>
            ))}
          </div>

          {/* Notes list */}
          <div className="space-y-3">
            {displayed.map(note => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div
                  className="flex items-start justify-between gap-3 p-4 cursor-pointer select-none"
                  onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[note.category]}`}
                      >
                        {CATEGORY_ICONS[note.category]} {note.category}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm truncate">{note.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{note.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(note.id); }}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                      title="Delete note"
                    >
                      ×
                    </button>
                    <span className="text-gray-300 text-sm">{expandedId === note.id ? '▲' : '▼'}</span>
                  </div>
                </div>
                {expandedId === note.id && (
                  <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.raw}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {notes.length === 0 && !loading && (
        <div className="text-center text-gray-400 py-12">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm">No notes yet. Paste your iPhone notes above to get started.</p>
        </div>
      )}
    </div>
  );
}
