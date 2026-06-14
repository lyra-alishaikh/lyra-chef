import { useState } from 'react'

export default function GlassmorphismTool() {
  const [blur, setBlur] = useState(12)
  const [opacity, setOpacity] = useState(0.65)
  const [border, setBorder] = useState(1)
  const [saturation, setSaturation] = useState(180)

  const glass = {
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `${border}px solid rgba(255,255,255,0.6)`,
  }

  const css = `background: rgba(255,255,255,${opacity});\nbackdrop-filter: blur(${blur}px) saturate(${saturation}%);\nborder: ${border}px solid rgba(255,255,255,0.6);`

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-5">
        {[
          { l: 'Blur', v: blur, s: setBlur, min: 0, max: 40 },
          { l: 'Opacity', v: opacity, s: setOpacity, min: 0.1, max: 0.95, step: 0.01 },
          { l: 'Border', v: border, s: setBorder, min: 0, max: 3 },
          { l: 'Saturation', v: saturation, s: setSaturation, min: 100, max: 300 },
        ].map((p, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1"><span>{p.l}</span><span className="font-mono">{p.v.toFixed ? p.v.toFixed(2) : p.v}</span></div>
            <input type="range" min={p.min} max={p.max} step={p.step || 1} value={p.v} onChange={e => p.s(+e.target.value)} className="w-full slider" />
          </div>
        ))}
        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary w-full mt-2">Copy Glass CSS</button>
      </div>

      <div className="lg:col-span-3">
        <div className="text-sm mb-2 text-slate-500">Preview (on gradient background)</div>
        <div className="h-80 rounded-3xl p-8 bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-700 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-20" />
          <div className="w-80 h-48 rounded-3xl shadow-2xl" style={glass}>
            <div className="p-8 text-slate-800">
              <div className="font-semibold text-lg tracking-tight">Glass card</div>
              <div className="text-sm mt-1 opacity-70">Beautiful backdrop blur effect</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
