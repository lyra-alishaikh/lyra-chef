import { useState } from 'react'

const crockford = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

function ulid() {
  let time = Date.now()
  let timePart = ''
  for (let i = 0; i < 10; i += 1) {
    timePart = crockford[time % 32] + timePart
    time = Math.floor(time / 32)
  }
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  let randomPart = ''
  for (let i = 0; i < 16; i += 1) randomPart += crockford[bytes[i] % 32]
  return timePart + randomPart
}

export default function IDGeneratorTool() {
  const [type, setType] = useState('uuid')
  const [count, setCount] = useState(5)
  const [output, setOutput] = useState('')

  const generate = () => {
    const makers = {
      uuid: () => crypto.randomUUID(),
      guid: () => crypto.randomUUID().toUpperCase(),
      ulid,
    }
    setOutput(Array.from({ length: count }, () => makers[type]()).join('\n'))
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_120px_auto]">
        <select value={type} onChange={e => setType(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3">
          <option value="uuid">UUID v4</option>
          <option value="guid">GUID</option>
          <option value="ulid">ULID</option>
        </select>
        <input type="number" min="1" max="100" value={count} onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} className="rounded-2xl border border-zinc-300 px-4 py-3" />
        <button onClick={generate} className="rounded-2xl bg-zinc-900 px-6 py-3 font-medium text-white">Generate</button>
      </div>
      <pre className="min-h-52 rounded-2xl border border-zinc-200 bg-white p-5 font-mono text-sm whitespace-pre-wrap">{output}</pre>
    </div>
  )
}
