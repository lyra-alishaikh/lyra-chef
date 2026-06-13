import { useState } from 'react'
export default function LineNumberTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const number = () => setOutput(input.split('\n').map((l,i) => `${i+1}. ${l}`).join('\n'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><button onClick={number} className="w-full py-3 bg-slate-600 text-white rounded-2xl">Add Line Numbers</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}