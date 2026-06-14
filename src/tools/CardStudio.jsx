import { useState } from 'react'

export default function CardStudio() {
  const [radius, setRadius] = useState(20)
  const [shadow, setShadow] = useState(16)
  const [padding, setPadding] = useState(28)
  const [bg, setBg] = useState('#ffffff')
  const [border, setBorder] = useState(true)

  const cardStyle = {
    borderRadius: radius,
    boxShadow: `0 ${shadow}px ${shadow * 1.8}px -${Math.floor(shadow/2)}px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
    padding: padding,
    background: bg,
    border: border ? '1px solid #e2e8f0' : 'none',
    maxWidth: 380,
  }

  const css = `.card {
  border-radius: ${radius}px;
  box-shadow: 0 ${shadow}px ${shadow * 1.8}px -${Math.floor(shadow/2)}px rgb(0 0 0 / 0.1);
  padding: ${padding}px;
  background: ${bg};
  ${border ? 'border: 1px solid #e2e8f0;' : ''}
}`

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
      <div className="space-y-5">
        {[
          { label: 'Border radius', val: radius, set: setRadius, min: 4, max: 40 },
          { label: 'Shadow depth', val: shadow, set: setShadow, min: 0, max: 40 },
          { label: 'Padding', val: padding, set: setPadding, min: 12, max: 48 },
        ].map((p, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1"><span>{p.label}</span><span className="font-mono">{p.val}</span></div>
            <input type="range" min={p.min} max={p.max} value={p.val} onChange={e => p.set(+e.target.value)} className="w-full slider" />
          </div>
        ))}

        <div>
          <div className="text-sm mb-1.5">Background</div>
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-16 h-11 rounded-2xl border" />
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer mt-1">
          <input type="checkbox" checked={border} onChange={e => setBorder(e.target.checked)} /> Subtle border
        </label>

        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary w-full mt-4">Copy CSS</button>
      </div>

      <div className="flex items-center justify-center">
        <div style={cardStyle} className="w-full">
          <div className="text-xs text-slate-400 mb-1 tracking-widest">PREVIEW</div>
          <div className="font-semibold text-xl tracking-tight mb-1">Beautiful card</div>
          <div className="text-sm text-slate-500">This is what your card could look like with the current settings.</div>
          <div className="mt-6 text-xs px-3 py-1.5 bg-slate-100 inline-block rounded-full">Action</div>
        </div>
      </div>
    </div>
  )
}
