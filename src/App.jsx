import { useState } from 'react'
import { FileCode, Key, Hash, Lock, User, Clock, Palette, ArrowRight } from 'lucide-react'

import JSONTool from './tools/JSONTool'
import Base64Tool from './tools/Base64Tool'
import HashTool from './tools/HashTool'
import AESTool from './tools/AESTool'
import PasswordTool from './tools/PasswordTool'
import TimestampTool from './tools/TimestampTool'
import ColorTool from './tools/ColorTool'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FileCode, category: 'Developer', desc: 'Format, validate & explore with collapsible tree' },
  { id: 'base64', name: 'Base64', icon: Key, category: 'Encoding', desc: 'Encode and decode Base64 strings' },
  { id: 'hash', name: 'Hash Generator', icon: Hash, category: 'Crypto', desc: 'MD5, SHA-256, SHA-512 and more' },
  { id: 'aes', name: 'AES Encrypt/Decrypt', icon: Lock, category: 'Security', desc: 'Client-side AES-256 encryption' },
  { id: 'password', name: 'Password Generator', icon: User, category: 'Security', desc: 'Strong, customizable passwords' },
  { id: 'timestamp', name: 'Timestamp Converter', icon: Clock, category: 'Utility', desc: 'Unix timestamp ↔ human readable' },
  { id: 'color', name: 'Color Converter', icon: Palette, category: 'Design', desc: 'HEX, RGB, HSL conversion' },
]

function App() {
  const [activeTool, setActiveTool] = useState(null)
  const [search, setSearch] = useState('')

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  const currentTool = tools.find(t => t.id === activeTool)
  const ToolComponent = currentTool?.component

  // Landing Page
  if (!activeTool) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="border-b bg-white">
          <div className="max-w-screen-2xl mx-auto px-8 pt-16 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                Professional • Private • Free
              </div>
              <h1 className="text-7xl font-semibold tracking-tighter text-zinc-900 leading-none">
                The toolkit<br />you actually want to use.
              </h1>
              <p className="mt-6 text-2xl text-zinc-600 max-w-md">
                Fast, beautiful tools that run entirely in your browser.
              </p>
              <div className="mt-8">
                <button 
                  onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-medium flex items-center gap-3"
                >
                  Browse tools <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 py-8 border-b text-center">
          <div className="grid grid-cols-3 gap-8">
            <div><div className="text-4xl font-semibold">18</div><div className="text-sm text-zinc-500">Tools</div></div>
            <div><div className="text-4xl font-semibold">100%</div><div className="text-sm text-zinc-500">Client-side</div></div>
            <div><div className="text-4xl font-semibold">v0.2.0</div><div className="text-sm text-zinc-500">Current version</div></div>
          </div>
        </div>

        <div id="tools" className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-semibold tracking-[2px] text-zinc-400">CATALOG</div>
              <div className="text-4xl font-semibold tracking-tight">All Tools</div>
            </div>
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="px-5 py-3 bg-white border border-zinc-200 rounded-2xl text-sm w-72 focus:outline-none focus:border-zinc-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map(tool => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="group bg-white border border-zinc-200 hover:border-zinc-300 rounded-3xl p-7 text-left transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full font-medium">
                      {tool.category}
                    </div>
                  </div>
                  <div className="mt-6 font-semibold text-xl tracking-tight">{tool.name}</div>
                  <div className="text-sm text-zinc-600 mt-2 leading-snug">{tool.desc}</div>
                  <div className="mt-6 text-sm text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
                    Open tool <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Tool View
  return (
    <div className="flex h-screen bg-zinc-50">
      <div className="w-72 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b">
          <button onClick={() => setActiveTool(null)} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center">
              <FileCode className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-2xl tracking-tight">Lyra Chef</div>
          </button>
        </div>

        <div className="p-4">
          <input type="text" placeholder="Search..." className="w-full px-4 py-2.5 bg-zinc-100 border border-transparent focus:border-zinc-300 rounded-2xl text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="flex-1 overflow-auto px-3 pb-6">
          {filteredTools.map(tool => {
            const Icon = tool.icon
            const isActive = activeTool === tool.id
            return (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 text-left ${isActive ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-700'}`}>
                <Icon className="w-4 h-4" />
                <div>
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-zinc-400">{tool.category}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b bg-white px-8 py-5 flex items-center justify-between">
          <div className="font-semibold text-2xl tracking-tight flex items-center gap-3">
            {currentTool && <currentTool.icon className="w-6 h-6" />}
            {currentTool?.name}
          </div>
          <button onClick={() => setActiveTool(null)} className="text-sm px-5 py-2.5 border rounded-2xl">Back to catalog</button>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {ToolComponent && <ToolComponent />}
        </div>
      </div>
    </div>
  )
}

export default App