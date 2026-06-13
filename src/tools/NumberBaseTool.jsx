import { useState } from 'react'
export default function NumberBaseTool() {
  const [input, setInput] = useState('255')
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(16)
  const [output, setOutput] = useState('')
  const convert = () => {
    try {
      const num = parseInt(input, fromBase)
      setOutput(num.toString(toBase).toUpperCase())
    } catch { setOutput('Invalid') }
  }
  return <div className="space-y-4"><input value={input} onChange={e=>setInput(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><div className="flex gap-4"><select value={fromBase} onChange={e=>setFromBase(parseInt(e.target.value))} className="flex-1 border rounded-2xl px-4 py-3"><option value="2">Binary</option><option value="8">Octal</option><option value="10">Decimal</option><option value="16">Hex</option></select><select value={toBase} onChange={e=>setToBase(parseInt(e.target.value))} className="flex-1 border rounded-2xl px-4 py-3"><option value="2">Binary</option><option value="8">Octal</option><option value="10">Decimal</option><option value="16">Hex</option></select></div><button onClick={convert} className="w-full py-3 bg-indigo-600 text-white rounded-2xl">Convert</button>{output && <div className="p-5 bg-zinc-900 text-indigo-400 font-mono rounded-2xl">{output}</div>}</div>
}