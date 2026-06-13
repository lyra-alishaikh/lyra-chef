import { useState } from 'react'
export default function SlugifyTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const slugify = () => setOutput(input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={slugify} className="w-full py-3 bg-lime-600 text-white rounded-2xl">Slugify</button>{output && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl font-mono text-sm">{output}</div>}</div>
}