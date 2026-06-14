import { useState } from 'react'

const fontOptions = [
  { name: 'Inter', stack: 'Inter, system-ui, sans-serif' },
  { name: 'Space Grotesk', stack: '"Space Grotesk", system-ui, sans-serif' },
  { name: 'Georgia', stack: 'Georgia, serif' },
  { name: 'IBM Plex Sans', stack: '"IBM Plex Sans", system-ui, sans-serif' },
  { name: 'Playfair Display', stack: '"Playfair Display", Georgia, serif' },
  { name: 'JetBrains Mono', stack: '"JetBrains Mono", monospace' },
]

export default function FontPairTool() {
  const [heading, setHeading] = useState(0)
  const [body, setBody] = useState(1)
  const [scale, setScale] = useState(1.1)

  const hFont = fontOptions[heading]
  const bFont = fontOptions[body]

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-1.5">Heading font</div>
          <select value={heading} onChange={e => setHeading(+e.target.value)} className="input w-full">
            {fontOptions.map((f, i) => <option key={i} value={i}>{f.name}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm text-slate-500 mb-1.5">Body font</div>
          <select value={body} onChange={e => setBody(+e.target.value)} className="input w-full">
            {fontOptions.map((f, i) => <option key={i} value={i}>{f.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <div className="text-sm text-slate-500 mb-1.5">Scale</div>
        <input type="range" min="1" max="1.4" step="0.02" value={scale} onChange={e => setScale(+e.target.value)} className="w-full slider mb-2" />
      </div>

      <div className="border border-slate-200 rounded-3xl p-10 bg-white">
        <div style={{ fontFamily: hFont.stack, fontSize: 52 * scale }} className="font-semibold tracking-[-1.5px] leading-none text-slate-900 mb-6">
          The quick brown fox
        </div>
        <div style={{ fontFamily: bFont.stack, fontSize: 18 * scale, lineHeight: 1.6 }} className="text-slate-600 max-w-prose">
          This is body text in the chosen pairing. Good typography creates calm and hierarchy. 
          The heading font should feel distinct but harmonious with the body.
        </div>
        <div className="mt-8 pt-6 border-t text-xs text-slate-400 font-mono flex gap-6">
          <div>Heading: {hFont.name}</div>
          <div>Body: {bFont.name}</div>
          <div>Scale: {scale.toFixed(2)}</div>
        </div>
      </div>

      <button onClick={() => {
        const css = `h1, h2, h3 { font-family: ${hFont.stack}; }\nbody { font-family: ${bFont.stack}; }`
        navigator.clipboard.writeText(css)
      }} className="btn-primary mt-6 w-full">Copy font pairing CSS</button>
    </div>
  )
}
