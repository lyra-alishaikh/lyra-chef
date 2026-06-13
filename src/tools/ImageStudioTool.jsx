import { useRef, useState } from 'react'

export default function ImageStudioTool() {
  const canvasRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [info, setInfo] = useState('')

  const loadFile = (file) => {
    if (!file) return
    setFileName(file.name)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const scale = Math.min(1, 900 / img.width)
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      setInfo(`${img.width} x ${img.height}px - ${Math.round(file.size / 1024)} KB`)
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  }

  const applyFilter = (filter) => {
    const canvas = canvasRef.current
    if (!canvas.width) return
    const ctx = canvas.getContext('2d')
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = image.data
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (filter === 'grayscale') data[i] = data[i + 1] = data[i + 2] = avg
      if (filter === 'invert') {
        data[i] = 255 - data[i]
        data[i + 1] = 255 - data[i + 1]
        data[i + 2] = 255 - data[i + 2]
      }
    }
    ctx.putImageData(image, 0, 0)
  }

  const download = (type = 'image/png') => {
    const canvas = canvasRef.current
    if (!canvas.width) return
    const link = document.createElement('a')
    link.download = (fileName || 'image').replace(/\.[^.]+$/, '') + (type === 'image/jpeg' ? '.jpg' : '.png')
    link.href = canvas.toDataURL(type, 0.9)
    link.click()
  }

  return (
    <div className="max-w-5xl space-y-4">
      <input type="file" accept="image/*" onChange={e => loadFile(e.target.files?.[0])} className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3" />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => applyFilter('grayscale')} className="rounded-2xl border border-zinc-300 px-5 py-3 font-medium">Grayscale</button>
        <button onClick={() => applyFilter('invert')} className="rounded-2xl border border-zinc-300 px-5 py-3 font-medium">Invert</button>
        <button onClick={() => download('image/png')} className="rounded-2xl bg-zinc-900 px-5 py-3 font-medium text-white">Download PNG</button>
        <button onClick={() => download('image/jpeg')} className="rounded-2xl border border-zinc-300 px-5 py-3 font-medium">Download JPG</button>
      </div>
      {info && <div className="text-sm text-zinc-500">{info}</div>}
      <div className="overflow-auto rounded-3xl border border-zinc-200 bg-white p-4">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  )
}
