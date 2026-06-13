import { useState } from 'react'
export default function ReverseTool() {
  const [input, setInput] = useState('')
  const reverse = () => setInput(input.split('').reverse().join(''))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={reverse} className="w-full py-3 bg-zinc-800 text-white rounded-2xl">Reverse</button></div>
}