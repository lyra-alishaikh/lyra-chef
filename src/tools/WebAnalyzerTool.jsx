import { useMemo, useState } from 'react'

export default function WebAnalyzerTool() {
  const [url, setUrl] = useState('https://heylyra.pk')
  const [html, setHtml] = useState('')

  const report = useMemo(() => {
    const items = []

    try {
      const parsed = new URL(url)
      items.push(['HTTPS', parsed.protocol === 'https:' ? 'Pass' : 'Use HTTPS for production pages'])
      items.push(['Hostname length', `${parsed.hostname.length} characters`])
      items.push(['Query params', `${Array.from(parsed.searchParams).length}`])
    } catch {
      items.push(['URL', 'Invalid URL'])
    }

    if (html.trim()) {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      items.push(['Title', doc.querySelector('title')?.textContent?.trim() || 'Missing'])
      items.push(['Meta description', doc.querySelector('meta[name="description"]')?.getAttribute('content') || 'Missing'])
      items.push(['Canonical', doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || 'Missing'])
      items.push(['Images without alt', `${Array.from(doc.images).filter(img => !img.alt).length}`])
      items.push(['H1 count', `${doc.querySelectorAll('h1').length}`])
      items.push(['Links', `${doc.querySelectorAll('a[href]').length}`])
    } else {
      items.push(['HTML audit', 'Paste page HTML to check SEO and accessibility basics'])
    }

    return items
  }, [url, html])

  return (
    <div className="max-w-5xl grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <input value={url} onChange={e => setUrl(e.target.value)} className="w-full border rounded-2xl px-5 py-3 font-mono text-sm" />
        <textarea value={html} onChange={e => setHtml(e.target.value)} className="w-full h-96 border rounded-2xl p-5 font-mono text-xs" placeholder="Optional: paste HTML source for deeper checks" />
      </div>
      <div className="space-y-3">
        {report.map(([label, value]) => (
          <div key={label} className="border rounded-2xl bg-white p-4">
            <div className="text-xs font-semibold text-zinc-500">{label}</div>
            <div className="mt-1 text-sm break-words">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
