import { useState } from 'react'
export default function BinaryTextTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const textToBin = () => setOutput(input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '))
  const binToText = () => { try { setOutput(input.split(' ').map(b => String.fromCharCode(parseInt(b,2))).join('')) } catch { setOutput('Invalid') } }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={textToBin} className="flex-1 py-3 bg-sky-600 text-white rounded-2xl">Text → Binary</button><button onClick={binToText} className="flex-1 py-3 border rounded-2xl">Binary → Text</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm break-all">{output}</pre>}</div>
}