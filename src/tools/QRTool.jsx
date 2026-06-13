import { useState } from 'react'

export default function QRTool() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  const generate = () => {
    if (!text) return
    setQrUrl(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(text)}`)
  }

  return (
    <div className="max-w-md">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Text or URL" className="w-full border rounded-2xl px-5 py-3 mb-4" />
      <button onClick={generate} className="w-full py-3 bg-teal-600 text-white rounded-2xl">Generate QR Code</button>
      {qrUrl && <img src={qrUrl} className="mt-6 border border-zinc-200 rounded-2xl" />}
    </div>
  )
}