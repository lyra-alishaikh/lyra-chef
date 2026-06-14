import { useState } from 'react'

const steps = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64]

export default function TypeScaleTool() {
  const [baseSize, setBaseSize] = useState(16)
  const [scale, setScale] = useState(1.2)
  const [fontFamily, setFontFamily] = useState('Inter')

  const sizes = steps.map((step, i) => {
    const size = Math.round(baseSize * Math.pow(scale, i - 6))
    return { label: `text-${step}`, size, css: `font-size: ${size}px; line-height: ${Math.round(size * 1.25)}px;` }
  })

  const copyAll = () => {
    const css = sizes.map(s => `.${s.label} { font-size: ${s.size}px; line-height: ${Math.round(s.size * 1.25)}px; }`).join('\n')
    navigator.clipboard.writeText(css)
  }

  return (
    <div className="max-w-5xl">
      <div className="flex gap-6 mb-8">
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-1.5">Base size (px)</div>
          <div className="flex items-center gap-3">
            <input type="range" min="12" max="24" step="1" value={baseSize} onChange={e => setBaseSize(+e.target.value)} className="flex-1 slider" />
            <div className="w-12 text-right font-mono text-sm">{baseSize}</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-1.5">Scale ratio</div>
          <div className="flex items-center gap-3">
            <input type="range" min="1.05" max="1.5" step="0.01" value={scale} onChange={e => setScale(+e.target.value)} className="flex-1 slider" />
            <div className="w-12 text-right font-mono text-sm">{scale.toFixed(2)}</div>
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-500 mb-1.5">Font</div>
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="input w-44">
            <option>Inter</option>
            <option>System UI</option>
            <option>Georgia</option>
            <option>Space Grotesk</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sizes.map((s, i) => (
          <div key={i} className="flex items-baseline gap-6 border-b border-slate-100 pb-4 group">
            <div className="w-28 text-xs font-mono text-slate-400 tabular-nums">{s.label}</div>
            <div style={{ fontSize: `${s.size}px`, fontFamily }} className="flex-1 text-slate-900 tracking-[-0.2px]">
              The quick brown fox jumps over the lazy dog.
            </div>
            <div className="text-xs text-slate-400 w-20 text-right tabular-nums">{s.size}px</div>
            <button onClick={() => navigator.clipboard.writeText(s.css)} className="text-xs text-brand-600 hover:text-brand-700 opacity-0 group-hover:opacity-100 transition">Copy</button>
          </div>
        ))}
      </div>

      <button onClick={copyAll} className="btn-primary mt-8 w-full">Copy entire type scale as CSS</button>
    </div>
  )
}
