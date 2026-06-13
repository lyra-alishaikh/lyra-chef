import { useMemo, useState } from 'react'

const words = value => value.match(/[A-Za-z0-9]+/g) || []
const title = value => words(value).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
const camel = value => words(value).map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
const pascal = value => words(value).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')

export default function TextCaseTool() {
  const [input, setInput] = useState('Lyra Chef developer toolkit')

  const outputs = useMemo(() => [
    ['UPPERCASE', input.toUpperCase()],
    ['lowercase', input.toLowerCase()],
    ['Title Case', title(input)],
    ['camelCase', camel(input)],
    ['PascalCase', pascal(input)],
    ['kebab-case', words(input).map(word => word.toLowerCase()).join('-')],
    ['snake_case', words(input).map(word => word.toLowerCase()).join('_')],
  ], [input])

  return (
    <div className="max-w-4xl space-y-5">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-32 border rounded-2xl p-5 font-mono text-sm" />
      <div className="grid gap-3">
        {outputs.map(([label, value]) => (
          <div key={label} className="border rounded-2xl bg-white p-4">
            <div className="text-xs font-semibold text-zinc-500 mb-2">{label}</div>
            <div className="font-mono text-sm break-all">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
