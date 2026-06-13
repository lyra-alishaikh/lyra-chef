import { useState } from 'react'

export default function GradientTool() {
  const [type, setType] = useState('linear')
  const [angle, setAngle] = useState(135)
  const [color1, setColor1] = useState('#6366f1')
  const [color2, setColor2] = useState('#a855f7')
  const [color3, setColor3] = useState('#ec4899')
  const [stops, setStops] = useState(2)

  const getGradient = () => {
    if (type === 'linear') {
      const c = stops === 2 ? `${color1}, ${color2}` : `${color1}, ${color2}, ${color3}`
      return `linear-gradient(${angle}deg, ${c})`
    } else {
      const c = stops === 2 ? `${color1}, ${color2}` : `${color1}, ${color2}, ${color3}`
      return `radial-gradient(circle, ${c})`
    }
  }

  const css = getGradient()

  const copy = () => {
    const code = `background: ${css};`
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex gap-3">
        <button onClick={() => setType('linear')} className={`px-5 py-2 rounded-2xl text-sm font-medium ${type === 'linear' ? 'bg-zinc-900 text-white' : 'bg-zinc-100'}`}>Linear</button>
        <button onClick={() => setType('radial')} className={`px-5 py-2 rounded-2xl text-sm font-medium ${type === 'radial' ? 'bg-zinc-900 text-white' : 'bg-zinc-100'}`}>Radial</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          {type === 'linear' && (
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span>Angle</span><span className="font-mono">{angle}°</span></div>
              <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" />
            </div>
          )}

          <div className="space-y-3">
            <div>
              <div className="text-sm mb-1.5">Color 1</div>
              <div className="flex gap-3 items-center">
                <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-14 h-11 rounded-xl overflow-hidden border" />
                <input type="text" value={color1} onChange={e => setColor1(e.target.value)} className="font-mono text-sm flex-1 border rounded-2xl px-4 py-2.5" />
              </div>
            </div>
            <div>
              <div className="text-sm mb-1.5">Color 2</div>
              <div className="flex gap-3 items-center">
                <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-14 h-11 rounded-xl overflow-hidden border" />
                <input type="text" value={color2} onChange={e => setColor2(e.target.value)} className="font-mono text-sm flex-1 border rounded-2xl px-4 py-2.5" />
              </div>
            </div>
            {stops === 3 && (
              <div>
                <div className="text-sm mb-1.5">Color 3</div>
                <div className="flex gap-3 items-center">
                  <input type="color" value={color3} onChange={e => setColor3(e.target.value)} className="w-14 h-11 rounded-xl overflow-hidden border" />
                  <input type="text" value={color3} onChange={e => setColor3(e.target.value)} className="font-mono text-sm flex-1 border rounded-2xl px-4 py-2.5" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setStops(2)} className={`flex-1 py-2.5 rounded-2xl text-sm ${stops === 2 ? 'bg-emerald-600 text-white' : 'bg-zinc-100'}`}>2 Colors</button>
            <button onClick={() => setStops(3)} className={`flex-1 py-2.5 rounded-2xl text-sm ${stops === 3 ? 'bg-emerald-600 text-white' : 'bg-zinc-100'}`}>3 Colors</button>
          </div>
        </div>

        <div>
          <div className="text-sm mb-2 text-zinc-500">Preview</div>
          <div className="h-72 rounded-3xl border shadow-inner" style={{ background: css }} />
          <button onClick={copy} className="mt-3 w-full py-3 bg-zinc-900 text-white rounded-2xl text-sm font-medium">Copy CSS</button>
          <div className="mt-3 text-[10px] font-mono bg-zinc-100 p-3 rounded-2xl text-zinc-600 break-all">{css}</div>
        </div>
      </div>
    </div>
  )
}
