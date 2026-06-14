import { useState } from 'react'

const easings = {
  'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}

export default function EasingVisualizerTool() {
  const [selected, setSelected] = useState('ease-out')
  const [duration, setDuration] = useState(800)

  const bezier = easings[selected]

  const style = {
    transition: `transform ${duration}ms ${bezier}`,
    transform: 'translateX(0)',
  }

  return (
    <div className="max-w-4xl">
      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.keys(easings).map(name => (
          <button key={name} onClick={() => setSelected(name)} className={`px-5 py-2 rounded-2xl text-sm font-medium ${selected === name ? 'bg-brand-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-500 mb-1">Duration: {duration}ms</div>
        <input type="range" min="200" max="1600" step="50" value={duration} onChange={e => setDuration(+e.target.value)} className="w-full slider" />
      </div>

      <div className="preview-box h-40 mb-4 overflow-hidden relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-600 rounded-2xl" style={style} />
        <button onClick={() => {
          const el = document.querySelector('.preview-box > div')
          if (el) {
            el.style.transition = 'none'
            el.style.transform = 'translateX(0)'
            void el.offsetWidth
            el.style.transition = `transform ${duration}ms ${bezier}`
            el.style.transform = 'translateX(420px)'
            setTimeout(() => { if (el) el.style.transform = 'translateX(0)' }, duration + 80)
          }
        }} className="absolute bottom-4 right-4 btn-secondary text-xs">Replay</button>
      </div>

      <div className="font-mono text-xs bg-cosmic-950 text-emerald-300 p-4 rounded-2xl">
        transition: transform {duration}ms {bezier};
      </div>
    </div>
  )
}
