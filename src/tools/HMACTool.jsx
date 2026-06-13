import { useState } from 'react'
export default function HMACTool() {
  const [input, setInput] = useState('')
  const [secret, setSecret] = useState('')
  const [output, setOutput] = useState('')
  const generate = async () => {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(input))
    setOutput(Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join(''))
  }
  return <div className="space-y-4"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Message" className="w-full border rounded-2xl px-5 py-3" /><input type="password" value={secret} onChange={e=>setSecret(e.target.value)} placeholder="Secret" className="w-full border rounded-2xl px-5 py-3" /><button onClick={generate} className="w-full py-3 bg-orange-600 text-white rounded-2xl">Generate HMAC-SHA256</button>{output && <div className="p-5 bg-zinc-900 text-orange-400 font-mono text-sm break-all rounded-2xl">{output}</div>}</div>
}