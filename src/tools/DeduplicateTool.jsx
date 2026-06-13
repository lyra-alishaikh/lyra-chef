import { useState } from 'react'
export default function DeduplicateTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const dedupe = () => {
    const lines = input.split('\n')
    const unique = [...new Set(lines.map(l => l.trim()).filter(Boolean))]
    setOutput(unique.join('\n'))
  }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><button onClick={dedupe} className="w-full py-3 bg-zinc-800 text-white rounded-2xl">Remove Duplicates</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}