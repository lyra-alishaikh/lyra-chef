import { useState } from 'react'

export default function FlexboxTool() {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('center')
  const [align, setAlign] = useState('center')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(16)

  const style = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: gap + 'px',
  }

  const copy = () => {
    const css = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`
    navigator.clipboard.writeText(css)
  }

  const items = [1, 2, 3, 4]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="mb-1 text-zinc-500">flex-direction</div>
            {['row', 'column', 'row-reverse', 'column-reverse'].map(d => (
              <button key={d} onClick={() => setDirection(d)} className={`block w-full text-left px-3 py-1.5 rounded-xl mb-1 ${direction === d ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>{d}</button>
            ))}
          </div>
          <div>
            <div className="mb-1 text-zinc-500">justify-content</div>
            {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(j => (
              <button key={j} onClick={() => setJustify(j)} className={`block w-full text-left px-3 py-1.5 rounded-xl mb-1 ${justify === j ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>{j}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm text-zinc-500">align-items + gap</div>
          <div className="flex gap-2 flex-wrap">
            {['flex-start', 'center', 'flex-end', 'stretch'].map(a => (
              <button key={a} onClick={() => setAlign(a)} className={`px-4 py-1.5 rounded-2xl text-sm ${align === a ? 'bg-emerald-600 text-white' : 'bg-zinc-100'}`}>{a}</button>
            ))}
          </div>
          <div className="mt-3">
            <input type="range" min="0" max="48" value={gap} onChange={e => setGap(+e.target.value)} className="w-full" />
            <div className="text-xs text-right font-mono">{gap}px gap</div>
          </div>
        </div>

        <button onClick={copy} className="w-full py-3 bg-zinc-900 text-white rounded-2xl mt-2">Copy CSS</button>
      </div>

      <div>
        <div className="text-sm mb-2 text-zinc-500">Live preview</div>
        <div className="h-72 bg-white border rounded-3xl p-6" style={style}>
          {items.map(i => (
            <div key={i} className="w-14 h-14 bg-gradient-to-br from-zinc-800 to-zinc-950 text-white rounded-2xl flex items-center justify-center text-sm font-medium shadow">Box {i}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
