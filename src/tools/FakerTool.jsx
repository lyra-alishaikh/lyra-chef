import { useState } from 'react'

const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Jamie', 'Quinn', 'Avery', 'Reese', 'Cameron', 'Drew']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez']
const companies = ['Acme Corp', 'Stellar Labs', 'Nexus Dynamics', 'Vertex Systems', 'Pinnacle AI', 'Horizon Tech', 'Summit Ventures']
const streets = ['Maple', 'Oak', 'Pine', 'Cedar', 'Willow', 'Birch', 'Elm']
const cities = ['Seattle', 'Austin', 'Denver', 'Portland', 'Chicago', 'Boston', 'Miami']

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

export default function FakerTool() {
  const [results, setResults] = useState([])

  const generate = (type) => {
    let items = []
    for (let i = 0; i < 8; i++) {
      if (type === 'name') items.push(`${pick(firstNames)} ${pick(lastNames)}`)
      if (type === 'email') items.push(`${pick(firstNames).toLowerCase()}${rand(10,99)}@${pick(['gmail','outlook','proton','hey']).toLowerCase()}.com`)
      if (type === 'company') items.push(pick(companies))
      if (type === 'phone') items.push(`+1 (${rand(200,999)}) ${rand(100,999)}-${rand(1000,9999)}`)
      if (type === 'address') items.push(`${rand(100,9999)} ${pick(streets)} St, ${pick(cities)}, ${['CA','WA','TX','NY','CO'][rand(0,4)]} ${rand(10000,99999)}`)
      if (type === 'lorem') items.push(Array.from({length: 12}, () => pick(['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor'])).join(' ') + '.')
    }
    setResults(items)
  }

  const copyAll = () => navigator.clipboard.writeText(results.join('\n'))

  const types = [
    { key: 'name', label: 'Names' },
    { key: 'email', label: 'Emails' },
    { key: 'company', label: 'Companies' },
    { key: 'phone', label: 'Phones' },
    { key: 'address', label: 'Addresses' },
    { key: 'lorem', label: 'Lorem Paragraphs' },
  ]

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button key={t.key} onClick={() => generate(t.key)} className="px-5 py-2 bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl text-sm font-medium">{t.label}</button>
        ))}
      </div>

      {results.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-zinc-500">{results.length} results</div>
            <button onClick={copyAll} className="text-sm px-4 py-1.5 bg-zinc-900 text-white rounded-2xl">Copy all</button>
          </div>
          <div className="bg-white border rounded-3xl p-5 text-sm font-mono space-y-1.5 max-h-[420px] overflow-auto">
            {results.map((r, i) => <div key={i} className="py-0.5">{r}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}
