import { useState } from 'react'
export default function LeetSpeakTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const leet = () => setOutput(input.replace(/a/gi,'4').replace(/e/gi,'3').replace(/i/gi,'1').replace(/o/gi,'0').replace(/s/gi,'5').replace(/t/gi,'7').replace(/l/gi,'1'))
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 border rounded-2xl p-5 mb-4" /><button onClick={leet} className="w-full py-3 bg-purple-600 text-white rounded-2xl">To Leetspeak</button>{output && <pre className="mt-4 p-5 bg-zinc-50 border rounded-2xl text-sm">{output}</pre>}</div>
}