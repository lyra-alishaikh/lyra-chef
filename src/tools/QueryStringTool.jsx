import { useState } from 'react'
export default function QueryStringTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const parse = () => {
    try {
      const params = new URLSearchParams(input.startsWith('?') ? input : '?' + input)
      const obj = {}
      params.forEach((v,k) => obj[k] = v)
      setOutput(JSON.stringify(obj, null, 2))
    } catch { setOutput('Invalid') }
  }
  const build = () => {
    try {
      const obj = JSON.parse(input)
      setOutput('?' + Object.entries(obj).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&'))
    } catch { setOutput('Invalid JSON') }
  }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={parse} className="flex-1 py-3 bg-sky-600 text-white rounded-2xl">Parse to JSON</button><button onClick={build} className="flex-1 py-3 border rounded-2xl">Build from JSON</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}