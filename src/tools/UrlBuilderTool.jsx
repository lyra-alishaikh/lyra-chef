import { useMemo, useState } from 'react'

export default function UrlBuilderTool() {
  const [base, setBase] = useState('https://example.com/search')
  const [params, setParams] = useState('q=lyra chef\npage=1\nutm_source=tools')

  const output = useMemo(() => {
    try {
      const url = new URL(base)
      const search = new URLSearchParams(url.search)
      params.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (!trimmed) return
        const index = trimmed.indexOf('=')
        const key = index === -1 ? trimmed : trimmed.slice(0, index)
        const value = index === -1 ? '' : trimmed.slice(index + 1)
        search.set(key, value)
      })
      url.search = search.toString()
      return url.toString()
    } catch (error) {
      return error.message
    }
  }, [base, params])

  return (
    <div className="max-w-4xl space-y-5">
      <label className="block">
        <span className="text-sm font-medium">Base URL</span>
        <input value={base} onChange={e => setBase(e.target.value)} className="mt-2 w-full border rounded-2xl px-5 py-3 font-mono text-sm" />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Query params</span>
        <textarea value={params} onChange={e => setParams(e.target.value)} className="mt-2 w-full h-48 border rounded-2xl p-5 font-mono text-sm" />
      </label>
      <pre className="border rounded-2xl bg-zinc-900 text-emerald-300 p-5 font-mono text-sm break-all whitespace-pre-wrap">{output}</pre>
    </div>
  )
}
