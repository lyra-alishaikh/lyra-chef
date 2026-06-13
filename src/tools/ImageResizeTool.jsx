import { useState } from 'react'

export default function ImageResizeTool() {
  const [img, setImg] = useState(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintain, setMaintain] = useState(true)
  const [original, setOriginal] = useState({ w: 0, h: 0 })

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const image = new Image()
      image.onload = () => {
        setOriginal({ w: image.width, h: image.height })
        setWidth(image.width)
        setHeight(image.height)
        setImg(ev.target.result)
      }
      image.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const resize = () => {
    if (!img) return
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height)
      const link = document.createElement('a')
      link.download = `resized-${width}x${height}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    image.src = img
  }

  const updateW = (w) => {
    setWidth(w)
    if (maintain && original.w) setHeight(Math.round(w * (original.h / original.w)))
  }
  const updateH = (h) => {
    setHeight(h)
    if (maintain && original.h) setWidth(Math.round(h * (original.w / original.h)))
  }

  return (
    <div className="max-w-2xl space-y-5">
      {!img ? (
        <label className="block border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer hover:border-zinc-400">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <div className="text-4xl mb-3">📷</div>
          <div className="font-medium">Drop or click to upload image</div>
          <div className="text-sm text-zinc-500 mt-1">PNG, JPG, WebP supported</div>
        </label>
      ) : (
        <>
          <div className="flex gap-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Width</div>
              <input type="number" value={width} onChange={e=>updateW(+e.target.value)} className="w-28 border rounded-2xl px-3 py-2 text-sm" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Height</div>
              <input type="number" value={height} onChange={e=>updateH(+e.target.value)} className="w-28 border rounded-2xl px-3 py-2 text-sm" />
            </div>
            <label className="flex items-center gap-2 text-sm mt-6">
              <input type="checkbox" checked={maintain} onChange={e=>setMaintain(e.target.checked)} /> Maintain ratio
            </label>
          </div>

          <div className="bg-zinc-100 rounded-3xl p-4">
            <img src={img} className="max-h-80 mx-auto rounded-2xl" alt="preview" />
          </div>

          <div className="flex gap-3">
            <button onClick={resize} className="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl font-medium">Download resized PNG</button>
            <button onClick={() => {setImg(null); setOriginal({w:0,h:0})}} className="px-8 py-3.5 border rounded-2xl">New image</button>
          </div>
          <div className="text-xs text-center text-zinc-500">Original: {original.w}×{original.h}px → {width}×{height}px</div>
        </>
      )}
    </div>
  )
}
