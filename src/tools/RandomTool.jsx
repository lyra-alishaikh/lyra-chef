import { useState } from 'react'
export default function RandomTool() {
  const [count, setCount] = useState(5)
  const [type, setType] = useState('number')
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [output, setOutput] = useState([])
  const generate = () => {
    const res = []
    for (let i = 0; i < count; i++) {
      if (type === 'number') res.push(Math.floor(Math.random() * (max - min + 1)) + min)
      else if (type === 'string') res.push(Math.random().toString(36).substring(2, 10))
      else res.push(Math.random() > 0.5)
    }
    setOutput(res)
  }
  return <div><div className="flex gap-4 mb-4"><select value={type} onChange={e=>setType(e.target.value)} className="border rounded-2xl px-4 py-3"><option value="number">Numbers</option><option value="string">Strings</option><option value="bool">Booleans</option></select><input type="number" value={count} onChange={e=>setCount(parseInt(e.target.value)||1)} className="w-20 border rounded-2xl px-4 py-3" /></div>{type==='number' && <div className="flex gap-4 mb-4"><input type="number" value={min} onChange={e=>setMin(parseInt(e.target.value))} className="w-24 border rounded-2xl px-4 py-3" /><input type="number" value={max} onChange={e=>setMax(parseInt(e.target.value))} className="w-24 border rounded-2xl px-4 py-3" /></div>}<button onClick={generate} className="w-full py-3 bg-teal-600 text-white rounded-2xl">Generate</button><div className="mt-4 space-y-2">{output.map((v,i)=><div key={i} className="p-3 bg-zinc-100 rounded-2xl font-mono">{String(v)}</div>)}</div></div>
}