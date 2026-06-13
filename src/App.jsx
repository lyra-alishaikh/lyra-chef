import { useMemo, useState } from 'react'
import {
  BarChart3,
  Binary,
  Clock,
  Fingerprint,
  FileCode,
  Image,
  KeyRound,
  Link,
  Lock,
  Palette,
  QrCode,
  Search,
  Shield,
  Type,
} from 'lucide-react'

import JSONTool from './tools/JSONTool'
import Base64Tool from './tools/Base64Tool'
import HashTool from './tools/HashTool'
import AESTool from './tools/AESTool'
import PasswordTool from './tools/PasswordTool'
import TimestampTool from './tools/TimestampTool'
import ColorTool from './tools/ColorTool'
import QRCodeTool from './tools/QRCodeTool'
import IDGeneratorTool from './tools/IDGeneratorTool'
import TextCodecTool from './tools/TextCodecTool'
import URLBuilderTool from './tools/URLBuilderTool'
import TextCaseTool from './tools/TextCaseTool'
import Base64ImageTool from './tools/Base64ImageTool'
import WebAnalyzerTool from './tools/WebAnalyzerTool'
import ImageStudioTool from './tools/ImageStudioTool'

const tools = [
  { id: 'web-analyzer', name: 'Web Analyzer', description: 'Inspect URL structure and browser-visible security signals', icon: BarChart3, category: 'Digital Marketing', component: WebAnalyzerTool },
  { id: 'password', name: 'Password Generator', description: 'Generate secure random passwords', icon: KeyRound, category: 'Security', component: PasswordTool },
  { id: 'json', name: 'JSON Formatter', description: 'Format, validate, and minify JSON', icon: FileCode, category: 'Developer Tools', component: JSONTool },
  { id: 'base64', name: 'Base64 Tool', description: 'Encode and decode Base64 text', icon: Binary, category: 'Text Processing', component: Base64Tool },
  { id: 'qr', name: 'QR Code Generator', description: 'Generate downloadable QR codes', icon: QrCode, category: 'Developer Tools', component: QRCodeTool },
  { id: 'color', name: 'Color Picker', description: 'Pick colors and convert HEX, RGB, HSL', icon: Palette, category: 'Design Tools', component: ColorTool },
  { id: 'hash', name: 'Hash Generator', description: 'Generate MD5, SHA1, SHA256, and SHA512 hashes', icon: Shield, category: 'Developer Tools', component: HashTool },
  { id: 'timestamp', name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps and ISO dates', icon: Clock, category: 'Online Calculators', component: TimestampTool },
  { id: 'ids', name: 'UUID, GUID, ULID Generator', description: 'Generate UUID v4, GUID, and ULID values', icon: Fingerprint, category: 'Developer Tools', component: IDGeneratorTool },
  { id: 'codec', name: 'Text Encoder/Decoder', description: 'URL and HTML encode/decode text', icon: Type, category: 'URL Tools', component: TextCodecTool },
  { id: 'url-builder', name: 'URL Builder', description: 'Build URLs with encoded query parameters', icon: Link, category: 'URL Tools', component: URLBuilderTool },
  { id: 'text-case', name: 'Text Case Converter', description: 'Convert text to common naming cases', icon: Type, category: 'Text Processing', component: TextCaseTool },
  { id: 'base64-image', name: 'Base64 to Image', description: 'Convert images to Base64 data URLs', icon: Image, category: 'Media Tools', component: Base64ImageTool },
  { id: 'image-studio', name: 'Image Studio', description: 'Preview, filter, and export images in-browser', icon: Image, category: 'Media Tools', component: ImageStudioTool },
  { id: 'aes', name: 'AES Encrypt/Decrypt', description: 'Encrypt and decrypt text with AES-GCM', icon: Lock, category: 'Security', component: AESTool },
]

function App() {
  const [activeTool, setActiveTool] = useState('json')
  const [search, setSearch] = useState('')

  const filteredTools = useMemo(() => tools.filter(tool => {
    const haystack = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase()
    return haystack.includes(search.toLowerCase())
  }), [search])

  const groupedTools = useMemo(() => filteredTools.reduce((groups, tool) => {
    groups[tool.category] ||= []
    groups[tool.category].push(tool)
    return groups
  }, {}), [filteredTools])

  const currentTool = tools.find(t => t.id === activeTool) || tools[0]
  const ToolComponent = currentTool.component
  const CurrentIcon = currentTool.icon

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 lg:flex">
      <aside className="border-b border-zinc-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
        <div className="p-5 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900">
              <FileCode className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight">Lyra Chef</div>
              <div className="text-xs text-zinc-500">Client-side developer toolkit</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search tools" className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-zinc-400" value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
        </div>

        <nav className="max-h-[420px] overflow-auto px-3 pb-5 lg:max-h-[calc(100vh-160px)]">
          {Object.entries(groupedTools).map(([category, items]) => (
            <div key={category} className="mb-4">
              <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">{category}</div>
              {items.map(tool => {
                const Icon = tool.icon
                const isActive = activeTool === tool.id
                return (
                  <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${isActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                    <Icon className="h-4 w-4 flex-none" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{tool.name}</span>
                      <span className={`block truncate text-xs ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>{tool.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="border-b border-zinc-200 bg-white px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <CurrentIcon className="h-6 w-6" />
                <span>{currentTool.name}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-500">{currentTool.description}</div>
            </div>
            <div className="w-fit rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700">Runs in your browser</div>
          </div>
        </header>

        <section className="p-5 sm:p-8">
          <ToolComponent />
        </section>
      </main>
    </div>
  )
}

export default App
