import { useState } from 'react'

export default function TimestampTool() {
  const [unix, setUnix] = useState(Math.floor(Date.now() / 1000).toString())
  const [human, setHuman] = useState(new Date().toISOString().slice(0, 19))
  const [output, setOutput] = useState('')

  const toHuman = () => {
    if (!unix) return
    const date = new Date(Number(unix) * (unix.length > 10 ? 1 : 1000))
    setHuman(date.toISOString().slice(0, 19))
    setOutput(`${date.toUTCString()}\nLocal: ${date.toLocaleString()}`)
  }

  const toUnix = () => {
    if (!human) return
    const date = new Date(human)
    setUnix(Math.floor(date.getTime() / 1000).toString())
    setOutput(`Milliseconds: ${date.getTime()}`)
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <div className="text-sm font-medium mb-1">Unix Timestamp</div>
        <input value={unix} onChange={e => setUnix(e.target.value)} className="w-full border border-zinc-300 rounded-2xl px-5 py-3 font-mono" />
      </div>
      <div>
        <div className="text-sm font-medium mb-1">ISO Date</div>
        <input type="datetime-local" value={human} onChange={e => setHuman(e.target.value)} className="w-full border border-zinc-300 rounded-2xl px-5 py-3" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={toHuman} className="flex-1 py-3 bg-zinc-900 text-white rounded-2xl font-medium">Unix to Date</button>
        <button onClick={toUnix} className="flex-1 py-3 border border-zinc-300 rounded-2xl font-medium">Date to Unix</button>
      </div>
      {output && <pre className="p-5 bg-white border border-zinc-200 rounded-2xl font-mono text-sm whitespace-pre-wrap">{output}</pre>}
    </div>
  )
}
