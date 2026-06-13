import { useState } from 'react'
export default function HTMLEncodeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const encode = () => setOutput(input.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"'))
  const decode = () => setOutput(input.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={encode} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">Encode</button><button onClick={decode} className="flex-1 py-3 border rounded-2xl">Decode</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm break-all">{output}</pre>}</div>
}