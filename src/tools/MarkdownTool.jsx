import { useState } from 'react'
export default function MarkdownTool() {
  const [input, setInput] = useState('')
  const preview = input.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
  return <div className="grid grid-cols-2 gap-6"><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 border rounded-2xl p-5 font-mono" placeholder="Markdown..." /><div className="p-6 border rounded-2xl prose prose-sm" dangerouslySetInnerHTML={{__html: preview}} /></div>
}