import { useState } from 'react'
export default function ContrastCheckerTool() {
  const [fg, setFg] = useState('#000000')
  const [bg, setBg] = useState('#ffffff')
  const [ratio, setRatio] = useState('')
  const check = () => {
    // Very simplified ratio calculation
    const l1 = parseInt(fg.slice(1), 16)
    const l2 = parseInt(bg.slice(1), 16)
    const r = Math.abs(l1 - l2) / 255 * 21
    setRatio(r.toFixed(2) + ':1 (approx)')
  }
  return <div className="space-y-4"><div className="flex gap-4"><input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-20 h-12" /><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-20 h-12" /></div><button onClick={check} className="w-full py-3 bg-blue-600 text-white rounded-2xl">Check Contrast</button>{ratio && <div className="p-5 bg-zinc-50 border rounded-2xl">{ratio}</div>}</div>
}