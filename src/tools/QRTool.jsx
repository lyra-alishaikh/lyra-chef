import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QRTool() {
  const [input, setInput] = useState('https://heylyra.pk')
  const [size, setSize] = useState(320)
  const [dataUrl, setDataUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    QRCode.toDataURL(input || ' ', {
      width: size,
      margin: 2,
      color: { dark: '#18181b', light: '#ffffff' },
    })
      .then(url => {
        if (!cancelled) {
          setDataUrl(url)
          setError('')
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [input, size])

  return (
    <div className="max-w-4xl grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Text or URL</span>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="mt-2 w-full h-40 border rounded-2xl p-5 font-mono text-sm" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Size</span>
          <input type="range" min="160" max="640" step="16" value={size} onChange={e => setSize(Number(e.target.value))} className="mt-3 w-full" />
          <div className="text-sm text-zinc-500">{size}px</div>
        </label>
      </div>
      <div className="rounded-2xl border bg-white p-6 flex flex-col items-center gap-4">
        {dataUrl && <img src={dataUrl} alt="Generated QR code" className="w-full max-w-80 aspect-square" />}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {dataUrl && <a href={dataUrl} download="lyra-chef-qr.png" className="px-5 py-2.5 bg-zinc-900 text-white rounded-2xl text-sm">Download PNG</a>}
      </div>
    </div>
  )
}
