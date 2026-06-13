import { useMemo, useState } from 'react'

export default function WebAnalyzerTool() {
  const [url, setUrl] = useState('https://example.com')
  const result = useMemo(() => {
    try {
      const parsed = new URL(url)
      return {
        protocol: parsed.protocol.replace(':', ''),
        hostname: parsed.hostname,
        path: parsed.pathname,
        secure: parsed.protocol === 'https:',
        params: parsed.searchParams.size,
        length: url.length,
      }
    } catch {
      return null
    }
  }, [url])

  return (
    <div className="max-w-4xl space-y-4">
      <input value={url} onChange={e => setUrl(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" placeholder="https://example.com" />
      {result ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Metric label="Protocol" value={result.protocol.toUpperCase()} />
          <Metric label="HTTPS" value={result.secure ? 'Yes' : 'No'} tone={result.secure ? 'good' : 'bad'} />
          <Metric label="Hostname" value={result.hostname} />
          <Metric label="Path" value={result.path} />
          <Metric label="Query Params" value={result.params} />
          <Metric label="URL Length" value={result.length} />
        </div>
      ) : (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">Enter a valid absolute URL.</div>
      )}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Browser-only analysis can inspect URL structure and security signals. Full SEO, performance, and HTTP header analysis needs a server-side fetcher.
      </div>
    </div>
  )
}

function Metric({ label, value, tone }) {
  const color = tone === 'good' ? 'text-emerald-700' : tone === 'bad' ? 'text-red-700' : 'text-zinc-900'
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="text-xs font-medium uppercase text-zinc-500">{label}</div>
      <div className={`mt-2 break-all font-semibold ${color}`}>{value}</div>
    </div>
  )
}
