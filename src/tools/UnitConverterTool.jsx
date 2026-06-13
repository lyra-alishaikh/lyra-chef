import { useState } from 'react'
export default function UnitConverterTool() {
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('km')
  const [result, setResult] = useState('')
  const factors = { m:1, km:0.001, cm:100, mm:1000, inch:39.3701, ft:3.28084 }
  const convert = () => {
    const v = parseFloat(value)
    if (isNaN(v)) return setResult('Invalid')
    const base = v / factors[from]
    const res = base * factors[to]
    setResult(res.toFixed(4) + ' ' + to)
  }
  return <div className="space-y-4"><input value={value} onChange={e=>setValue(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><div className="flex gap-4"><select value={from} onChange={e=>setFrom(e.target.value)} className="flex-1 border rounded-2xl px-4 py-3">{Object.keys(factors).map(u => <option key={u} value={u}>{u}</option>)}</select><select value={to} onChange={e=>setTo(e.target.value)} className="flex-1 border rounded-2xl px-4 py-3">{Object.keys(factors).map(u => <option key={u} value={u}>{u}</option>)}</select></div><button onClick={convert} className="w-full py-3 bg-orange-600 text-white rounded-2xl">Convert</button>{result && <div className="p-5 bg-zinc-50 border rounded-2xl">{result}</div>}</div>
}