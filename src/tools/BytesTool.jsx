import { useState } from 'react'
export default function BytesTool() {
  const [input, setInput] = useState('1024')
  const [output, setOutput] = useState('')
  const convert = () => {
    const bytes = parseInt(input)
    if (isNaN(bytes)) return setOutput('Invalid')
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0, val = bytes
    while (val >= 1024 && i < units.length-1) { val /= 1024; i++ }
    setOutput(val.toFixed(2) + ' ' + units[i])
  }
  return <div><input value={input} onChange={e=>setInput(e.target.value)} className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={convert} className="w-full py-3 bg-teal-600 text-white rounded-2xl">Convert</button>{output && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl">{output}</div>}</div>
}