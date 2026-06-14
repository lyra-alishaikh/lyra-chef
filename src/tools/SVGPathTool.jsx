import { useState } from 'react'

export default function SVGPathTool() {
  const [d, setD] = useState('M 20 80 Q 40 20 100 60 Q 160 100 180 40')
  const [stroke, setStroke] = useState(4)
  const [color, setColor] = useState('#6366f1')

  const svg = `<svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}" stroke="${color}" stroke-width="${stroke}" fill="none" stroke-linecap="round" />
</svg>`

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <div className="mb-4">
          <div className="text-sm mb-1.5 text-slate-500">SVG path d=</div>
          <textarea value={d} onChange={e => setD(e.target.value)} className="input w-full h-28 font-mono text-sm" />
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-sm mb-1">Stroke width</div>
            <input type="range" min="1" max="12" value={stroke} onChange={e => setStroke(+e.target.value)} className="w-full slider" />
            <div className="font-mono text-xs mt-0.5">{stroke}px</div>
          </div>
          <div>
            <div className="text-sm mb-1">Color</div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-14 h-10 rounded-xl border" />
          </div>
        </div>
        <button onClick={() => navigator.clipboard.writeText(svg)} className="btn-primary w-full mt-6">Copy SVG</button>
      </div>

      <div>
        <div className="text-sm text-slate-500 mb-2">Live preview</div>
        <div className="preview-box h-52">
          <svg width="220" height="120" viewBox="0 0 220 120" className="drop-shadow">
            <path d={d} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <pre className="mt-3 text-[10px] bg-cosmic-950 text-emerald-300 p-3 rounded-2xl overflow-auto">{svg}</pre>
      </div>
    </div>
  )
}
