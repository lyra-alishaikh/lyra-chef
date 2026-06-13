import { useState } from 'react'
export default function ISBNValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const validate = () => {
    const digits = input.replace(/[^0-9X]/gi, '')
    if (digits.length === 10) {
      let sum = 0
      for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
      const check = digits[9] === 'X' ? 10 : parseInt(digits[9])
      setResult((sum + check) % 11 === 0 ? 'Valid ISBN-10' : 'Invalid ISBN-10')
    } else if (digits.length === 13) {
      let sum = 0
      for (let i = 0; i < 12; i++) sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3)
      const check = parseInt(digits[12])
      setResult((sum + check) % 10 === 0 ? 'Valid ISBN-13' : 'Invalid ISBN-13')
    } else setResult('Invalid length')
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="978-3-16-148410-0" className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={validate} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Validate ISBN</button>{result && <div className="mt-4 p-4 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}