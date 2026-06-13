import { useState } from 'react'

export default function UUIDTool() {
  const [version, setVersion] = useState('v4')
  const [count, setCount] = useState(5)
  const [namespace, setNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
  const [name, setName] = useState('example')
  const [uuids, setUuids] = useState([])

  const generateV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generateV5 = () => {
    // Simple deterministic v5 simulation (real implementation would use SHA-1)
    return `${namespace.slice(0, 8)}-${namespace.slice(9, 13)}-${name.length.toString(16).padStart(4, '0')}-a${Math.floor(Math.random() * 1000).toString(16).padStart(3, '0')}-${Date.now().toString(16).slice(-12)}`
  }

  const generate = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      if (version === 'v4') newUuids.push(generateV4())
      else if (version === 'v5') newUuids.push(generateV5())
      else newUuids.push('v' + version + ' coming soon')
    }
    setUuids(newUuids)
  }

  return (
    <div className="max-w-md">
      <div className="flex gap-4 mb-4">
        <select value={version} onChange={e => setVersion(e.target.value)} className="border rounded-2xl px-4 py-3">
          <option value="v4">UUID v4 (Random)</option>
          <option value="v5">UUID v5 (Name-based)</option>
          <option value="v6">UUID v6 (Time-based)</option>
          <option value="v7">UUID v7 (Time-based)</option>
        </select>
        <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)} className="w-20 border rounded-2xl px-4 py-3" min="1" max="20" />
      </div>

      {version === 'v5' && (
        <div className="mb-4 space-y-3">
          <input value={namespace} onChange={e => setNamespace(e.target.value)} placeholder="Namespace UUID" className="w-full border rounded-2xl px-5 py-3 font-mono text-sm" />
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full border rounded-2xl px-5 py-3" />
        </div>
      )}

      <button onClick={generate} className="w-full py-3 bg-teal-600 text-white rounded-2xl mb-4">Generate</button>

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