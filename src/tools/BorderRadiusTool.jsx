import { useState } from 'react'

export default function BorderRadiusTool() {
  const [tl, setTl] = useState(12)
  const [tr, setTr] = useState(12)
  const [br, setBr] = useState(12)
  const [bl, setBl] = useState(12)
  const [linked, setLinked] = useState(true)

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`

  const update = (val, setter) => {
    if (linked) {
      setTl(val); setTr(val); setBr(val); setBl(val)
    } else {
      setter(val)
    }
  }

  const copy = () => navigator.clipboard.writeText(`border-radius: ${radius};`)

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between mb-3">
        <div className="text-sm text-zinc-500">Border radius</div>
        <button onClick={() => setLinked(!linked)} className="text-xs px-3 py-1 bg-zinc-100 rounded-full">{linked ? 'Linked' : 'Independent'}</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[{label:'Top Left', v:tl, s:setTl}, {label:'Top Right', v:tr, s:setTr}, {label:'Bottom Right', v:br, s:setBr}, {label:'Bottom Left', v:bl, s:setBl}].map((c,i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1"><span>{c.label}</span><span className="font-mono">{c.v}px</span></div>
            <input type="range" min="0" max="120" value={c.v} onChange={e=>update(+e.target.value, c.s)} className="w-full accent-violet-600" />
          </div>
        ))}
      </div>

      <div className="h-80 bg-white border flex items-center justify-center rounded-3xl overflow-hidden" style={{ borderRadius: radius }}>
        <div className="w-40 h-40 bg-gradient-to-br from-violet-500 to-fuchsia-500" style={{ borderRadius: radius }} />
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={copy} className="flex-1 py-3.5 bg-zinc-900 text-white rounded-2xl">Copy border-radius</button>
        <div className="px-5 py-3.5 bg-zinc-100 rounded-2xl font-mono text-sm self-center">{radius}</div>
      </div>
    </div>
  )
}
