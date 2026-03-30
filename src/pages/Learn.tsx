import { useState } from 'react';
import TechniqueCard from '../components/TechniqueCard';
import { OPENING_TECHNIQUES, CLOSING_TECHNIQUES, STRUCTURE_CONTENT } from '../lib/techniques';

type Tab = 'structure' | 'openings' | 'closings';

export default function Learn() {
  const [tab, setTab] = useState<Tab>('structure');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Learn the Craft</h1>
      <p className="text-gray-500 mb-6">Three skills that separate good speakers from unforgettable ones.</p>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {(['structure', 'openings', 'closings'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors capitalize ${
              tab === t
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t === 'structure' ? '📐 Structure' : t === 'openings' ? '⚡ Openings' : '🏁 Closings'}
          </button>
        ))}
      </div>

      {/* Structure tab */}
      {tab === 'structure' && (
        <div className="space-y-6">
          {/* PREP */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{STRUCTURE_CONTENT.prep.title}</h2>
            <p className="text-sm text-indigo-600 font-medium mb-2">{STRUCTURE_CONTENT.prep.subtitle}</p>
            <p className="text-gray-600 mb-4">{STRUCTURE_CONTENT.prep.description}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {STRUCTURE_CONTENT.prep.steps.map(step => (
                <div key={step.letter + step.name} className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {step.letter}
                    </div>
                    <div className="font-semibold text-indigo-900">{step.name}</div>
                  </div>
                  <p className="text-sm text-indigo-700 pl-12">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-amber-800 mb-1">⏱ Timing Tip</div>
              <p className="text-sm text-amber-700">{STRUCTURE_CONTENT.prep.tip}</p>
            </div>
          </div>

          {/* Rule of Three */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{STRUCTURE_CONTENT.ruleOfThree.title}</h2>
            <p className="text-sm text-purple-600 font-medium mb-2">{STRUCTURE_CONTENT.ruleOfThree.subtitle}</p>
            <p className="text-gray-600 mb-4">{STRUCTURE_CONTENT.ruleOfThree.description}</p>
            <div className="space-y-2">
              {STRUCTURE_CONTENT.ruleOfThree.examples.map((ex, i) => (
                <div key={i} className="bg-purple-50 border border-purple-100 rounded-lg px-4 py-2.5">
                  <p className="text-sm text-purple-900 italic">"{ex}"</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-amber-800 mb-1">💡 Quick Trick</div>
              <p className="text-sm text-amber-700">{STRUCTURE_CONTENT.ruleOfThree.tip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Openings tab */}
      {tab === 'openings' && (
        <div>
          <p className="text-gray-600 mb-4">
            You have about 5 seconds to hook your audience. Choose one of these proven openers and practise it until it feels natural.
          </p>
          <div className="space-y-3">
            {OPENING_TECHNIQUES.map((t, i) => (
              <TechniqueCard key={t.id} technique={t} defaultExpanded={i === 0} />
            ))}
          </div>
        </div>
      )}

      {/* Closings tab */}
      {tab === 'closings' && (
        <div>
          <p className="text-gray-600 mb-4">
            The last thing you say is the thing they remember. Make it count with one of these closing techniques.
          </p>
          <div className="space-y-3">
            {CLOSING_TECHNIQUES.map((t, i) => (
              <TechniqueCard key={t.id} technique={t} defaultExpanded={i === 0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
