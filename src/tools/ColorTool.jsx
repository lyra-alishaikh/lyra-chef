import { useState } from 'react'

export default function ColorTool() {
  const [hex, setHex] = useState('#6366f1')
  const [rgb, setRgb] = useState('99, 102, 241')

  const updateFromHex = (value) => {
    setHex(value)
    // Simple conversion
    const r = parseInt(value.slice(1,3), 16) || 0
    const g = parseInt(value.slice(3,5), 16) || 0
    const b = parseInt(value.slice(5,7), 16) || 0
    setRgb(`${r}, ${g}, ${b}`)
  }

  return (
    <div className="max-w-md space-y-4">
      <div>
        <div className="text-sm font-medium mb-1">HEX</div>
        <input value={hex} onChange={e => updateFromHex(e.target.value)} className="w-full border rounded-2xl px-5 py-3 font-mono" />
      </div>
      <div>
        <div className="text-sm font-medium mb-1">RGB</div>
        <input value={rgb} onChange={e => setRgb(e.target.value)} className="w-full border rounded-2xl px-5 py-3 font-mono" />
      </div>
      <div className="h-20 rounded-2xl border" style={{ backgroundColor: hex }}></div>
    </div>
  )
}