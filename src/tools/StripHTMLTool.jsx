import { useState } from 'react'
export default function StripHTMLTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const strip = () => setOutput(input.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim())
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={strip} className="w-full py-3 bg-zinc-800 text-white rounded-2xl">Strip HTML Tags</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}