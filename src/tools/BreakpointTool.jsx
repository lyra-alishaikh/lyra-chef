import { useState } from 'react'

const breakpoints = [
  { name: 'Mobile', width: 375, label: 'sm' },
  { name: 'Tablet', width: 640, label: 'md' },
  { name: 'Laptop', width: 1024, label: 'lg' },
  { name: 'Desktop', width: 1280, label: 'xl' },
]

export default function BreakpointTool() {
  const [active, setActive] = useState(1)
  const bp = breakpoints[active]

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {breakpoints.map((b, i) => (
          <button key={i} onClick={() => setActive(i)} className={`flex-1 py-3 rounded-2xl text-sm font-medium ${active === i ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>
            {b.name} <span className="font-mono text-xs opacity-70">({b.width}px)</span>
          </button>
        ))}
      </div>

      <div className="border border-slate-200 rounded-3xl p-6 bg-white overflow-auto" style={{ maxWidth: bp.width, margin: '0 auto' }}>
        <div className="text-xs text-slate-400 mb-3 font-mono tracking-widest">{bp.label.toUpperCase()} — {bp.width}px</div>
        
        <div className="space-y-4">
          <div className="h-10 bg-slate-900 rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-24 bg-slate-100 rounded-2xl" />
            <div className="h-24 bg-slate-100 rounded-2xl" />
          </div>
          <div className="h-6 bg-slate-200 rounded" />
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-4">Resize the container to test your own breakpoints. This simulates common device widths.</div>
    </div>
  )
}
