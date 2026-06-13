import { useState } from 'react'
export default function CSVToMarkdownTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const convert = () => {
    const lines = input.trim().split('\n')
    if (lines.length < 1) return
    const headers = lines[0].split(',').map(h => h.trim())
    let md = '| ' + headers.join(' | ') + ' |\n'
    md += '| ' + headers.map(() => '---').join(' | ') + ' |\n'
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(c => c.trim())
      md += '| ' + row.join(' | ') + ' |\n'
    }
    setOutput(md)
  }
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 border rounded-2xl p-5 mb-4" /><button onClick={convert} className="w-full py-3 bg-emerald-600 text-white rounded-2xl">Convert to Markdown Table</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm overflow-auto">{output}</pre>}</div>
}