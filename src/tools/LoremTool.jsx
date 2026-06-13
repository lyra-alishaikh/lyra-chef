import { useState } from 'react'
export default function LoremTool() {
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')
  const generate = () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit']
    let text = ''
    for (let i = 0; i < count; i++) {
      text += words.sort(() => 0.5 - Math.random()).slice(0, 12).join(' ') + '. '
    }
    setOutput(text)
  }
  return <div><div className="flex gap-4 mb-4"><input type="number" value={count} onChange={e=>setCount(parseInt(e.target.value)||1)} className="w-24 border rounded-2xl px-4 py-3" /><button onClick={generate} className="flex-1 py-3 bg-yellow-600 text-white rounded-2xl">Generate</button></div>{output && <div className="p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</div>}</div>
}