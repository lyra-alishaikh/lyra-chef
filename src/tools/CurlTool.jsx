import { useState } from 'react'

export default function CurlTool() {
  const [curl, setCurl] = useState(`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name":"Ali","email":"ali@example.com"}'`)
  const [fetchCode, setFetchCode] = useState('')

  const convert = () => {
    try {
      const urlMatch = curl.match(/curl\s+(?:-X\s+\w+\s+)?['"]?([^'\s\\]+)/)
      const url = urlMatch ? urlMatch[1] : 'https://api.example.com'

      const methodMatch = curl.match(/-X\s+(\w+)/)
      const method = methodMatch ? methodMatch[1] : 'GET'

      const headers = {}
      const headerRegex = /-H\s+["']([^:]+):\s*([^"']+)["']/g
      let h
      while ((h = headerRegex.exec(curl)) !== null) {
        headers[h[1]] = h[2]
      }

      const bodyMatch = curl.match(/-d\s+['"]([^'"]+)['"]/)
      const body = bodyMatch ? bodyMatch[1] : null

      let code = `fetch("${url}", {\n  method: "${method}",\n`
      if (Object.keys(headers).length) {
        code += `  headers: ${JSON.stringify(headers, null, 2)},\n`
      }
      if (body) code += `  body: \`${body}\`,\n`
      code += `})`

      setFetchCode(code)
    } catch (e) {
      setFetchCode('Failed to parse: ' + e.message)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
      <div>
        <div className="text-sm font-medium mb-2">Paste curl command</div>
        <textarea value={curl} onChange={e => setCurl(e.target.value)} className="w-full h-64 font-mono text-sm border rounded-3xl p-5" />
        <button onClick={convert} className="mt-3 w-full py-3 bg-zinc-900 text-white rounded-2xl">Convert to fetch</button>
      </div>
      <div>
        <div className="text-sm font-medium mb-2">fetch() equivalent</div>
        <pre className="bg-zinc-950 text-emerald-300 p-5 rounded-3xl text-sm overflow-auto h-64 font-mono whitespace-pre-wrap">{fetchCode || 'Output will appear here...'}</pre>
        {fetchCode && <button onClick={() => navigator.clipboard.writeText(fetchCode)} className="mt-2 text-sm px-4 py-2 bg-white border rounded-2xl">Copy fetch code</button>}
      </div>
    </div>
  )
}
