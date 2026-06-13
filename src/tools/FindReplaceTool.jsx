import { useState } from 'react'
export default function FindReplaceTool() {
  const [input, setInput] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [output, setOutput] = useState('')
  const doReplace = () => setOutput(input.split(find).join(replace))
  return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5" /><input value={find} onChange={e=>setFind(e.target.value)} placeholder="Find" className="w-full border rounded-2xl px-5 py-3" /><input value={replace} onChange={e=>setReplace(e.target.value)} placeholder="Replace with" className="w-full border rounded-2xl px-5 py-3" /><button onClick={doReplace} className="w-full py-3 bg-blue-600 text-white rounded-2xl">Replace All</button>{output && <pre className="p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}