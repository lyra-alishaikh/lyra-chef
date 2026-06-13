import { useState } from 'react'

export default function BoxShadowTool() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(10)
  const [blur, setBlur] = useState(15)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(0.15)
  const [inset, setInset] = useState(false)

  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`

  const copy = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadow};`)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
      <div className="space-y-5">
        {[
          { label: 'Horizontal', val: x, set: setX, min: -50, max: 50 },
          { label: 'Vertical', val: y, set: setY, min: -50, max: 50 },
          { label: 'Blur', val: blur, set: setBlur, min: 0, max: 100 },
          { label: 'Spread', val: spread, set: setSpread, min: -30, max: 30 },
          { label: 'Opacity', val: opacity, set: setOpacity, min: 0, max: 1, step: 0.01 },
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{s.label}</span>
              <span className="font-mono text-xs">{typeof s.val === 'number' && s.val.toFixed ? s.val.toFixed(2) : s.val}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step || 1} value={s.val} onChange={e => s.set(+e.target.value)} className="w-full accent-zinc-900" />
          </div>
        ))}

        <div className="flex gap-4 items-center">
          <div>
            <div className="text-sm mb-1">Color</div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-16 h-11 rounded-2xl overflow-hidden border" />
          </div>
          <label className="flex items-center gap-2 text-sm mt-6 cursor-pointer">
            <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} className="w-4 h-4" />
            Inset
          </label>
        </div>

        <button onClick={copy} className="mt-4 w-full py-3.5 bg-zinc-900 hover:bg-black text-white rounded-2xl font-medium">Copy box-shadow</button>
      </div>

      <div>
        <div className="text-sm mb-2 text-zinc-500">Preview</div>
        <div className="h-80 bg-white rounded-3xl flex items-center justify-center border" style={{ boxShadow: shadow }}>
          <div className="text-sm text-zinc-400">Your element</div>
        </div>
        <div className="mt-4 font-mono text-xs bg-zinc-950 text-zinc-200 p-4 rounded-2xl break-all">
          box-shadow: {shadow};
        </div>
      </div>
    </div>
  )
}
