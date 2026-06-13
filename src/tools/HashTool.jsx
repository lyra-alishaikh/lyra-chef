import { useState } from 'react'
import CryptoJS from 'crypto-js'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [algo, setAlgo] = useState('SHA256')

  const generate = () => {
    if (!input) return
    const hashers = {
      MD5: CryptoJS.MD5,
      SHA1: CryptoJS.SHA1,
      SHA256: CryptoJS.SHA256,
      SHA512: CryptoJS.SHA512,
    }
    setOutput(hashers[algo](input).toString(CryptoJS.enc.Hex))
  }

  return (
    <div className="max-w-3xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-40 border border-zinc-300 rounded-2xl p-5 font-mono text-sm" placeholder="Text to hash" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <select value={algo} onChange={e => setAlgo(e.target.value)} className="border border-zinc-300 rounded-2xl px-4 py-3">
          <option value="MD5">MD5</option>
          <option value="SHA1">SHA1</option>
          <option value="SHA256">SHA256</option>
          <option value="SHA512">SHA512</option>
        </select>
        <button onClick={generate} className="px-8 py-3 bg-zinc-900 text-white rounded-2xl font-medium">Generate Hash</button>
      </div>
      {output && <div className="p-5 bg-white border border-zinc-200 font-mono text-sm break-all rounded-2xl">{output}</div>}
    </div>
  )
}
