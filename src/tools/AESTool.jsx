import { useState } from 'react'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const toBase64 = (bytes) => btoa(String.fromCharCode(...bytes))
const fromBase64 = (value) => Uint8Array.from(atob(value), c => c.charCodeAt(0))

async function getKey(password, salt) {
  const baseKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export default function AESTool() {
  const [input, setInput] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const encrypt = async () => {
    setError('')
    if (!input || !password) {
      setError('Add text and a password first.')
      return
    }
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const key = await getKey(password, salt)
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(input)))
    setOutput(JSON.stringify({ v: 1, alg: 'AES-256-GCM', salt: toBase64(salt), iv: toBase64(iv), data: toBase64(encrypted) }, null, 2))
  }

  const decrypt = async () => {
    setError('')
    try {
      const payload = JSON.parse(input)
      const salt = fromBase64(payload.salt)
      const iv = fromBase64(payload.iv)
      const data = fromBase64(payload.data)
      const key = await getKey(password, salt)
      const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
      setOutput(decoder.decode(decrypted))
    } catch {
      setError('Could not decrypt. Check the payload and password.')
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-44 border border-zinc-300 rounded-2xl p-5 font-mono text-sm" placeholder="Plain text to encrypt, or encrypted JSON to decrypt" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-zinc-300 rounded-2xl px-5 py-3" placeholder="Password" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={encrypt} className="flex-1 py-3 bg-zinc-900 text-white rounded-2xl font-medium">Encrypt</button>
        <button onClick={decrypt} className="flex-1 py-3 border border-zinc-300 rounded-2xl font-medium">Decrypt</button>
      </div>
      {error && <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm">{error}</div>}
      {output && <pre className="p-5 bg-white border border-zinc-200 rounded-2xl font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>}
    </div>
  )
}
