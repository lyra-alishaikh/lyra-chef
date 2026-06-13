import { useState } from 'react'
export default function EscapeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const escape = () => setOutput(input.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\n/g, '\\n'))
  const unescape = () => setOutput(input.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={escape} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Escape</button><button onClick={unescape} className="flex-1 py-3 border rounded-2xl">Unescape</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm break-all">{output}</pre>}</div>
}