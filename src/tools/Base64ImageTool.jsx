import { useMemo, useState } from 'react'

export default function Base64ImageTool() {
  const [data, setData] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const preview = useMemo(() => {
    if (!data.trim()) return ''
    if (data.startsWith('data:image/')) return data.trim()
    return `data:image/png;base64,${data.trim()}`
  }, [data])

  const handleFile = file => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageUrl(String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-5xl grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Image to Base64</span>
          <input type="file" accept="image/*" onChange={e => handleFile(e.target.files?.[0])} className="mt-2 block w-full text-sm" />
        </label>
        <textarea readOnly value={imageUrl} className="w-full h-48 border rounded-2xl p-5 font-mono text-xs bg-white" placeholder="File data URL appears here" />
        <label className="block">
          <span className="text-sm font-medium">Base64 to Image</span>
          <textarea value={data} onChange={e => setData(e.target.value)} className="mt-2 w-full h-48 border rounded-2xl p-5 font-mono text-xs" placeholder="Paste Base64 or a data:image URL" />
        </label>
      </div>
      <div className="border rounded-2xl bg-white p-5 min-h-96 flex items-center justify-center">
        {preview ? <img src={preview} alt="Base64 preview" className="max-w-full max-h-[28rem] object-contain" /> : <div className="text-zinc-400">Image preview</div>}
      </div>
    </div>
  )
}
