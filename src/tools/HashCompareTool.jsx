import { useState } from 'react'
export default function HashCompareTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState('')
  const compare = () => setResult(a.trim().toLowerCase() === b.trim().toLowerCase() ? 'Hashes match!' : 'Hashes do not match')
  return <div className="space-y-4"><input value={a} onChange={e=>setA(e.target.value)} placeholder="Hash A" className="w-full border rounded-2xl px-5 py-3 font-mono" /><input value={b} onChange={e=>setB(e.target.value)} placeholder="Hash B" className="w-full border rounded-2xl px-5 py-3 font-mono" /><button onClick={compare} className="w-full py-3 bg-rose-600 text-white rounded-2xl">Compare Hashes</button>{result && <div className="p-5 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}