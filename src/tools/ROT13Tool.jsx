import { useState } from 'react'
export default function ROT13Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const rot13 = () => setOutput(input.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={rot13} className="w-full py-3 bg-rose-600 text-white rounded-2xl">Apply ROT13</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}