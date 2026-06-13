import { useState } from 'react'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [algo, setAlgo] = useState('SHA-256')

  const generate = async () => {
    if (!input) return
    if (algo === 'MD5') {
      setOutput('MD5 is not available in the browser Web Crypto API. Choose SHA-1, SHA-256, or SHA-512.')
      return
    }
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest(algo, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    setOutput(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''))
  }

  return (
    <div className="max-w-2xl">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-32 border rounded-2xl p-5 font-mono" placeholder="Text to hash" />
      <div className="flex gap-3 mt-4">
        <select value={algo} onChange={e => setAlgo(e.target.value)} className="border rounded-2xl px-4">
          <option>SHA-256</option>
          <option>SHA-512</option>
          <option>SHA-1</option>
          <option>MD5</option>
        </select>
        <button onClick={generate} className="px-8 py-3 bg-orange-600 text-white rounded-2xl">Generate Hash</button>
      </div>
      {output && <div className="mt-4 p-5 bg-zinc-900 text-orange-400 font-mono text-sm break-all rounded-2xl">{output}</div>}
    </div>
  )
}
