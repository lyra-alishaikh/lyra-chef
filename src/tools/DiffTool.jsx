import { useState } from 'react'
export default function DiffTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [diff, setDiff] = useState([])
  const compare = () => {
    const linesA = a.split('\n')
    const linesB = b.split('\n')
    const res = []
    const max = Math.max(linesA.length, linesB.length)
    for (let i = 0; i < max; i++) {
      if (linesA[i] !== linesB[i]) res.push(`- ${linesA[i] || ''}\n+ ${linesB[i] || ''}`)
      else res.push(`  ${linesA[i] || ''}`)
    }
    setDiff(res)
  }
  return <div className="grid grid-cols-2 gap-4"><textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Original" className="w-full h-60 border rounded-2xl p-5" /><textarea value={b} onChange={e=>setB(e.target.value)} placeholder="Changed" className="w-full h-60 border rounded-2xl p-5" /><button onClick={compare} className="col-span-2 py-3 bg-purple-600 text-white rounded-2xl">Compare</button><pre className="col-span-2 p-5 bg-zinc-50 border rounded-2xl text-sm">{diff.join('\n')}</pre></div>
}