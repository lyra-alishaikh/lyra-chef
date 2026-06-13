import { useState } from 'react'
export default function JWTTool() {
  const [token, setToken] = useState('')
  const [payload, setPayload] = useState('')
  const decode = () => {
    try {
      const parts = token.split('.')
      const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      setPayload(JSON.stringify(JSON.parse(decoded), null, 2))
    } catch {
      setPayload('Invalid JWT')
    }
  }
  return <div><textarea value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste JWT here" className="w-full h-40 border rounded-2xl p-5 font-mono mb-4" /><button onClick={decode} className="w-full py-3 bg-purple-600 text-white rounded-2xl">Decode</button>{payload && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm overflow-auto">{payload}</pre>}</div>
}