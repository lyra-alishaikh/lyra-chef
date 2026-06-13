import { useState } from 'react'
import { FileCode, Key, Hash, Lock, User, Clock, Palette, FileText, Search, Quote, Calculator, Link, Shield, QrCode } from 'lucide-react'

import JSONTool from './tools/JSONTool'
import Base64Tool from './tools/Base64Tool'
import HashTool from './tools/HashTool'
import AESTool from './tools/AESTool'
import PasswordTool from './tools/PasswordTool'
import TimestampTool from './tools/TimestampTool'
import ColorTool from './tools/ColorTool'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FileCode, category: 'Developer', component: JSONTool },
  { id: 'base64', name: 'Base64 Encode/Decode', icon: Key, category: 'Encoding', component: Base64Tool },
  { id: 'hash', name: 'Hash Generator', icon: Hash, category: 'Crypto', component: HashTool },
  { id: 'aes', name: 'AES Encrypt/Decrypt', icon: Lock, category: 'Security', component: AESTool },
  { id: 'password', name: 'Password Generator', icon: User, category: 'Security', component: PasswordTool },
  { id: 'timestamp', name: 'Unix Timestamp Converter', icon: Clock, category: 'Utility', component: TimestampTool },
  { id: 'color', name: 'Color Converter', icon: Palette, category: 'Design', component: ColorTool },
]

function App() {
  const [activeTool, setActiveTool] = useState('json')
  const [search, setSearch] = useState('')

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) || tool.category.toLowerCase().includes(search.toLowerCase())
  )

  const currentTool = tools.find(t => t.id === activeTool)
  const ToolComponent = currentTool?.component

  return (
    <div className="flex h-screen bg-zinc-50">
      <div className="w-72 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center">
              <FileCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-tight">Lyra Chef</div>
              <div className="text-xs text-zinc-500 -mt-0.5">Professional Toolkit</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <input type="text" placeholder="Search tools..." className="w-full px-4 py-2.5 bg-zinc-100 border border-transparent focus:border-zinc-300 rounded-2xl text-sm outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex-1 overflow-auto px-3 pb-6">
          {filteredTools.map(tool => {
            const Icon = tool.icon
            const isActive = activeTool === tool.id
            return (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 text-left transition-all ${isActive ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-700'}`}>
                <Icon className="w-4 h-4" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{tool.name}</div>
                  <div className={`text-xs ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>{tool.category}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b bg-white px-8 py-5 flex items-center justify-between">
          <div>
            <div className="font-semibold text-2xl tracking-tight flex items-center gap-3">
              {currentTool && <currentTool.icon className="w-6 h-6" />}
              {currentTool?.name}
            </div>
            <div className="text-sm text-zinc-500">{currentTool?.category}</div>
          </div>
          <div className="text-xs px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">React • Client-side</div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {ToolComponent ? <ToolComponent /> : <div>Select a tool</div>}
        </div>
      </div>
    </div>
  )
}

export default App