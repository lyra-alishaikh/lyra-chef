import { useState } from 'react'
export default function SortLinesTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const sort = () => setOutput(input.split('\n').sort().join('\n'))
  const reverse = () => setOutput(input.split('\n').sort().reverse().join('\n'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={sort} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Sort A-Z</button><button onClick={reverse} className="flex-1 py-3 border rounded-2xl">Sort Z-A</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}