import { useState } from 'react'

export default function Base64ImageTool() {
  const [dataUrl, setDataUrl] = useState('')

  const loadFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDataUrl(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-4xl space-y-4">
      <input type="file" accept="image/*" onChange={e => loadFile(e.target.files?.[0])} className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3" />
      {dataUrl && (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4">
            <img src={dataUrl} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
          </div>
          <textarea readOnly value={dataUrl} className="h-64 rounded-2xl border border-zinc-300 p-5 font-mono text-xs" />
        </div>
      )}
    </div>
  )
}
