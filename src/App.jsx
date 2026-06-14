import { useState } from 'react'
import { FileCode, Key, Hash, Lock, User, Clock, Palette, Search, ArrowRight, Fingerprint, QrCode, Type, Link, Calculator, Quote, Binary, Shield } from 'lucide-react'

import JSONTool from './tools/JSONTool'
import Base64Tool from './tools/Base64Tool'
import HashTool from './tools/HashTool'
import AESTool from './tools/AESTool'
import PasswordTool from './tools/PasswordTool'
import TimestampTool from './tools/TimestampTool'
import ColorTool from './tools/ColorTool'
import UUIDTool from './tools/UUIDTool'
import QRCodeTool from './tools/QRCodeTool'
import RegexTool from './tools/RegexTool'
import TrimTool from './tools/TrimTool'
import ReverseTool from './tools/ReverseTool'
import SortLinesTool from './tools/SortLinesTool'
import EmailValidatorTool from './tools/EmailValidatorTool'
import IPValidatorTool from './tools/IPValidatorTool'
import URLBuilderTool from './tools/URLBuilderTool'
import Base32Tool from './tools/Base32Tool'
import HMACTool from './tools/HMACTool'
import JWTTool from './tools/JWTTool'
import MarkdownTool from './tools/MarkdownTool'
import CaseTool from './tools/CaseTool'
import LoremTool from './tools/LoremTool'
import NumberBaseTool from './tools/NumberBaseTool'
import HTMLEncodeTool from './tools/HTMLEncodeTool'
import SemverTool from './tools/SemverTool'
import CSVJSONTool from './tools/CSVJSONTool'
import SlugifyTool from './tools/SlugifyTool'
import WordCountTool from './tools/WordCountTool'
import DuplicateTool from './tools/DuplicateTool'
import RandomTool from './tools/RandomTool'
import ROT13Tool from './tools/ROT13Tool'
import DiceRollerTool from './tools/DiceRollerTool'
import QueryStringTool from './tools/QueryStringTool'
import DiffTool from './tools/DiffTool'
import PasswordStrengthTool from './tools/PasswordStrengthTool'
import MorseCodeTool from './tools/MorseCodeTool'
import BinaryTextTool from './tools/BinaryTextTool'
import RelativeTimeTool from './tools/RelativeTimeTool'
import PhoneValidatorTool from './tools/PhoneValidatorTool'
import EscapeTool from './tools/EscapeTool'
import RemoveSpacesTool from './tools/RemoveSpacesTool'
import CapitalizeTool from './tools/CapitalizeTool'
import RandomColorTool from './tools/RandomColorTool'
import BytesTool from './tools/BytesTool'
import UnitConverterTool from './tools/UnitConverterTool'
import StripHTMLTool from './tools/StripHTMLTool'
import FindReplaceTool from './tools/FindReplaceTool'
import LeetSpeakTool from './tools/LeetSpeakTool'
import RemoveAccentsTool from './tools/RemoveAccentsTool'
import SimpleCalcTool from './tools/SimpleCalcTool'
import CreditCardValidatorTool from './tools/CreditCardValidatorTool'
import ISBNValidatorTool from './tools/ISBNValidatorTool'
import DateFormatterTool from './tools/DateFormatterTool'
import ListToCSVTool from './tools/ListToCSVTool'
import PalindromeTool from './tools/PalindromeTool'
import AnagramTool from './tools/AnagramTool'
import Base64ImageTool from './tools/Base64ImageTool'
import HashCompareTool from './tools/HashCompareTool'
import LineNumberTool from './tools/LineNumberTool'
import CSVToMarkdownTool from './tools/CSVToMarkdownTool'
import JSONToYAMLTool from './tools/JSONToYAMLTool'
import PasswordEntropyTool from './tools/PasswordEntropyTool'
import ContrastCheckerTool from './tools/ContrastCheckerTool'
import URLValidatorTool from './tools/URLValidatorTool'
import GradientTool from './tools/GradientTool'
import BoxShadowTool from './tools/BoxShadowTool'
import FakerTool from './tools/FakerTool'
import StopwatchTool from './tools/StopwatchTool'
import CurlTool from './tools/CurlTool'
import MarkdownTableTool from './tools/MarkdownTableTool'
import FlexboxTool from './tools/FlexboxTool'
import BorderRadiusTool from './tools/BorderRadiusTool'
import ImageResizeTool from './tools/ImageResizeTool'
import BrowserInfoTool from './tools/BrowserInfoTool'
import CronTool from './tools/CronTool'
import GridPlaygroundTool from './tools/GridPlaygroundTool'

