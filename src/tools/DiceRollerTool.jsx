import { useState } from 'react'
export default function DiceRollerTool() {
  const [dice, setDice] = useState(1)
  const [sides, setSides] = useState(6)
  const [results, setResults] = useState([])
  const roll = () => {
    const res = Array.from({length: dice}, () => Math.floor(Math.random() * sides) + 1)
    setResults(res)
  }
  return <div><div className="flex gap-4 mb-4"><input type="number" value={dice} onChange={e=>setDice(parseInt(e.target.value)||1)} className="w-24 border rounded-2xl px-4 py-3" /><span className="self-center">d</span><input type="number" value={sides} onChange={e=>setSides(parseInt(e.target.value)||6)} className="w-24 border rounded-2xl px-4 py-3" /></div><button onClick={roll} className="w-full py-3 bg-amber-600 text-white rounded-2xl">Roll</button><div className="mt-4 flex gap-2">{results.map((r,i)=><div key={i} className="px-4 py-2 bg-amber-100 rounded-2xl font-bold">{r}</div>)}</div></div>
}