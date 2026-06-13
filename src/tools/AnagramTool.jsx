import { useState } from 'react'
export default function AnagramTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState('')
  const check = () => {
    const cleanA = a.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    const cleanB = b.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    setResult(cleanA === cleanB ? 'They are anagrams!' : 'Not anagrams')
  }
  return <div className="space-y-4"><textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Word 1" className="w-full h-20 border rounded-2xl p-5" /><textarea value={b} onChange={e=>setB(e.target.value)} placeholder="Word 2" className="w-full h-20 border rounded-2xl p-5" /><button onClick={check} className="w-full py-3 bg-violet-600 text-white rounded-2xl">Check Anagram</button>{result && <div className="p-5 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}