import { useState } from 'react'
export default function CSVJSONTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('csv2json')
  const convert = () => {
    try {
      if (mode === 'csv2json') {
        const lines = input.trim().split('\n')
        const headers = lines[0].split(',').map(h => h.trim())
        const rows = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim())
          return headers.reduce((obj, header, i) => { obj[header] = values[i] || ''; return obj }, {})
        })
        setOutput(JSON.stringify(rows, null, 2))
      } else {
        const arr = JSON.parse(input)
        if (!Array.isArray(arr) || arr.length === 0) throw new Error()
        const headers = Object.keys(arr[0])
        let csv = headers.join(',') + '\n'
        csv += arr.map(row => headers.map(h => row[h] ?? '').join(',')).join('\n')
        setOutput(csv)
      }
    } catch { setOutput('Invalid input') }
  }
  return <div><div className="flex gap-3 mb-4"><button onClick={() => setMode('csv2json')} className={`px-4 py-2 rounded-2xl ${mode==='csv2json'?'bg-emerald-600 text-white':'border'}`}>CSV → JSON</button><button onClick={() => setMode('json2csv')} className={`px-4 py-2 rounded-2xl ${mode==='json2csv'?'bg-emerald-600 text-white':'border'}`}>JSON → CSV</button></div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><button onClick={convert} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Convert</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm overflow-auto">{output}</pre>}</div>
}