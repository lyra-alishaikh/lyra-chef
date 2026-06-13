import { useState } from 'react'
export default function SemverTool() {
  const [major, setMajor] = useState(1)
  const [minor, setMinor] = useState(0)
  const [patch, setPatch] = useState(0)
  const [prerelease, setPrerelease] = useState('')
  const version = `${major}.${minor}.${patch}${prerelease ? '-' + prerelease : ''}`
  return <div className="space-y-4"><div className="flex gap-4"><input type="number" value={major} onChange={e=>setMajor(parseInt(e.target.value)||0)} className="w-24 border rounded-2xl px-4 py-3" /><input type="number" value={minor} onChange={e=>setMinor(parseInt(e.target.value)||0)} className="w-24 border rounded-2xl px-4 py-3" /><input type="number" value={patch} onChange={e=>setPatch(parseInt(e.target.value)||0)} className="w-24 border rounded-2xl px-4 py-3" /></div><input value={prerelease} onChange={e=>setPrerelease(e.target.value)} placeholder="alpha.1 (optional)" className="w-full border rounded-2xl px-5 py-3" /><div className="p-5 bg-zinc-900 text-emerald-400 font-mono rounded-2xl">{version}</div></div>
}