import { useState } from 'react'
export default function TrimTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const trim = () => setOutput(input.trim())
  const trimLines = () => setOutput(input.split('\n').map(l => l.trim()).join('\n'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={trim} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Trim</button><button onClick={trimLines} className="flex-1 py-3 border rounded-2xl">Trim Lines</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}