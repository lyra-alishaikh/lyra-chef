import { useState } from 'react'
export default function JSONToYAMLTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const convert = () => {
    try {
      const obj = JSON.parse(input)
      const yaml = JSON.stringify(obj, null, 2).replace(/"/g, '').replace(/,/g, '').replace(/\{/g, '').replace(/\}/g, '').replace(/\[/g, '').replace(/\]/g, '').trim()
      setOutput(yaml)
    } catch { setOutput('Invalid JSON') }
  }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><button onClick={convert} className="w-full py-3 bg-amber-600 text-white rounded-2xl">Convert to YAML (simple)</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}