import { useState } from 'react'
export default function RemoveAccentsTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const remove = () => setOutput(input.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={remove} className="w-full py-3 bg-teal-600 text-white rounded-2xl">Remove Accents</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}