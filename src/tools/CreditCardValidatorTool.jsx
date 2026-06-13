import { useState } from 'react'
export default function CreditCardValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const validate = () => {
    const digits = input.replace(/\D/g, '')
    if (digits.length < 13 || digits.length > 19) return setResult('Invalid length')
    let sum = 0, even = false
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits[i])
      if (even) { n *= 2; if (n > 9) n -= 9 }
      sum += n
      even = !even
    }
    setResult(sum % 10 === 0 ? 'Valid (Luhn passes)' : 'Invalid checksum')
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="4111 1111 1111 1111" className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={validate} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Validate</button>{result && <div className="mt-4 p-4 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}