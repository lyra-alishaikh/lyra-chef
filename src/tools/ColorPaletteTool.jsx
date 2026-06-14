import { useState } from 'react'

function shade(hex, percent) {
  let r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  r = Math.round(Math.min(255, Math.max(0, r + (255 * percent))))
  g = Math.round(Math.min(255, Math.max(0, g + (255 * percent))))
  b = Math.round(Math.min(255, Math.max(0, b + (255 * percent))))
  return `#${[r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')}`
}

export default function ColorPaletteTool() {
  const [base, setBase] = useState('#6366f1')

  const shades = [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map(p => shade(base, p))

  const copy = (color) => navigator.clipboard.writeText(color)
  const copyAll = () => navigator.clipboard.writeText(shades.map((c,i) => `--color-${i*100 + 50}: ${c};`).join('\n'))

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-sm text-slate-500">Base color</div>
        <input type="color" value={base} onChange={e => setBase(e.target.value)} className="w-16 h-12 rounded-2xl border overflow-hidden" />
        <div className="font-mono text-sm">{base}</div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
        {shades.map((c, i) => (
          <button key={i} onClick={() => copy(c)} className="group text-left">
            <div className="h-20 rounded-2xl border border-slate-200 shadow-sm" style={{ background: c }} />
            <div className="mt-2 text-xs font-mono text-slate-500 group-hover:text-brand-600">{c}</div>
            <div className="text-[10px] text-slate-400">{i === 4 ? 'base' : i < 4 ? `-${(4-i)*200}` : `+${(i-4)*200}`}</div>
          </button>
        ))}
      </div>

      <button onClick={copyAll} className="btn-primary mt-8">Copy all shades as CSS variables</button>
    </div>
  )
}
