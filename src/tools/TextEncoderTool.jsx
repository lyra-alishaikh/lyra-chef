import { useMemo, useState } from 'react'

function encodeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function decodeHtml(value) {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

export default function TextEncoderTool() {
  const [input, setInput] = useState('Lyra Chef: tools & utilities')
  const [mode, setMode] = useState('url-encode')

  const output = useMemo(() => {
    try {
      if (mode === 'url-encode') return encodeURIComponent(input)
      if (mode === 'url-decode') return decodeURIComponent(input)
      if (mode === 'html-encode') return encodeHtml(input)
      return decodeHtml(input)
    } catch (error) {
      return error.message
    }
  }, [input, mode])

  return (
    <div className="max-w-5xl grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <select value={mode} onChange={e => setMode(e.target.value)} className="border rounded-2xl px-4 py-3 bg-white">
          <option value="url-encode">URL encode</option>
          <option value="url-decode">URL decode</option>
          <option value="html-encode">HTML entity encode</option>
          <option value="html-decode">HTML entity decode</option>
        </select>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-96 border rounded-2xl p-5 font-mono text-sm" />
      </div>
      <pre className="w-full h-96 border rounded-2xl p-5 font-mono text-sm bg-white whitespace-pre-wrap break-words">{output}</pre>
    </div>
  )
}
