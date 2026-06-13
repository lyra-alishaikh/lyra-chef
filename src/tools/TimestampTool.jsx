import { useState } from 'react'

export default function TimestampTool() {
  const [unix, setUnix] = useState('')
  const [human, setHuman] = useState('')

  const toHuman = () => {
    if (!unix) return
    setHuman(new Date(parseInt(unix) * 1000).toISOString().replace('T', ' ').slice(0, 19))
  }

  const toUnix = () => {
    if (!human) return
    setUnix(Math.floor(new Date(human).getTime() / 1000).toString())
  }

  return (
    <div className="max-w-md space-y-4">
      <div>
        <div className="text-sm font-medium mb-1">Unix Timestamp</div>
        <input value={unix} onChange={e => setUnix(e.target.value)} className="w-full border rounded-2xl px-5 py-3" />
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Human Date</div>
        <input value={human} onChange={e => setHuman(e.target.value)} className="w-full border rounded-2xl px-5 py-3" placeholder="2026-06-13 13:00:00" />
      </div>
      <div className="flex gap-3">
        <button onClick={toHuman} className="flex-1 py-3 border rounded-2xl">Unix → Date</button>
        <button onClick={toUnix} className="flex-1 py-3 border rounded-2xl">Date → Unix</button>
      </div>
    </div>
  )
}