import { useState } from 'react'
export default function CaseTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const toCamel = () => setOutput(input.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''))
  const toSnake = () => setOutput(input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase().replace(/\s+/g, '_'))
  const toKebab = () => setOutput(input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/\s+/g, '-'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={toCamel} className="flex-1 py-3 bg-zinc-800 text-white rounded-2xl">camelCase</button><button onClick={toSnake} className="flex-1 py-3 border rounded-2xl">snake_case</button><button onClick={toKebab} className="flex-1 py-3 border rounded-2xl">kebab-case</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}