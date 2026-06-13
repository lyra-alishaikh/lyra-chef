import { useState } from 'react'

const encodeText = (value) => btoa(String.fromCharCode(...new TextEncoder().encode(value)))
const decodeText = (value) => new TextDecoder().decode(Uint8Array.from(atob(value), c => c.charCodeAt(0)))

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => setOutput(encodeText(input))
  const decode = () => {
    try {
      setOutput(decodeText(input))
    } catch {
      setOutput('Invalid Base64')
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-48 border border-zinc-300 rounded-2xl p-5 font-mono text-sm" placeholder="Text or Base64" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={encode} className="flex-1 py-3 bg-zinc-900 text-white rounded-2xl font-medium">Encode</button>
        <button onClick={decode} className="flex-1 py-3 border border-zinc-300 rounded-2xl font-medium">Decode</button>
      </div>
      {output && <div className="p-5 bg-white border border-zinc-200 rounded-2xl font-mono text-sm whitespace-pre-wrap break-all">{output}</div>}
    </div>
  )
}
