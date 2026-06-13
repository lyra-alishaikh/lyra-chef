import { useState } from 'react'

const sets = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/',
}

function securePick(chars) {
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return chars[bytes[0] % chars.length]
}

export default function PasswordTool() {
  const [length, setLength] = useState(20)
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [passwords, setPasswords] = useState([])

  const generate = () => {
    const chars = Object.entries(options).filter(([, enabled]) => enabled).map(([key]) => sets[key]).join('')
    if (!chars) return
    setPasswords(Array.from({ length: 5 }, () => Array.from({ length }, () => securePick(chars)).join('')))
  }

  const toggle = (key) => setOptions(current => ({ ...current, [key]: !current[key] }))

  return (
    <div className="max-w-3xl space-y-5">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-medium">Length</div>
          <div className="font-mono text-sm">{length}</div>
        </div>
        <input type="range" min="8" max="80" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.keys(sets).map(key => (
          <label key={key} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
            <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} className="h-4 w-4" />
            <span className="capitalize">{key}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} className="w-full rounded-2xl bg-zinc-900 py-4 font-medium text-white">Generate Passwords</button>

      <div className="space-y-3">
        {passwords.map(password => (
          <div key={password} className="rounded-2xl border border-zinc-200 bg-white p-4 font-mono text-sm break-all">{password}</div>
        ))}
      </div>
    </div>
  )
}
