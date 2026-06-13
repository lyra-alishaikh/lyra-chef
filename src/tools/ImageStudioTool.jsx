import { useRef, useState } from 'react'

export default function ImageStudioTool() {
  const canvasRef = useRef(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [format, setFormat] = useState('image/png')
  const [width, setWidth] = useState(800)

  const process = file => {
    if (!file) return
    const image = new Image()
    image.onload = () => {
      const scale = width / image.width
      const canvas = canvasRef.current
      canvas.width = width
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      setDownloadUrl(canvas.toDataURL(format, 0.88))
      URL.revokeObjectURL(image.src)
    }
    image.src = URL.createObjectURL(file)
  }

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex flex-wrap gap-3 items-end">
        <label className="block">
          <span className="text-sm font-medium">Image</span>
          <input type="file" accept="image/*" onChange={e => process(e.target.files?.[0])} className="mt-2 block text-sm" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Width</span>
          <input type="number" min="16" max="4096" value={width} onChange={e => setWidth(Math.max(16, Number(e.target.value) || 16))} className="mt-2 w-32 border rounded-2xl px-4 py-3" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Format</span>
          <select value={format} onChange={e => setFormat(e.target.value)} className="mt-2 border rounded-2xl px-4 py-3 bg-white">
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
          </select>
        </label>
        {downloadUrl && <a href={downloadUrl} download="lyra-chef-image" className="px-5 py-3 bg-zinc-900 text-white rounded-2xl text-sm">Download</a>}
      </div>
      <div className="border rounded-2xl bg-white p-5 overflow-auto">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  )
}
