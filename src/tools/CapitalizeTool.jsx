import { useState } from 'react'
export default function CapitalizeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const title = () => setOutput(input.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()))
  const sentence = () => setOutput(input.toLowerCase().replace(/(^\w|\.\s+\w)/g, c => c.toUpperCase()))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={title} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Title Case</button><button onClick={sentence} className="flex-1 py-3 border rounded-2xl">Sentence Case</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}