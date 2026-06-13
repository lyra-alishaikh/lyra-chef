import { useState } from 'react'

export default function PasswordTool() {
  const [length, setLength] = useState(16)
  const [password, setPassword] = useState('')

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let pass = ''
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(pass)
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-4 mb-4">
        <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="flex-1" />
        <div className="w-12 text-center font-mono">{length}</div>
      </div>
      <button onClick={generate} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-medium">Generate Password</button>
      {password && <div className="mt-4 p-5 bg-zinc-900 text-emerald-400 font-mono text-lg rounded-2xl break-all text-center">{password}</div>}
    </div>
  )
}