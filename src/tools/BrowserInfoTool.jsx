import { useEffect, useState } from 'react'

export default function BrowserInfoTool() {
  const [info, setInfo] = useState({})

  useEffect(() => {
    const nav = window.navigator
    setInfo({
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      cookies: nav.cookieEnabled ? 'Enabled' : 'Disabled',
      online: nav.onLine ? 'Online' : 'Offline',
      screen: `${window.screen.width}×${window.screen.height}`,
      viewport: `${window.innerWidth}×${window.innerHeight}`,
      memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : 'N/A',
      cores: nav.hardwareConcurrency || 'N/A',
      darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
    })
  }, [])

  const copyAll = () => {
    const text = Object.entries(info).map(([k,v]) => `${k}: ${v}`).join('\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(info).map(([key, value]) => (
          <div key={key} className="bg-white border rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400">{key}</div>
            <div className="font-mono text-sm mt-1 break-all">{value}</div>
          </div>
        ))}
      </div>
      <button onClick={copyAll} className="mt-5 w-full py-3 bg-zinc-900 text-white rounded-2xl">Copy all info</button>
    </div>
  )
}
