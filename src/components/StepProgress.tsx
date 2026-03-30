interface Step {
  label: string;
  icon: string;
}

interface Props {
  steps: Step[];
  current: number;
}

export default function StepProgress({ steps, current }: Props) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              i === current
                ? 'bg-indigo-600 text-white'
                : i < current
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <span>{i < current ? '✓' : step.icon}</span>
            <span className="hidden sm:block">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px flex-1 ${i < current ? 'bg-green-300' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
