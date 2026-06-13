import { useState } from 'react'
export default function DateFormatterTool() {
  const [input, setInput] = useState(new Date().toISOString())
  const [format, setFormat] = useState('YYYY-MM-DD HH:mm:ss')
  const [output, setOutput] = useState('')
  const formatDate = () => {
    const d = new Date(input)
    let res = format
    res = res.replace('YYYY', d.getFullYear())
    res = res.replace('MM', String(d.getMonth()+1).padStart(2,'0'))
    res = res.replace('DD', String(d.getDate()).padStart(2,'0'))
    res = res.replace('HH', String(d.getHours()).padStart(2,'0'))
    res = res.replace('mm', String(d.getMinutes()).padStart(2,'0'))
    res = res.replace('ss', String(d.getSeconds()).padStart(2,'0'))
    setOutput(res)
  }
  return <div className="space-y-4"><input type="datetime-local" value={input} onChange={e=>setInput(e.target.value)} className="w-full border rounded-2xl px-5 py-3" /><input value={format} onChange={e=>setFormat(e.target.value)} className="w-full border rounded-2xl px-5 py-3 font-mono" /><button onClick={formatDate} className="w-full py-3 bg-blue-600 text-white rounded-2xl">Format</button>{output && <div className="p-5 bg-zinc-50 border rounded-2xl font-mono">{output}</div>}</div>
}