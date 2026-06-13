import { useState } from 'react'

export default function JSONTool() {
  const [input, setInput] = useState('{\n  "project": "Lyra Chef",\n  "version": 0.6\n}')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('tree')

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      if (mode === 'tree') {
        setOutput(JSON.stringify(parsed, null, 2))
      } else {
        setOutput(JSON.stringify(parsed))
      }
    } catch (e) {
      setOutput('Invalid JSON: ' + e.message)
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <div className="font-medium">Input</div>
            <button onClick={format} className="px-4 py-1.5 bg-violet-600 text-white rounded-xl text-sm">Format</button>
          </div>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 border border-zinc-300 rounded-2xl p-5 font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <div className="font-medium">Output</div>
            <div className="flex gap-2">
              <button onClick={() => setMode('tree')} className={`px-4 py-1.5 rounded-xl text-sm ${mode === 'tree' ? 'bg-zinc-900 text-white' : 'border'}`}>Tree</button>
              <button onClick={() => setMode('minify')} className={`px-4 py-1.5 rounded-xl text-sm ${mode === 'minify' ? 'bg-zinc-900 text-white' : 'border'}`}>Minify</button>
            </div>
          </div>
          <pre className="w-full h-96 border border-zinc-300 rounded-2xl p-5 font-mono text-sm overflow-auto bg-white">{output}</pre>
        </div>
      </div>
    </div>
  )
}