import { useState } from 'react'

export default function ButtonStudio() {
  const [text, setText] = useState('Get started')
  const [size, setSize] = useState('md')
  const [radius, setRadius] = useState(16)
  const [bgType, setBgType] = useState('solid')
  const [color, setColor] = useState('#6366f1')
  const [shadow, setShadow] = useState(8)
  const [lift, setLift] = useState(true)

  const sizes = {
    sm: { py: 8, px: 18, font: 13 },
    md: { py: 12, px: 26, font: 15 },
    lg: { py: 15, px: 32, font: 16 },
    xl: { py: 18, px: 40, font: 18 },
  }
  const s = sizes[size]

  const buttonStyle = {
    padding: `${s.py}px ${s.px}px`,
    fontSize: s.font,
    borderRadius: radius,
    background: bgType === 'solid' ? color : `linear-gradient(135deg, ${color}, #a855f7)`,
    boxShadow: lift ? `0 ${shadow}px ${shadow * 1.5}px -${Math.floor(shadow/2)}px rgb(0 0 0 / 0.25)` : 'none',
    color: '#fff',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
  }

  const css = `button {
  padding: ${s.py}px ${s.px}px;
  font-size: ${s.font}px;
  border-radius: ${radius}px;
  background: ${bgType === 'solid' ? color : `linear-gradient(135deg, ${color}, #a855f7)`};
  box-shadow: ${lift ? `0 ${shadow}px ${shadow * 1.5}px -${Math.floor(shadow/2)}px rgb(0 0 0 / 0.25)` : 'none'};
  color: white;
  font-weight: 600;
  border: none;
}`

  return (
    <div className="max-w-5xl grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <div className="text-sm text-slate-500 mb-1.5">Button text</div>
          <input value={text} onChange={e => setText(e.target.value)} className="input w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1.5">Size</div>
            <div className="flex gap-1">
              {['sm','md','lg','xl'].map(sz => (
                <button key={sz} onClick={() => setSize(sz)} className={`flex-1 py-2 rounded-xl text-sm ${size === sz ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>{sz}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1.5">Radius: {radius}px</div>
            <input type="range" min="4" max="32" value={radius} onChange={e => setRadius(+e.target.value)} className="w-full slider" />
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500 mb-2">Background</div>
          <div className="flex gap-2">
            {['solid', 'gradient'].map(t => (
              <button key={t} onClick={() => setBgType(t)} className={`flex-1 py-2 rounded-2xl text-sm ${bgType === t ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500 mb-1.5">Accent color</div>
          <div className="flex gap-3 items-center">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-14 h-11 rounded-2xl border overflow-hidden" />
            <div className="font-mono text-sm">{color}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1"><span>Shadow depth</span><span className="font-mono">{shadow}</span></div>
          <input type="range" min="0" max="24" value={shadow} onChange={e => setShadow(+e.target.value)} className="w-full slider" />
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={lift} onChange={e => setLift(e.target.checked)} className="w-4 h-4" /> Hover lift effect
        </label>

        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-primary w-full">Copy CSS</button>
      </div>

      <div className="lg:col-span-3 flex items-center justify-center bg-white border border-slate-200 rounded-3xl p-12">
        <button style={buttonStyle} className="active:scale-[0.985]">{text}</button>
      </div>
    </div>
  )
}
