import { useState } from 'react'
export default function PasswordEntropyTool() {
  const [pass, setPass] = useState('')
  const entropy = pass ? (Math.log2(95) * pass.length).toFixed(1) : '0'
  return <div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full border rounded-2xl px-5 py-3 mb-4" /><div className="p-5 bg-zinc-100 rounded-2xl"><div className="text-2xl font-semibold">{entropy} bits</div><div className="text-xs">Approximate entropy (assuming 95 char set)</div></div></div>
}