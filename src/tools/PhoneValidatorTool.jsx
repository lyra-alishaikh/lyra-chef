import { useState } from 'react'
export default function PhoneValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const validate = () => {
    const cleaned = input.replace(/\D/g, '')
    if (cleaned.length === 10 || cleaned.length === 11) setResult('Looks valid')
    else setResult('Invalid phone number')
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={validate} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Validate</button>{result && <div className="mt-4 p-4 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}