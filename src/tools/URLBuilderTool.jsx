import { useMemo, useState } from 'react'

export default function URLBuilderTool() {
  const [base, setBase] = useState('https://example.com/search')
  const [params, setParams] = useState('q=lyra chef\nutm_source=toolkit')

  const output = useMemo(() => {
    try {
      const url = new URL(base)
      params.split('\n').map(line => line.trim()).filter(Boolean).forEach(line => {
        const [key, ...rest] = line.split('=')
        url.searchParams.set(key.trim(), rest.join('=').trim())
      })
      return url.toString()
    } catch {
      return 'Enter a valid absolute URL.'
    }
  }, [base, params])

  return (
    <div className="max-w-4xl space-y-4">
      <input value={base} onChange={e => setBase(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" placeholder="https://example.com/path" />
      <textarea value={params} onChange={e => setParams(e.target.value)} className="h-44 w-full rounded-2xl border border-zinc-300 p-5 font-mono text-sm" placeholder="key=value, one per line" />
      <pre className="rounded-2xl border border-zinc-200 bg-white p-5 font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
    </div>
  )
}
