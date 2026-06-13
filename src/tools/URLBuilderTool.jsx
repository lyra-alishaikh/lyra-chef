import { useState } from 'react'
export default function URLBuilderTool() {
  const [base, setBase] = useState('https://example.com')
  const [path, setPath] = useState('/api')
  const [query, setQuery] = useState('key=value')
  const build = () => `${base}${path}?${query}`
  return <div className="space-y-4"><input value={base} onChange={e=>setBase(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><input value={path} onChange={e=>setPath(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><div className="p-4 bg-zinc-900 text-emerald-400 font-mono rounded-2xl break-all">{build()}</div></div>
}