import TypeScaleTool from './tools/TypeScaleTool'
import SpacingTool from './tools/SpacingTool'
import AnimationPlaygroundTool from './tools/AnimationPlaygroundTool'
import GlassmorphismTool from './tools/GlassmorphismTool'
import ColorPaletteTool from './tools/ColorPaletteTool'
import EasingVisualizerTool from './tools/EasingVisualizerTool'
import BreakpointTool from './tools/BreakpointTool'
import SVGPathTool from './tools/SVGPathTool'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FileCode, category: 'Developer', desc: 'Format, validate & collapsible tree', component: JSONTool },
  { id: 'regex', name: 'Regex Tester', icon: Search, category: 'Developer', desc: 'Test regex with live matches', component: RegexTool },
  { id: 'jwt', name: 'JWT Decoder', icon: Shield, category: 'Developer', desc: 'Decode JSON Web Tokens', component: JWTTool },
  { id: 'markdown', name: 'Markdown Preview', icon: FileCode, category: 'Developer', desc: 'Live Markdown to HTML', component: MarkdownTool },
  { id: 'csvjson', name: 'CSV ↔ JSON', icon: FileCode, category: 'Developer', desc: 'Convert CSV and JSON', component: CSVJSONTool },
  { id: 'csvmd', name: 'CSV to Markdown Table', icon: FileCode, category: 'Developer', desc: 'Convert CSV to MD table', component: CSVToMarkdownTool },
  { id: 'jsonyaml', name: 'JSON to YAML (simple)', icon: FileCode, category: 'Developer', desc: 'Basic JSON → YAML', component: JSONToYAMLTool },
  { id: 'diff', name: 'Text Diff', icon: Binary, category: 'Developer', desc: 'Simple text comparison', component: DiffTool },
  { id: 'calc', name: 'Simple Calculator', icon: Calculator, category: 'Developer', desc: 'Basic math evaluator', component: SimpleCalcTool },
  { id: 'base64', name: 'Base64', icon: Key, category: 'Encoding', desc: 'Encode and decode Base64', component: Base64Tool },
  { id: 'base32', name: 'Base32', icon: Key, category: 'Encoding', desc: 'Base32 encode/decode', component: Base32Tool },
  { id: 'url', name: 'URL Encode/Decode', icon: Link, category: 'Encoding', desc: 'URL parameter tools', component: URLBuilderTool },
  { id: 'html', name: 'HTML Encode/Decode', icon: Type, category: 'Encoding', desc: 'HTML entities', component: HTMLEncodeTool },
  { id: 'escape', name: 'Escape / Unescape', icon: Type, category: 'Encoding', desc: 'Escape strings for code', component: EscapeTool },
  { id: 'hash', name: 'Hash Generator', icon: Hash, category: 'Crypto', desc: 'MD5, SHA-256, SHA-512', component: HashTool },
  { id: 'hmac', name: 'HMAC Generator', icon: Shield, category: 'Crypto', desc: 'HMAC with various algorithms', component: HMACTool },
  { id: 'aes', name: 'AES Encrypt/Decrypt', icon: Lock, category: 'Security', desc: 'AES-256 with password', component: AESTool },
  { id: 'password', name: 'Password Generator', icon: User, category: 'Security', desc: 'Strong customizable passwords', component: PasswordTool },
  { id: 'pwstrength', name: 'Password Strength', icon: Shield, category: 'Security', desc: 'Check password strength', component: PasswordStrengthTool },
  { id: 'pwentropy', name: 'Password Entropy', icon: Shield, category: 'Security', desc: 'Approximate entropy', component: PasswordEntropyTool },
  { id: 'timestamp', name: 'Timestamp Converter', icon: Clock, category: 'Utility', desc: 'Unix ↔ Human date', component: TimestampTool },
  { id: 'relative', name: 'Relative Time', icon: Clock, category: 'Utility', desc: 'Date to "2 days ago"', component: RelativeTimeTool },
  { id: 'datefmt', name: 'Date Formatter', icon: Clock, category: 'Utility', desc: 'Format dates', component: DateFormatterTool },
  { id: 'uuid', name: 'UUID Generator (v4-v8)', icon: Fingerprint, category: 'Utility', desc: 'v4, v5, v6, v7, v8', component: UUIDTool },
  { id: 'qr', name: 'QR Code Generator', icon: QrCode, category: 'Utility', desc: 'Text/URL to QR code', component: QRCodeTool },
  { id: 'random', name: 'Random Generator', icon: Calculator, category: 'Utility', desc: 'Numbers, strings, booleans', component: RandomTool },
  { id: 'dice', name: 'Dice Roller', icon: Calculator, category: 'Utility', desc: 'Roll dice', component: DiceRollerTool },
  { id: 'lorem', name: 'Lorem Ipsum', icon: Quote, category: 'Utility', desc: 'Placeholder text generator', component: LoremTool },
  { id: 'wordcount', name: 'Word Counter', icon: Calculator, category: 'Utility', desc: 'Words, chars, reading time', component: WordCountTool },
  { id: 'trim', name: 'Trim Tool', icon: Type, category: 'Text', desc: 'Trim whitespace', component: TrimTool },
  { id: 'reverse', name: 'Reverse Text', icon: Type, category: 'Text', desc: 'Reverse characters/lines', component: ReverseTool },
  { id: 'sortlines', name: 'Sort Lines', icon: Type, category: 'Text', desc: 'Sort lines A-Z or Z-A', component: SortLinesTool },
  { id: 'slugify', name: 'Slugify', icon: Link, category: 'Text', desc: 'URL-friendly slugs', component: SlugifyTool },
  { id: 'case', name: 'Case Converter', icon: Type, category: 'Text', desc: 'camelCase, snake_case, etc.', component: CaseTool },
  { id: 'capitalize', name: 'Capitalize Text', icon: Type, category: 'Text', desc: 'Title / Sentence case', component: CapitalizeTool },
  { id: 'duplicate', name: 'Remove Duplicates', icon: Type, category: 'Text', desc: 'Remove duplicate lines', component: DuplicateTool },
  { id: 'removespaces', name: 'Remove Spaces', icon: Type, category: 'Text', desc: 'Remove extra/all whitespace', component: RemoveSpacesTool },
  { id: 'findreplace', name: 'Find & Replace', icon: Type, category: 'Text', desc: 'Find and replace in text', component: FindReplaceTool },
  { id: 'striphtml', name: 'Strip HTML', icon: Type, category: 'Text', desc: 'Remove HTML tags', component: StripHTMLTool },
  { id: 'rot13', name: 'ROT13', icon: Type, category: 'Text', desc: 'ROT13 cipher', component: ROT13Tool },
  { id: 'morse', name: 'Morse Code', icon: Type, category: 'Text', desc: 'Morse code converter', component: MorseCodeTool },
  { id: 'binary', name: 'Text ↔ Binary', icon: Binary, category: 'Text', desc: 'Text to binary and back', component: BinaryTextTool },
  { id: 'leet', name: 'Leetspeak', icon: Type, category: 'Text', desc: 'Convert to leetspeak', component: LeetSpeakTool },
  { id: 'accents', name: 'Remove Accents', icon: Type, category: 'Text', desc: 'Remove diacritics', component: RemoveAccentsTool },
  { id: 'color', name: 'Color Converter', icon: Palette, category: 'Design', desc: 'HEX, RGB, HSL', component: ColorTool },
  { id: 'randomcolor', name: 'Random Palette', icon: Palette, category: 'Design', desc: 'Generate random colors', component: RandomColorTool },
  { id: 'contrast', name: 'Contrast Checker', icon: Palette, category: 'Design', desc: 'WCAG contrast ratio', component: ContrastCheckerTool },
  { id: 'emailval', name: 'Email Validator', icon: Shield, category: 'Validator', desc: 'Validate email format', component: EmailValidatorTool },
  { id: 'phoneval', name: 'Phone Validator', icon: Shield, category: 'Validator', desc: 'Basic phone validation', component: PhoneValidatorTool },
  { id: 'creditcard', name: 'Credit Card Validator', icon: Shield, category: 'Validator', desc: 'Luhn algorithm check', component: CreditCardValidatorTool },
  { id: 'isbn', name: 'ISBN Validator', icon: Shield, category: 'Validator', desc: 'ISBN-10 / ISBN-13', component: ISBNValidatorTool },
  { id: 'urlval', name: 'URL Validator', icon: Link, category: 'Validator', desc: 'Validate URL format', component: URLValidatorTool },
  { id: 'ipval', name: 'IP Validator', icon: Binary, category: 'Validator', desc: 'Validate IPv4/IPv6', component: IPValidatorTool },
  { id: 'urlbuilder', name: 'URL Builder', icon: Link, category: 'Builder', desc: 'Build URLs with query params', component: URLBuilderTool },
  { id: 'querystring', name: 'Query String Parser', icon: Link, category: 'Builder', desc: 'Parse/build query strings', component: QueryStringTool },
  { id: 'listtocsv', name: 'List ↔ CSV', icon: Type, category: 'Text', desc: 'Convert between list and CSV', component: ListToCSVTool },
  { id: 'numberbase', name: 'Number Base Converter', icon: Binary, category: 'Utility', desc: 'Binary, Octal, Decimal, Hex', component: NumberBaseTool },
  { id: 'bytes', name: 'Bytes to Human', icon: Calculator, category: 'Utility', desc: '1024 B → 1 KB', component: BytesTool },
  { id: 'unit', name: 'Unit Converter', icon: Calculator, category: 'Utility', desc: 'Length, distance units', component: UnitConverterTool },
  { id: 'semver', name: 'Semver Helper', icon: Calculator, category: 'Developer', desc: 'Semantic version builder', component: SemverTool },
  { id: 'palindrome', name: 'Palindrome Checker', icon: Type, category: 'Text', desc: 'Check if palindrome', component: PalindromeTool },
  { id: 'anagram', name: 'Anagram Checker', icon: Type, category: 'Text', desc: 'Check anagrams', component: AnagramTool },
  { id: 'base64img', name: 'Base64 Image Preview', icon: Key, category: 'Encoding', desc: 'Preview base64 images', component: Base64ImageTool },
  { id: 'hashcompare', name: 'Hash Compare', icon: Hash, category: 'Crypto', desc: 'Compare two hashes', component: HashCompareTool },
  { id: 'linenumber', name: 'Add Line Numbers', icon: Type, category: 'Text', desc: 'Number each line', component: LineNumberTool },

  // New richer design tools
  { id: 'gradient', name: 'CSS Gradient Generator', icon: Palette, category: 'Design', desc: 'Linear & radial gradients with copy', component: GradientTool },
  { id: 'boxshadow', name: 'Box Shadow Generator', icon: Palette, category: 'Design', desc: 'Real-time shadow designer', component: BoxShadowTool },
  { id: 'border', name: 'Border Radius Editor', icon: Palette, category: 'Design', desc: 'Corner radius visual editor', component: BorderRadiusTool },
  { id: 'flex', name: 'Flexbox Playground', icon: Palette, category: 'Design', desc: 'Live flexbox visualizer', component: FlexboxTool },
  { id: 'grid', name: 'CSS Grid Playground', icon: Palette, category: 'Design', desc: 'Interactive grid builder', component: GridPlaygroundTool },

  // Heavier design system tools
  { id: 'typescale', name: 'Type Scale Generator', icon: Palette, category: 'Design', desc: 'Beautiful typography scale', component: TypeScaleTool },
  { id: 'spacing', name: 'Spacing Scale', icon: Palette, category: 'Design', desc: 'Consistent spacing system', component: SpacingTool },
  { id: 'animation', name: 'Animation Playground', icon: Palette, category: 'Design', desc: 'Easing + transform live preview', component: AnimationPlaygroundTool },
  { id: 'glass', name: 'Glassmorphism Generator', icon: Palette, category: 'Design', desc: 'Backdrop blur glass cards', component: GlassmorphismTool },
  { id: 'palette', name: 'Color Palette Generator', icon: Palette, category: 'Design', desc: 'Shades from any base color', component: ColorPaletteTool },
  { id: 'easing', name: 'Easing Visualizer', icon: Palette, category: 'Design', desc: 'Cubic-bezier previews', component: EasingVisualizerTool },
  { id: 'breakpoints', name: 'Breakpoint Tester', icon: Palette, category: 'Design', desc: 'Responsive container simulator', component: BreakpointTool },
  { id: 'svgpath', name: 'SVG Path Editor', icon: Palette, category: 'Design', desc: 'Quick path + stroke editor', component: SVGPathTool },

  // New utility & dev tools
  { id: 'faker', name: 'Fake Data Generator', icon: User, category: 'Utility', desc: 'Names, emails, phones, addresses', component: FakerTool },
  { id: 'stopwatch', name: 'Stopwatch + Laps', icon: Clock, category: 'Utility', desc: 'High-precision timer', component: StopwatchTool },
  { id: 'curl', name: 'cURL → fetch', icon: FileCode, category: 'Developer', desc: 'Convert curl commands instantly', component: CurlTool },
  { id: 'mdtable', name: 'Markdown Table Maker', icon: FileCode, category: 'Developer', desc: 'Generate clean markdown tables', component: MarkdownTableTool },
  { id: 'imageresize', name: 'Image Resizer', icon: Palette, category: 'Design', desc: 'Resize images locally', component: ImageResizeTool },
  { id: 'browser', name: 'Browser Info', icon: Shield, category: 'Utility', desc: 'Device, screen & UA details', component: BrowserInfoTool },
  { id: 'cron', name: 'Cron Explainer', icon: Clock, category: 'Developer', desc: 'Understand cron expressions', component: CronTool },
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

  if (!activeTool) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="border-b bg-white">
          <div className="max-w-screen-2xl mx-auto px-8 pt-16 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                Professional • Private • Free
              </div>
              <h1 className="text-7xl font-semibold tracking-tighter text-slate-900 leading-none">
                The toolkit<br />you actually want to use.
              </h1>
              <p className="mt-6 text-2xl text-slate-600 max-w-md">
                Fast, beautiful tools that run entirely in your browser.
              </p>
              <div className="mt-8 flex gap-3">
                <a href="#tools" className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold tracking-tight transition shadow-sm">Browse all tools</a>
                <button onClick={() => { const el = document.getElementById('tools'); el?.scrollIntoView({ behavior: 'smooth' }) }} className="px-7 py-3.5 border border-slate-200 hover:bg-white rounded-2xl text-sm font-medium">Explore catalog</button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 py-8 border-b bg-white">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-semibold text-slate-900 tracking-tighter">{tools.length}</div>
              <div className="text-xs uppercase tracking-[1.5px] text-slate-500 mt-1">Tools</div>
            </div>
            <div>
              <div className="text-5xl font-semibold text-slate-900 tracking-tighter">100%</div>
              <div className="text-xs uppercase tracking-[1.5px] text-slate-500 mt-1">Client-side</div>
            </div>
            <div>
              <div className="text-5xl font-semibold text-slate-900 tracking-tighter">v0.4.0</div>
              <div className="text-xs uppercase tracking-[1.5px] text-slate-500 mt-1">Current version</div>
            </div>
          </div>
        </div>

        <div id="tools" className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-semibold tracking-[2px] text-zinc-400">CATALOG • {tools.length} TOOLS</div>
              <div className="text-4xl font-semibold tracking-tight">All Tools</div>
            </div>
            <input type="text" placeholder="Search tools..." className="px-5 py-3 bg-white border border-zinc-200 rounded-2xl text-sm w-72" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map(tool => {
              const Icon = tool.icon
              return (
                <button key={tool.id} onClick={() => setActiveTool(tool.id)} className="group bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 rounded-3xl p-7 text-left transition-all active:scale-[0.985]">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 rounded-2xl flex items-center justify-center transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full font-medium tracking-tight">{tool.category}</div>
                  </div>
                  <div className="mt-5 font-semibold text-[17px] tracking-[-0.2px] text-slate-900">{tool.name}</div>
                  <div className="text-sm text-slate-500 mt-1.5 leading-snug line-clamp-2">{tool.desc}</div>
                  <div className="mt-5 text-xs text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 font-medium">Open →</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-zinc-50">
      <div className="w-72 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b">
          <button onClick={() => setActiveTool(null)} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center"><FileCode className="w-5 h-5 text-white" /></div>
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
                <div><div className="font-medium text-sm">{tool.name}</div><div className="text-xs text-zinc-400">{tool.category}</div></div>
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
          {ToolComponent ? <ToolComponent /> : <div className="text-center py-20 text-zinc-400">Tool coming soon</div>}
        </div>
      </div>
    </div>
  )
}

export default App