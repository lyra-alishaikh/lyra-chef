import { useState } from 'react'
export default function MorseCodeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const morse = { a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.' }
  const rev = Object.fromEntries(Object.entries(morse).map(([k,v]) => [v,k]))
  const toMorse = () => setOutput(input.toLowerCase().split('').map(c => morse[c] || c).join(' '))
  const fromMorse = () => setOutput(input.split(' ').map(c => rev[c] || c).join(''))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><div className="flex gap-3"><button onClick={toMorse} className="flex-1 py-3 bg-amber-600 text-white rounded-2xl">Text → Morse</button><button onClick={fromMorse} className="flex-1 py-3 border rounded-2xl">Morse → Text</button></div>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}