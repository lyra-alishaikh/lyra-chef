import { useState } from 'react'

const escapeHtml = (value) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
const unescapeHtml = (value) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

export default function TextCodecTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const run = (mode) => {
    try {
      const actions = {
        urlEncode: encodeURIComponent,
        urlDecode: decodeURIComponent,
        htmlEncode: escapeHtml,
        htmlDecode: unescapeHtml,
      }
      setOutput(actions[mode](input))
    } catch (e) {
      setOutput(`Error: ${e.message}`)
    }
  }

  return (
    <div className="max-w-4xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="h-44 w-full rounded-2xl border border-zinc-300 p-5 font-mono text-sm" placeholder="Text, URL component, or HTML entities" />
      <div className="grid gap-3 sm:grid-cols-4">
        <button onClick={() => run('urlEncode')} className="rounded-2xl bg-zinc-900 py-3 font-medium text-white">URL Encode</button>
        <button onClick={() => run('urlDecode')} className="rounded-2xl border border-zinc-300 py-3 font-medium">URL Decode</button>
        <button onClick={() => run('htmlEncode')} className="rounded-2xl border border-zinc-300 py-3 font-medium">HTML Encode</button>
        <button onClick={() => run('htmlDecode')} className="rounded-2xl border border-zinc-300 py-3 font-medium">HTML Decode</button>
      </div>
      <pre className="min-h-36 rounded-2xl border border-zinc-200 bg-white p-5 font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
    </div>
  )
}
