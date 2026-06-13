import { useMemo, useState } from 'react'

const words = (value) => value.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean)
const title = (value) => words(value).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')
const camel = (value) => words(value).map((word, index) => index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()).join('')
const pascal = (value) => words(value).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join('')
const kebab = (value) => words(value).map(word => word.toLowerCase()).join('-')
const snake = (value) => words(value).map(word => word.toLowerCase()).join('_')

export default function TextCaseTool() {
  const [input, setInput] = useState('Lyra Chef developer toolkit')
  const rows = useMemo(() => [
    ['Uppercase', input.toUpperCase()],
    ['Lowercase', input.toLowerCase()],
    ['Title Case', title(input)],
    ['camelCase', camel(input)],
    ['PascalCase', pascal(input)],
    ['kebab-case', kebab(input)],
    ['snake_case', snake(input)],
  ], [input])

  return (
    <div className="max-w-4xl space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="h-36 w-full rounded-2xl border border-zinc-300 p-5 text-sm" />
      <div className="grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="mb-2 text-xs font-medium uppercase text-zinc-500">{label}</div>
            <div className="font-mono text-sm break-all">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
