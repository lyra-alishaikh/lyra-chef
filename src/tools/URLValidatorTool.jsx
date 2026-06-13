import { useState } from 'react'
export default function URLValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const validate = () => {
    try {
      new URL(input)
      setResult('Valid URL')
    } catch {
      setResult('Invalid URL')
    }
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="https://example.com" className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={validate} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Validate URL</button>{result && <div className="mt-4 p-4 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}