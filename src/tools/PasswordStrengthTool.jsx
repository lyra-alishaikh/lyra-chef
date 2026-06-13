import { useState } from 'react'
export default function PasswordStrengthTool() {
  const [pass, setPass] = useState('')
  const score = Math.min(4, Math.floor((pass.length / 4) + (/\d/.test(pass)?1:0) + (/[A-Z]/.test(pass)?1:0) + (/[^A-Za-z0-9]/.test(pass)?1:0)))
  const label = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][score]
  return <div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full border rounded-2xl px-5 py-3 mb-4" /><div className="p-5 bg-zinc-100 rounded-2xl"><div className="font-semibold">{label}</div><div className="text-xs mt-1">Score: {score}/4</div></div></div>
}