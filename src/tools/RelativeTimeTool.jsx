import { useState } from 'react'
export default function RelativeTimeTool() {
  const [date, setDate] = useState(new Date().toISOString().slice(0,16))
  const [output, setOutput] = useState('')
  const calc = () => {
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) setOutput(diff + ' seconds ago')
    else if (diff < 3600) setOutput(Math.floor(diff/60) + ' minutes ago')
    else if (diff < 86400) setOutput(Math.floor(diff/3600) + ' hours ago')
    else setOutput(Math.floor(diff/86400) + ' days ago')
  }
  return <div><input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="w-full border rounded-2xl px-5 py-3 mb-4" /><button onClick={calc} className="w-full py-3 bg-teal-600 text-white rounded-2xl">Calculate Relative Time</button>{output && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl">{output}</div>}</div>
}