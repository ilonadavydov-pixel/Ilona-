import { useState } from 'react';
import type { Technique } from '../lib/techniques';

interface Props {
  technique: Technique;
  defaultExpanded?: boolean;
}

export default function TechniqueCard({ technique, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{technique.icon}</span>
          <div>
            <div className="font-semibold text-gray-900">{technique.name}</div>
            <div className="text-sm text-gray-500">{technique.tagline}</div>
          </div>
        </div>
        <span className="text-gray-400 text-lg ml-2">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-white space-y-3">
          <div className="pt-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">What it is</div>
            <p className="text-sm text-gray-700">{technique.what}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-1">Example</div>
            <p className="text-sm text-indigo-900 italic">"{technique.example}"</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Best used when</div>
            <p className="text-sm text-gray-700">{technique.whenToUse}</p>
          </div>
        </div>
      )}
    </div>
  );
}
