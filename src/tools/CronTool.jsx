import { useState } from 'react'

const examples = [
  '0 9 * * *',
  '*/15 * * * *',
  '0 0 * * 0',
  '0 2 * * 1-5',
]

export default function CronTool() {
  const [expr, setExpr] = useState('0 9 * * *')
  const [explanation, setExplanation] = useState('')

  const explain = () => {
    const parts = expr.trim().split(/\s+/)
    if (parts.length < 5) {
      setExplanation('Invalid cron (needs at least 5 fields)')
      return
    }
    const [min, hour, dom, mon, dow] = parts

    const desc = []
    desc.push(`Minute: ${min === '*' ? 'every minute' : min}`)
    desc.push(`Hour: ${hour === '*' ? 'every hour' : hour}`)
    desc.push(`Day of month: ${dom === '*' ? 'every day' : dom}`)
    desc.push(`Month: ${mon === '*' ? 'every month' : mon}`)
    desc.push(`Day of week: ${dow === '*' ? 'every day' : dow}`)

    setExplanation(desc.join('\n'))
  }

  return (
    <div className="max-w-xl space-y-5">
      <div>
        <input value={expr} onChange={e=>setExpr(e.target.value)} className="w-full font-mono text-lg border rounded-2xl px-5 py-3" placeholder="0 9 * * *" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {examples.map(ex => (
          <button key={ex} onClick={() => {setExpr(ex); setTimeout(explain, 10)}} className="px-3 py-1 text-xs bg-zinc-100 rounded-xl hover:bg-zinc-200">{ex}</button>
        ))}
      </div>
      <button onClick={explain} className="w-full py-3 bg-zinc-900 text-white rounded-2xl">Explain</button>

      {explanation && (
        <pre className="bg-zinc-950 text-emerald-300 p-5 rounded-3xl text-sm whitespace-pre-wrap font-mono">{explanation}</pre>
      )}
      <div className="text-xs text-zinc-500">Note: This is a basic explainer. Full cron support (step values, names, etc.) not implemented.</div>
    </div>
  )
}
