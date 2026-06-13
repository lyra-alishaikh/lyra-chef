import { useState } from 'react'
export default function Base32Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const encode = () => setOutput(btoa(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))
  const decode = () => { try { setOutput(atob(input.replace(/-/g, '+').replace(/_/g, '/'))) } catch { setOutput('Invalid') } }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={encode} className="flex-1 py-3 bg-sky-600 text-white rounded-2xl">Encode</button><button onClick={decode} className="flex-1 py-3 border rounded-2xl">Decode</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm break-all">{output}</pre>}</div>
}