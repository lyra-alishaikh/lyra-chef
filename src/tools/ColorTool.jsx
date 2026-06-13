import { useState } from 'react'

function hexToRgb(hex) {
  const clean = hex.replace('#', '').padEnd(6, '0').slice(0, 6)
  return {
    r: parseInt(clean.slice(0, 2), 16) || 0,
    g: parseInt(clean.slice(2, 4), 16) || 0,
    b: parseInt(clean.slice(4, 6), 16) || 0,
  }
}

function rgbToHsl({ r, g, b }) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorTool() {
  const [hex, setHex] = useState('#6366f1')
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb)
  const swatches = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#a855f7', '#111827', '#f8fafc']

  return (
    <div className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="h-32 w-full rounded-2xl border border-zinc-300 bg-white p-2" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Value label="HEX" value={hex.toUpperCase()} />
          <Value label="RGB" value={`${rgb.r}, ${rgb.g}, ${rgb.b}`} />
          <Value label="HSL" value={`${hsl.h}, ${hsl.s}%, ${hsl.l}%`} />
        </div>
      </div>
      <input value={hex} onChange={e => setHex(e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)} className="w-full border border-zinc-300 rounded-2xl px-5 py-3 font-mono" />
      <div className="flex flex-wrap gap-2">
        {swatches.map(color => (
          <button key={color} onClick={() => setHex(color)} className="h-10 w-10 rounded-xl border border-zinc-300" style={{ backgroundColor: color }} aria-label={color} />
        ))}
      </div>
    </div>
  )
}

function Value({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="text-xs font-medium uppercase text-zinc-500">{label}</div>
      <div className="mt-2 font-mono text-sm break-all">{value}</div>
    </div>
  )
}
