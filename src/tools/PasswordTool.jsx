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
  const [length, setLength] = useState(18)
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [passwords, setPasswords] = useState([])
  const [copied, setCopied] = useState(null)

  const generate = () => {
    const chars = Object.entries(options).filter(([, enabled]) => enabled).map(([key]) => sets[key]).join('')
    if (!chars) return
    const newPw = Array.from({ length: 6 }, () => Array.from({ length }, () => securePick(chars)).join(''))
    setPasswords(newPw)
  }

  const toggle = (key) => setOptions(current => ({ ...current, [key]: !current[key] }))

  const copy = (pw, idx) => {
    navigator.clipboard.writeText(pw)
    setCopied(idx)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white border rounded-3xl p-6 space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Length</span>
            <span className="font-mono font-semibold">{length}</span>
          </div>
          <input type="range" min="8" max="64" value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-zinc-900" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(sets).map(key => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer text-sm bg-zinc-50 rounded-2xl px-4 py-2.5">
              <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} className="w-4 h-4 accent-zinc-900" />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={generate} className="w-full py-4 bg-zinc-900 hover:bg-black active:bg-zinc-950 text-white rounded-3xl font-semibold text-lg tracking-tight">Generate passwords</button>

      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw, i) => (
            <button key={i} onClick={() => copy(pw, i)} className="w-full group text-left font-mono bg-white border hover:border-zinc-400 rounded-2xl px-5 py-4 text-sm flex items-center justify-between">
              <span className="break-all">{pw}</span>
              <span className="text-xs text-emerald-600 group-active:text-emerald-700">{copied === i ? 'Copied!' : 'Copy'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
