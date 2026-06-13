import { useState } from 'react'

export default function UUIDTool() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState([])

  const generate = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
      newUuids.push(uuid)
    }
    setUuids(newUuids)
  }

  return (
    <div className="max-w-md">
      <div className="flex gap-4 mb-4">
        <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)} className="w-24 border rounded-2xl px-4 py-3" min="1" max="20" />
        <button onClick={generate} className="flex-1 py-3 bg-teal-600 text-white rounded-2xl">Generate</button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((u, i) => (
            <div key={i} className="bg-zinc-100 p-3 rounded-2xl font-mono text-sm flex justify-between items-center">
              {u}
              <button onClick={() => navigator.clipboard.writeText(u)} className="text-xs px-3 py-1 bg-white border rounded-xl">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}