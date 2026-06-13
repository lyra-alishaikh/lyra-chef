import { useState } from 'react'
export default function PalindromeTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const check = () => {
    const clean = input.toLowerCase().replace(/[^a-z0-9]/g, '')
    const rev = clean.split('').reverse().join('')
    setResult(clean === rev ? 'Yes, it is a palindrome' : 'No, not a palindrome')
  }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={check} className="w-full py-3 bg-violet-600 text-white rounded-2xl">Check Palindrome</button>{result && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}