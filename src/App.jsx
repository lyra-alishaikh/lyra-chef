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
import TextCaseTool from './tools/TextCaseTool'
import TextCodecTool from './tools/TextCodecTool'
import URLBuilderTool from './tools/URLBuilderTool'
import Base64ImageTool from './tools/Base64ImageTool'
import IDGeneratorTool from './tools/IDGeneratorTool'
import WebAnalyzerTool from './tools/WebAnalyzerTool'
import ImageStudioTool from './tools/ImageStudioTool'
import {
  BasicAuthTool,
  BinaryTextTool,
  BorderRadiusTool,
  BoxShadowTool,
  ClampTool,
  ColorPaletteTool,
  ContrastCheckerTool,
  CronExplainerTool,
  CsvJsonTool,
  CssUnitTool,
  DateCalculatorTool,
  DiceRollerTool,
  DuplicateLinesTool,
  EmailNormalizerTool,
  HexTextTool,
  HMACTool,
  HtmlStripTool,
  HttpStatusTool,
  IpValidatorTool,
  JsonPathTool,
  JWTDecoderTool,
  KeyValueJsonTool,
  LineWrapTool,
  LoremIpsumTool,
  MarkdownPreviewTool,
  MimeTypeTool,
  NanoIdTool,
  NumberBaseTool,
  PercentageTool,
  QueryStringTool,
  RandomTool,
  RegexEscapeTool,
  SemverTool,
  SlugifyTool,
  TextDiffTool,
  TextStatsTool,
  UnicodeInspectorTool,
  UnitConverterTool,
  UrlValidatorTool,
  UserAgentTool,
} from './tools/MoreTools'

