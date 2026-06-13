import { useState } from 'react'
export default function RemoveSpacesTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const remove = () => setOutput(input.replace(/\s+/g, ' ').trim())
  const removeAll = () => setOutput(input.replace(/\s/g, ''))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={remove} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Remove Extra Spaces</button><button onClick={removeAll} className="flex-1 py-3 border rounded-2xl">Remove All Whitespace</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}