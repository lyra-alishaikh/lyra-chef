import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => setOutput(btoa(input))
  const decode = () => {
    try { setOutput(atob(input)) } catch { setOutput('Invalid Base64') }
  }

  return (
    <div className="max-w-2xl">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-48 border border-zinc-300 rounded-2xl p-5 font-mono" placeholder="Text or Base64" />
      <div className="flex gap-3 mt-4">
        <button onClick={encode} className="flex-1 py-3 bg-sky-600 text-white rounded-2xl">Encode</button>
        <button onClick={decode} className="flex-1 py-3 border border-zinc-300 rounded-2xl">Decode</button>
      </div>
      {output && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl font-mono text-sm break-all">{output}</div>}
    </div>
  )
}