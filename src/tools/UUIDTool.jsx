import { useState } from 'react'
import { v4, v5, v6, v7, validate as validateUuid } from 'uuid'

function v8() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x80
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export default function UUIDTool() {
  const [version, setVersion] = useState('v4')
  const [count, setCount] = useState(5)
  const [namespace, setNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
  const [name, setName] = useState('example')
  const [uuids, setUuids] = useState([])
  const [error, setError] = useState('')

  const generate = () => {
    setError('')
    if (version === 'v5' && !validateUuid(namespace)) {
      setError('Enter a valid namespace UUID for v5.')
      setUuids([])
      return
    }

    const makers = {
      v4,
      v5: () => v5(name, namespace),
      v6,
      v7,
      v8,
    }

    setUuids(Array.from({ length: count }, () => makers[version]()))
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <select value={version} onChange={e => setVersion(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3">
          <option value="v4">UUID v4 (Random)</option>
          <option value="v5">UUID v5 (Name-based)</option>
          <option value="v6">UUID v6 (Sortable time)</option>
          <option value="v7">UUID v7 (Unix time)</option>
          <option value="v8">UUID v8 (Custom/random)</option>
        </select>
        <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className="rounded-2xl border border-zinc-300 px-4 py-3" min="1" max="100" />
      </div>

      {version === 'v5' && (
        <div className="grid gap-3">
          <input value={namespace} onChange={e => setNamespace(e.target.value)} placeholder="Namespace UUID" className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" />
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full rounded-2xl border border-zinc-300 px-5 py-3" />
        </div>
      )}

      <button onClick={generate} className="w-full rounded-2xl bg-zinc-900 py-3 font-medium text-white">Generate</button>
      {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((u, i) => (
            <div key={`${u}-${i}`} className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-3 font-mono text-sm">
              <span className="break-all">{u}</span>
              <button onClick={() => navigator.clipboard.writeText(u)} className="rounded-xl border bg-white px-3 py-1 text-xs">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
