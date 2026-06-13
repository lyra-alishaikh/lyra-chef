import { useState } from 'react'
export default function SimpleCalcTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const calc = () => {
    try {
      // Safe eval for basic math only
      const safe = input.replace(/[^0-9+\-*/(). ]/g, '')
      setResult(eval(safe).toString())
    } catch { setResult('Error') }
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="2 + 2 * 3" className="w-full border rounded-2xl px-5 py-3 mb-4 font-mono" /><button onClick={calc} className="w-full py-3 bg-green-600 text-white rounded-2xl">Calculate</button>{result && <div className="mt-4 p-5 bg-zinc-900 text-green-400 font-mono text-xl rounded-2xl">{result}</div>}</div>
}