const APP_VERSION = '0.3.0'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FileCode, category: 'Developer', desc: 'Format, validate and minify JSON', component: JSONTool },
  { id: 'jwt', name: 'JWT Decoder', icon: Shield, category: 'Developer', desc: 'Decode JWT header and payload', component: JWTDecoderTool },
  { id: 'regex', name: 'Regex Tester', icon: Search, category: 'Developer', desc: 'Test regex with live matches', component: RegexTool },
  { id: 'regex-escape', name: 'Regex Escaper', icon: Search, category: 'Developer', desc: 'Escape text for regular expressions', component: RegexEscapeTool },
  { id: 'markdown', name: 'Markdown Preview', icon: FileCode, category: 'Developer', desc: 'Preview Markdown while typing', component: MarkdownPreviewTool },
  { id: 'diff', name: 'Text Diff', icon: Binary, category: 'Developer', desc: 'Compare two text blocks line by line', component: TextDiffTool },
  { id: 'csv-json', name: 'CSV JSON Converter', icon: FileCode, category: 'Developer', desc: 'Convert CSV to JSON and back', component: CsvJsonTool },
  { id: 'jsonpath', name: 'JSON Path Extractor', icon: FileCode, category: 'Developer', desc: 'Pull values with simple dot paths', component: JsonPathTool },
  { id: 'kv-json', name: 'Key Value to JSON', icon: FileCode, category: 'Developer', desc: 'Turn key=value lines into JSON', component: KeyValueJsonTool },
  { id: 'query', name: 'Query String Parser', icon: Link, category: 'Developer', desc: 'Parse URL query params to JSON', component: QueryStringTool },
  { id: 'url-builder', name: 'URL Builder', icon: Link, category: 'Developer', desc: 'Build URLs from base and params', component: URLBuilderTool },
  { id: 'web-analyzer', name: 'URL Analyzer', icon: Link, category: 'Developer', desc: 'Inspect URL structure and HTTPS', component: WebAnalyzerTool },
  { id: 'cron', name: 'Cron Explainer', icon: Clock, category: 'Developer', desc: 'Explain five-field cron syntax', component: CronExplainerTool },
  { id: 'http-status', name: 'HTTP Status Lookup', icon: Search, category: 'Developer', desc: 'Find common HTTP status codes', component: HttpStatusTool },
  { id: 'mime', name: 'MIME Type Lookup', icon: Search, category: 'Developer', desc: 'Common extension to MIME map', component: MimeTypeTool },
  { id: 'user-agent', name: 'User Agent Parser', icon: Search, category: 'Developer', desc: 'Quick browser and mobile hints', component: UserAgentTool },
  { id: 'semver', name: 'Semver Helper', icon: Calculator, category: 'Developer', desc: 'Break down and bump versions', component: SemverTool },

  { id: 'base64', name: 'Base64 Text', icon: Key, category: 'Encoding', desc: 'Encode and decode Base64', component: Base64Tool },
  { id: 'base64-image', name: 'Base64 Image', icon: Key, category: 'Encoding', desc: 'Convert images to data URLs', component: Base64ImageTool },
  { id: 'text-codec', name: 'URL HTML Codec', icon: Type, category: 'Encoding', desc: 'Encode/decode URL and HTML entities', component: TextCodecTool },
  { id: 'binary-text', name: 'Binary Text', icon: Binary, category: 'Encoding', desc: 'Text to binary and back', component: BinaryTextTool },
  { id: 'hex-text', name: 'Hex Text', icon: Binary, category: 'Encoding', desc: 'Text to hex and back', component: HexTextTool },
  { id: 'unicode', name: 'Unicode Inspector', icon: Type, category: 'Encoding', desc: 'Inspect code points', component: UnicodeInspectorTool },
  { id: 'html-strip', name: 'HTML Tag Stripper', icon: Type, category: 'Encoding', desc: 'Extract readable text from HTML', component: HtmlStripTool },

  { id: 'hash', name: 'Hash Generator', icon: Hash, category: 'Crypto', desc: 'MD5, SHA-1, SHA-256, SHA-512', component: HashTool },
  { id: 'hmac', name: 'HMAC Generator', icon: Shield, category: 'Crypto', desc: 'HMAC SHA signatures', component: HMACTool },
  { id: 'aes', name: 'AES Encrypt/Decrypt', icon: Lock, category: 'Security', desc: 'AES encryption with password', component: AESTool },
  { id: 'password', name: 'Password Generator', icon: User, category: 'Security', desc: 'Strong customizable passwords', component: PasswordTool },
  { id: 'basic-auth', name: 'Basic Auth Header', icon: Shield, category: 'Security', desc: 'Generate HTTP Basic auth headers', component: BasicAuthTool },

  { id: 'timestamp', name: 'Timestamp Converter', icon: Clock, category: 'Utility', desc: 'Unix timestamp to human date', component: TimestampTool },
  { id: 'uuid', name: 'UUID Generator v4-v8', icon: Fingerprint, category: 'Utility', desc: 'Generate UUID v4, v5, v6, v7, v8', component: UUIDTool },
  { id: 'ids', name: 'ID Generator', icon: Fingerprint, category: 'Utility', desc: 'UUID, GUID and ULID batches', component: IDGeneratorTool },
  { id: 'nanoid', name: 'Nano ID Generator', icon: Fingerprint, category: 'Utility', desc: 'Short URL-safe random IDs', component: NanoIdTool },
  { id: 'qr', name: 'QR Code Generator', icon: QrCode, category: 'Utility', desc: 'Generate downloadable QR codes', component: QRCodeTool },
  { id: 'random', name: 'Random Numbers', icon: Calculator, category: 'Utility', desc: 'Secure random integer batches', component: RandomTool },
  { id: 'dice', name: 'Dice Roller', icon: Calculator, category: 'Utility', desc: 'Roll NdS dice expressions', component: DiceRollerTool },
  { id: 'number-base', name: 'Number Base Converter', icon: Calculator, category: 'Utility', desc: 'Decimal, binary, octal and hex', component: NumberBaseTool },
  { id: 'unit', name: 'Length Converter', icon: Calculator, category: 'Utility', desc: 'Meters, kilometers, miles and feet', component: UnitConverterTool },
  { id: 'percentage', name: 'Percentage Calculator', icon: Calculator, category: 'Utility', desc: 'Percent of, increase and ratios', component: PercentageTool },
  { id: 'date-calc', name: 'Date Calculator', icon: Clock, category: 'Utility', desc: 'Add days and compare dates', component: DateCalculatorTool },
  { id: 'lorem', name: 'Lorem Ipsum', icon: Quote, category: 'Utility', desc: 'Generate placeholder text', component: LoremIpsumTool },

  { id: 'text-stats', name: 'Word Counter', icon: Calculator, category: 'Text', desc: 'Words, chars, bytes and reading time', component: TextStatsTool },
  { id: 'trim', name: 'Trim Whitespace', icon: Type, category: 'Text', desc: 'Trim each line or whole text', component: TrimTool },
  { id: 'reverse', name: 'Reverse Text', icon: Type, category: 'Text', desc: 'Reverse characters or lines', component: ReverseTool },
  { id: 'sortlines', name: 'Sort Lines', icon: Type, category: 'Text', desc: 'Sort lines A-Z or Z-A', component: SortLinesTool },
  { id: 'slugify', name: 'Slugify', icon: Link, category: 'Text', desc: 'Create URL-friendly slugs', component: SlugifyTool },
  { id: 'case', name: 'Case Converter', icon: Type, category: 'Text', desc: 'camelCase, snake_case and more', component: TextCaseTool },
  { id: 'duplicate', name: 'Remove Duplicate Lines', icon: Type, category: 'Text', desc: 'Deduplicate line lists', component: DuplicateLinesTool },
  { id: 'wrap', name: 'Line Wrapper', icon: Type, category: 'Text', desc: 'Wrap text to a target width', component: LineWrapTool },

  { id: 'color', name: 'Color Converter', icon: Palette, category: 'Design', desc: 'HEX, RGB and HSL conversion', component: ColorTool },
  { id: 'contrast', name: 'Contrast Checker', icon: Palette, category: 'Design', desc: 'WCAG contrast ratio checks', component: ContrastCheckerTool },
  { id: 'palette', name: 'Color Palette', icon: Palette, category: 'Design', desc: 'Generate color shade ramps', component: ColorPaletteTool },
  { id: 'css-unit', name: 'CSS Unit Converter', icon: Palette, category: 'Design', desc: 'PX, REM, EM and percent', component: CssUnitTool },
  { id: 'clamp', name: 'CSS Clamp Builder', icon: Palette, category: 'Design', desc: 'Responsive clamp() generator', component: ClampTool },
  { id: 'box-shadow', name: 'Box Shadow Builder', icon: Palette, category: 'Design', desc: 'Preview and copy shadows', component: BoxShadowTool },
  { id: 'radius', name: 'Border Radius Builder', icon: Palette, category: 'Design', desc: 'Preview and copy radii', component: BorderRadiusTool },
  { id: 'image-studio', name: 'Image Studio', icon: Palette, category: 'Design', desc: 'Preview, filter and export images', component: ImageStudioTool },

  { id: 'emailval', name: 'Email Validator', icon: Shield, category: 'Validator', desc: 'Validate email format', component: EmailValidatorTool },
  { id: 'email-normalize', name: 'Email Normalizer', icon: Shield, category: 'Validator', desc: 'Normalize email casing and aliases', component: EmailNormalizerTool },
  { id: 'urlval', name: 'URL Validator', icon: Link, category: 'Validator', desc: 'Validate and inspect URLs', component: UrlValidatorTool },
  { id: 'ipval', name: 'IP Validator', icon: Binary, category: 'Validator', desc: 'Validate IPv4 and IPv6', component: IpValidatorTool },
]

