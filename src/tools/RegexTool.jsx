import { useState } from 'react'

export default function RegexTool() {
  const [pattern, setPattern] = useState('')
  const [input, setInput] = useState('')
  const [matches, setMatches] = useState([])

  const test = () => {
    if (!pattern || !input) return
    try {
      const regex = new RegExp(pattern, 'g')
      const found = input.match(regex) || []
      setMatches(found)
    } catch {
      setMatches(['Invalid regex'])
    }
  }

  return (
    <div className="max-w-2xl">
      <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Regex pattern" className="w-full border rounded-2xl px-5 py-3 mb-4 font-mono" />
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Test string" className="w-full h-40 border rounded-2xl p-5 font-mono mb-4" />
      <button onClick={test} className="px-8 py-3 bg-purple-600 text-white rounded-2xl">Test Regex</button>
      {matches.length > 0 && <div className="mt-4 p-5 bg-zinc-50 border rounded-2xl font-mono text-sm">{matches.join('\n')}</div>}
    </div>
  )
}