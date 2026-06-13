import { useState } from 'react'
export default function Base64ImageTool() {
  const [input, setInput] = useState('')
  const [img, setImg] = useState('')
  const toDataUrl = () => setImg(input)
  return <div><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Paste base64 image string (data:image/...)" className="w-full h-32 border rounded-2xl p-5 mb-4 font-mono text-sm" /><button onClick={toDataUrl} className="w-full py-3 bg-pink-600 text-white rounded-2xl">Preview Image</button>{img && <img src={img} className="mt-4 max-w-full border rounded-2xl" alt="preview" />}</div>
}