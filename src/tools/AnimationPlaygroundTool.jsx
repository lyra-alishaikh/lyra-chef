import { useState } from 'react'

export default function AnimationPlaygroundTool() {
  const [duration, setDuration] = useState(600)
  const [easing, setEasing] = useState('ease-out')
  const [translate, setTranslate] = useState(80)
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [play, setPlay] = useState(false)

  const animStyle = play ? {
    transition: `all ${duration}ms ${easing}`,
    transform: `translateX(${translate}px) scale(${scale}) rotate(${rotate}deg)`,
    opacity,
  } : {}

  const css = `transition: all ${duration}ms ${easing};\ntransform: translateX(${translate}px) scale(${scale}) rotate(${rotate}deg);\nopacity: ${opacity};`

  const reset = () => {
    setPlay(false)
    setTranslate(80); setScale(1); setRotate(0); setOpacity(1)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Duration</span><span className="font-mono">{duration}ms</span></div>
          <input type="range" min="100" max="2000" step="50" value={duration} onChange={e => setDuration(+e.target.value)} className="w-full slider" />
        </div>

        <div>
          <div className="text-sm mb-2">Easing</div>
          <div className="flex flex-wrap gap-2">
            {['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.23,1,0.32,1)'].map(e => (
              <button key={e} onClick={() => setEasing(e)} className={`px-4 py-1.5 text-sm rounded-2xl ${easing === e ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>{e}</button>
            ))}
          </div>
        </div>

        {[
          { label: 'Translate X', val: translate, set: setTranslate, min: -120, max: 200 },
          { label: 'Scale', val: scale, set: setScale, min: 0.4, max: 1.6, step: 0.05 },
          { label: 'Rotate', val: rotate, set: setRotate, min: -45, max: 180 },
          { label: 'Opacity', val: opacity, set: setOpacity, min: 0.1, max: 1, step: 0.05 },
        ].map((p, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1"><span>{p.label}</span><span className="font-mono">{typeof p.val === 'number' && p.val.toFixed ? p.val.toFixed(2) : p.val}</span></div>
            <input type="range" min={p.min} max={p.max} step={p.step || 1} value={p.val} onChange={e => p.set(+e.target.value)} className="w-full slider" />
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button onClick={() => setPlay(!play)} className="btn-primary flex-1">{play ? 'Pause' : 'Play Animation'}</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>
        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-secondary w-full">Copy CSS</button>
      </div>

      <div>
        <div className="text-sm mb-3 text-slate-500">Live preview</div>
        <div className="preview-box h-80 relative">
          <div 
            className="w-20 h-20 bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl shadow-xl flex items-center justify-center text-white text-sm font-medium"
            style={animStyle}
          >
            Element
          </div>
        </div>
        <div className="mt-4 font-mono text-xs bg-cosmic-950 text-emerald-300 p-4 rounded-2xl whitespace-pre overflow-auto">{css}</div>
      </div>
    </div>
  )
}
