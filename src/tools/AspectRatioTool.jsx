import { useState } from 'react'

const ratios = [
  { label: '1:1 Square', value: '1 / 1' },
  { label: '16:9 Video', value: '16 / 9' },
  { label: '4:3 Classic', value: '4 / 3' },
  { label: '3:2 Photo', value: '3 / 2' },
  { label: '2:3 Portrait', value: '2 / 3' },
  { label: '9:16 Story', value: '9 / 16' },
  { label: '21:9 Cinema', value: '21 / 9' },
]

export default function AspectRatioTool() {
  const [ratio, setRatio] = useState('16 / 9')
  const [width, setWidth] = useState(480)
  const [showContent, setShowContent] = useState(true)

  const height = Math.round(width / (eval(ratio.replace(' / ', '/')) || 1))

  return (
    <div>
      <div className="flex gap-3 flex-wrap mb-6">
        {ratios.map(r => (
          <button key={r.value} onClick={() => setRatio(r.value)} className={`px-4 py-2 rounded-2xl text-sm ${ratio === r.value ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6 items-end mb-4">
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-1">Container width: {width}px</div>
          <input type="range" min="200" max="720" value={width} onChange={e => setWidth(+e.target.value)} className="w-full slider" />
        </div>
        <div className="font-mono text-sm text-slate-400">{width} × {height}</div>
      </div>

      <div className="preview-box" style={{ width: width, aspectRatio: ratio, maxWidth: '100%' }}>
        {showContent && (
          <div className="p-4 text-center text-sm text-slate-500">
            Content area<br />
            <span className="text-xs opacity-60">{ratio}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={() => navigator.clipboard.writeText(`aspect-ratio: ${ratio};`)} className="btn-primary flex-1">Copy aspect-ratio</button>
        <button onClick={() => setShowContent(!showContent)} className="btn-secondary">Toggle content</button>
      </div>
    </div>
  )
}