function App() {
  const [activeTool, setActiveTool] = useState(null)
  const [search, setSearch] = useState('')

  const filteredTools = tools.filter(tool => {
    const query = search.toLowerCase()
    return [tool.name, tool.category, tool.desc].some(value => value.toLowerCase().includes(query))
  })

  const currentTool = tools.find(tool => tool.id === activeTool)
  const ToolComponent = currentTool?.component
  const CurrentIcon = currentTool?.icon

  if (!activeTool) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-screen-2xl px-6 pb-12 pt-14 sm:px-8 sm:pt-16">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                Professional • Private • Free
              </div>
              <h1 className="text-5xl font-semibold leading-none tracking-tight text-zinc-900 sm:text-7xl">
                The toolkit<br />you actually want to use.
              </h1>
              <p className="mt-6 max-w-xl text-xl text-zinc-600 sm:text-2xl">
                Fast, polished browser tools for developers, designers, writers, and everyday data cleanup.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl border-b px-6 py-8 text-center sm:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div><div className="text-3xl font-semibold sm:text-4xl">{tools.length}</div><div className="text-sm text-zinc-500">Tools</div></div>
            <div><div className="text-3xl font-semibold sm:text-4xl">100%</div><div className="text-sm text-zinc-500">Client-side</div></div>
            <div><div className="text-3xl font-semibold sm:text-4xl">v{APP_VERSION}</div><div className="text-sm text-zinc-500">Current version</div></div>
          </div>
        </div>

        <div id="tools" className="mx-auto max-w-screen-2xl px-6 py-12 sm:px-8">
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="text-xs font-semibold tracking-[2px] text-zinc-400">CATALOG • {tools.length} TOOLS</div>
              <div className="text-4xl font-semibold tracking-tight">All Tools</div>
            </div>
            <input type="text" placeholder="Search tools..." className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map(tool => {
              const Icon = tool.icon
              return (
                <button key={tool.id} onClick={() => setActiveTool(tool.id)} className="group rounded-3xl border border-zinc-200 bg-white p-7 text-left transition-all hover:-translate-y-0.5 hover:border-zinc-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">{tool.category}</div>
                  </div>
                  <div className="mt-6 text-xl font-semibold tracking-tight">{tool.name}</div>
                  <div className="mt-2 min-h-10 text-sm leading-snug text-zinc-600">{tool.desc}</div>
                  <div className="mt-6 flex items-center gap-1 text-sm text-zinc-400 transition-colors group-hover:text-zinc-900">Open tool <ArrowRight className="h-3.5 w-3.5" /></div>
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
      <div className="flex w-72 shrink-0 flex-col border-r border-zinc-200 bg-white">
        <div className="border-b p-6">
          <button onClick={() => setActiveTool(null)} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900"><FileCode className="h-5 w-5 text-white" /></div>
            <div>
              <div className="text-2xl font-semibold tracking-tight">Lyra Chef</div>
              <div className="text-xs text-zinc-500">v{APP_VERSION}</div>
            </div>
          </button>
        </div>
        <div className="p-4">
          <input type="text" placeholder="Search..." className="w-full rounded-2xl border border-transparent bg-zinc-100 px-4 py-2.5 text-sm focus:border-zinc-300" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex-1 overflow-auto px-3 pb-6">
          {filteredTools.map(tool => {
            const Icon = tool.icon
            const isActive = activeTool === tool.id
            return (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                <Icon className="h-4 w-4 shrink-0" />
                <div className="min-w-0"><div className="truncate text-sm font-medium">{tool.name}</div><div className="text-xs text-zinc-400">{tool.category}</div></div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 border-b bg-white px-8 py-5">
          <div className="flex min-w-0 items-center gap-3 text-2xl font-semibold tracking-tight">
            {CurrentIcon && <CurrentIcon className="h-6 w-6 shrink-0" />}
            <span className="truncate">{currentTool?.name}</span>
          </div>
          <button onClick={() => setActiveTool(null)} className="shrink-0 rounded-2xl border px-5 py-2.5 text-sm">Back to catalog</button>
        </div>
        <div className="flex-1 overflow-auto p-8">
          {ToolComponent ? <ToolComponent /> : <div className="py-20 text-center text-zinc-400">Tool unavailable</div>}
        </div>
      </div>
    </div>
  )
}

export default App
