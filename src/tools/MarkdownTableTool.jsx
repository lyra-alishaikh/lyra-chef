import { useState } from 'react'

export default function MarkdownTableTool() {
  const [rows, setRows] = useState(4)
  const [cols, setCols] = useState(3)
  const [table, setTable] = useState('')

  const generate = () => {
    let md = '|'
    for (let c = 0; c < cols; c++) md += ` Column ${c + 1} |`
    md += '\n|'
    for (let c = 0; c < cols; c++) md += ' --- |'
    for (let r = 0; r < rows; r++) {
      md += '\n|'
      for (let c = 0; c < cols; c++) md += ` Cell ${r + 1}.${c + 1} |`
    }
    setTable(md)
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex gap-6">
        <div>
          <div className="text-sm mb-1">Rows</div>
          <input type="range" min="1" max="12" value={rows} onChange={e => setRows(+e.target.value)} className="w-48" />
          <div className="font-mono text-sm">{rows}</div>
        </div>
        <div>
          <div className="text-sm mb-1">Columns</div>
          <input type="range" min="1" max="8" value={cols} onChange={e => setCols(+e.target.value)} className="w-48" />
          <div className="font-mono text-sm">{cols}</div>
        </div>
      </div>
      <button onClick={generate} className="px-8 py-3 bg-zinc-900 text-white rounded-2xl">Generate Table</button>

      {table && (
        <div>
          <button onClick={() => navigator.clipboard.writeText(table)} className="mb-2 text-sm px-4 py-1 bg-white border rounded-xl">Copy Markdown</button>
          <pre className="bg-zinc-950 text-emerald-300 p-5 rounded-3xl text-sm overflow-auto font-mono whitespace-pre">{table}</pre>
        </div>
      )}
    </div>
  )
}
