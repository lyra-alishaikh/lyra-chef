import { useState } from 'react'
export default function RandomColorTool() {
  const [colors, setColors] = useState([])
  const generate = () => {
    const newColors = Array.from({length: 6}, () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'))
    setColors(newColors)
  }
  return <div><button onClick={generate} className="w-full py-3 bg-pink-600 text-white rounded-2xl mb-4">Generate Palette</button><div className="grid grid-cols-3 gap-2">{colors.map((c,i) => <div key={i} className="h-20 rounded-2xl flex items-center justify-center font-mono text-white text-sm" style={{backgroundColor: c}}>{c}</div>)}</div></div>
}