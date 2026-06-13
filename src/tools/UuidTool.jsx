import { useMemo, useState } from 'react'

const crockford = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

function ulid() {
  let time = Date.now()
  let output = ''

  for (let i = 0; i < 10; i += 1) {
    output = crockford[time % 32] + output
    time = Math.floor(time / 32)
  }

  const bytes = new Uint8Array(10)
  crypto.getRandomValues(bytes)
  for (const byte of bytes) output += crockford[byte % 32]

  return output
}

function uuidV1Like() {
  const now = BigInt(Date.now()) + 12219292800000n
  const ticks = now * 10000n
  const timeLow = Number(ticks & 0xffffffffn).toString(16).padStart(8, '0')
  const timeMid = Number((ticks >> 32n) & 0xffffn).toString(16).padStart(4, '0')
  const timeHigh = (Number((ticks >> 48n) & 0x0fffn) | 0x1000).toString(16).padStart(4, '0')
  const random = crypto.getRandomValues(new Uint8Array(8))
  random[0] = (random[0] & 0x3f) | 0x80
  const node = Array.from(random.slice(2)).map(b => b.toString(16).padStart(2, '0')).join('')
  const clock = Array.from(random.slice(0, 2)).map(b => b.toString(16).padStart(2, '0')).join('')

  return `${timeLow}-${timeMid}-${timeHigh}-${clock}-${node}`
}

export default function UuidTool() {
  const [kind, setKind] = useState('uuidv4')
  const [count, setCount] = useState(8)
  const [values, setValues] = useState([])

  const title = useMemo(() => ({
    uuidv4: 'UUID v4',
    uuidv1: 'UUID v1',
    guid: 'GUID',
    ulid: 'ULID',
  }[kind]), [kind])

  const generate = () => {
    const next = Array.from({ length: count }, () => {
      if (kind === 'ulid') return ulid()
      if (kind === 'uuidv1') return uuidV1Like()
      return crypto.randomUUID()
    })
    setValues(next)
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex flex-wrap gap-3">
        <select value={kind} onChange={e => setKind(e.target.value)} className="border rounded-2xl px-4 py-3 bg-white">
          <option value="uuidv4">UUID v4</option>
          <option value="uuidv1">UUID v1</option>
          <option value="guid">GUID</option>
          <option value="ulid">ULID</option>
        </select>
        <input type="number" min="1" max="100" value={count} onChange={e => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))} className="w-28 border rounded-2xl px-4 py-3" />
        <button onClick={generate} className="px-6 py-3 bg-zinc-900 text-white rounded-2xl">Generate {title}</button>
      </div>
      <textarea readOnly value={values.join('\n')} className="w-full h-96 border rounded-2xl p-5 font-mono text-sm bg-white" placeholder="Generated IDs will appear here" />
    </div>
  )
}
