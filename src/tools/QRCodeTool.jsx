import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

export default function QRCodeTool() {
  const [text, setText] = useState('https://lyra-alishaikh.github.io/lyra-chef/')
  const [error, setError] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function render() {
      setError('')
      try {
        await QRCode.toCanvas(canvasRef.current, text || ' ', { width: 280, margin: 2, color: { dark: '#18181b', light: '#ffffff' } })
      } catch (e) {
        if (!cancelled) setError(e.message)
      }
    }
    render()
    return () => {
      cancelled = true
    }
  }, [text])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <textarea value={text} onChange={e => setText(e.target.value)} className="h-48 w-full rounded-2xl border border-zinc-300 p-5 font-mono text-sm" placeholder="Text or URL" />
        <button onClick={download} className="rounded-2xl bg-zinc-900 px-6 py-3 font-medium text-white">Download PNG</button>
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      </div>
      <div className="flex items-center justify-center rounded-3xl border border-zinc-200 bg-white p-6">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  )
}
