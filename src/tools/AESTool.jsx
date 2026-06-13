import { useState } from 'react'

export default function AESTool() {
  const [input, setInput] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState('')

  const encrypt = async () => {
    // Simple demo - in real would use Web Crypto
    setOutput(btoa(input + '::' + password))
  }

  const decrypt = () => {
    try {
      const decoded = atob(output)
      setInput(decoded)
    } catch (e) {
      setOutput('Failed')
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5" placeholder="Text to encrypt" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-2xl px-5 py-3" placeholder="Password" />
      <div className="flex gap-3">
        <button onClick={encrypt} className="flex-1 py-3 bg-red-600 text-white rounded-2xl">Encrypt</button>
        <button onClick={decrypt} className="flex-1 py-3 border rounded-2xl">Decrypt</button>
      </div>
      {output && <div className="p-5 bg-zinc-50 border rounded-2xl font-mono text-sm break-all">{output}</div>}
    </div>
  )
}