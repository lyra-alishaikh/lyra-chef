import { useState } from 'react'
export default function WordCountTool() {
  const [input, setInput] = useState('')
  const words = input.trim() ? input.trim().split(/\s+/).length : 0
  const chars = input.length
  const lines = input ? input.split('\n').length : 0
  const reading = Math.ceil(words / 200)
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><div className="grid grid-cols-4 gap-4 text-center"><div className="p-4 bg-zinc-100 rounded-2xl"><div className="text-3xl font-semibold">{words}</div><div className="text-xs">Words</div></div><div className="p-4 bg-zinc-100 rounded-2xl"><div className="text-3xl font-semibold">{chars}</div><div className="text-xs">Chars</div></div><div className="p-4 bg-zinc-100 rounded-2xl"><div className="text-3xl font-semibold">{lines}</div><div className="text-xs">Lines</div></div><div className="p-4 bg-zinc-100 rounded-2xl"><div className="text-3xl font-semibold">{reading}</div><div className="text-xs">Min read</div></div></div></div>
}