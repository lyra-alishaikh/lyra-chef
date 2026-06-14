import { useState } from 'react'

export default function GrainTool() {
  const [opacity, setOpacity] = useState(0.08)
  const [size, setSize] = useState(1.5)
  const [color, setColor] = useState('#000000')
  const [bg, setBg] = useState('#f8fafc')

  const grainStyle = {
    background: bg,
    backgroundImage: `radial-gradient(${color} 0.8px, transparent 0)`,
    backgroundSize: `${size * 2}px ${size * 2}px`,
    opacity,
  }

  const css = `background: ${bg};\nbackground-image: radial-gradient(${color} 0.8px, transparent 0);\nbackground-size: ${size * 2}px ${size * 2}px;\nopacity: ${opacity};`

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-5">
        {[
          { l: 'Grain opacity', v: opacity, s: setOpacity, min: 0.01, max: 0.25, step: 0.01 },
          { l: 'Grain size', v: size, s: setSize, min: 0.8, max: 4, step: 0.1 },
        ].map((p, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1"><span>{p.l}</span><span className="font-mono">{p.v.toFixed(2)}</span></div>
            <input type="range" min={p.min} max={p.max} step={p.step} value={p.v} onChange={e => p.s(+e.target.value)} className="w-full slider" />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm mb-1.5">Grain color</div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-16 h-11 rounded-2xl border" />
          </div>
          <div>
            <div className="text-sm mb-1.5">Background</div>
            <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-16 h-11 rounded-2xl border" />
          </div>
        </div>

        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary w-full">Copy grain CSS</button>
      </div>

      <div className="lg:col-span-3">
        <div className="text-sm mb-2 text-slate-500">Live preview</div>
        <div className="h-80 rounded-3xl border overflow-hidden relative" style={{ background: bg }}>
          <div style={grainStyle} className="absolute inset-0" />
          <div className="relative z-10 h-full flex items-center justify-center text-slate-600 text-sm font-medium">Your content here</div>
        </div>
        <div className="mt-3 text-[10px] font-mono bg-cosmic-950 text-emerald-300 p-3 rounded-2xl break-all">{css}</div>
      </div>
    </div>
  )
}
