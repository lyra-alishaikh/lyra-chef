import { useState } from 'react'
export default function ListToCSVTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const toCSV = () => setOutput(input.split('\n').map(l=>l.trim()).filter(Boolean).join(','))
  const toLines = () => setOutput(input.split(',').map(l=>l.trim()).join('\n'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={toCSV} className="flex-1 py-3 bg-emerald-600 text-white rounded-2xl">Lines → CSV</button><button onClick={toLines} className="flex-1 py-3 border rounded-2xl">CSV → Lines</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}