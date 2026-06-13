import { useState } from 'react'

export default function GridPlaygroundTool() {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [gap, setGap] = useState(12)

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 80px)`,
    gap: `${gap}px`,
  }

  const items = Array.from({ length: cols * rows }, (_, i) => i + 1)

  const css = `display: grid;\ngrid-template-columns: repeat(${cols}, 1fr);\ngrid-template-rows: repeat(${rows}, 80px);\ngap: ${gap}px;`

  return (
    <div>
      <div className="flex gap-6 mb-6 text-sm">
        <div>Columns: <span className="font-mono">{cols}</span><input type="range" min="1" max="6" value={cols} onChange={e=>setCols(+e.target.value)} className="ml-2 w-28 align-middle" /></div>
        <div>Rows: <span className="font-mono">{rows}</span><input type="range" min="1" max="5" value={rows} onChange={e=>setRows(+e.target.value)} className="ml-2 w-28 align-middle" /></div>
        <div>Gap: <span className="font-mono">{gap}px</span><input type="range" min="0" max="32" value={gap} onChange={e=>setGap(+e.target.value)} className="ml-2 w-28 align-middle" /></div>
      </div>

      <div className="bg-white border rounded-3xl p-6 mb-4" style={gridStyle}>
        {items.map(i => <div key={i} className="bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-sm font-medium">{i}</div>)}
      </div>

      <button onClick={() => navigator.clipboard.writeText(css)} className="px-6 py-2.5 bg-zinc-900 text-white rounded-2xl text-sm">Copy CSS</button>
      <pre className="mt-3 text-xs bg-zinc-950 text-emerald-300 p-4 rounded-2xl font-mono whitespace-pre">{css}</pre>
    </div>
  )
}
