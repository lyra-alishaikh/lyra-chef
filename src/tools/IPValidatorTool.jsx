import { useState } from 'react'
export default function IPValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const validate = () => {
    const ipv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    if (ipv4.test(input)) setResult('Valid IPv4')
    else if (ipv6.test(input)) setResult('Valid IPv6')
    else setResult('Invalid IP')
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} placeholder="192.168.1.1 or 2001:db8::1" className="w-full border rounded-2xl px-5 py-3 mb-4 font-mono" /><button onClick={validate} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Validate</button>{result && <div className="mt-4 p-4 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}