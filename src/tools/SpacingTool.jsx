import { useState } from 'react'

const baseSteps = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96]

export default function SpacingTool() {
  const [multiplier, setMultiplier] = useState(1)

  const spaces = baseSteps.map(step => ({
    px: Math.round(step * multiplier),
    rem: (step * multiplier / 16).toFixed(2)
  }))

  const copyTailwind = () => {
    const css = spaces.map((s, i) => `  --space-${baseSteps[i]}: ${s.px}px; /* ${s.rem}rem */`).join('\n')
    navigator.clipboard.writeText(`:root {\n${css}\n}`)
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="text-sm text-slate-500 mb-1.5">Scale multiplier</div>
        <div className="flex items-center gap-4">
          <input type="range" min="0.5" max="2.5" step="0.05" value={multiplier} onChange={e => setMultiplier(+e.target.value)} className="flex-1 slider" />
          <div className="font-mono text-sm w-16">{multiplier.toFixed(2)}×</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {spaces.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl">
            <div className="w-16 text-xs font-mono text-slate-400">{baseSteps[i]} →</div>
            <div className="flex-1">
              <div className="h-2.5 bg-brand-600 rounded-full" style={{ width: Math.min(s.px, 320) + 'px' }} />
            </div>
            <div className="font-mono text-sm tabular-nums text-right w-20">{s.px}px <span className="text-slate-400">({s.rem}rem)</span></div>
            <button onClick={() => navigator.clipboard.writeText(`${s.px}px`)} className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200">Copy</button>
          </div>
        ))}
      </div>

      <button onClick={copyTailwind} className="btn-primary mt-6 w-full">Copy CSS custom properties</button>
    </div>
  )
}
