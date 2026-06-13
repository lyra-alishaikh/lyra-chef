import { useMemo, useState } from 'react'
import CryptoJS from 'crypto-js'

const sampleText = 'Lyra Chef turns boring browser utilities into a clean workspace.'
const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ')

function Panel({ children }) {
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5">{children}</div>
}

function TextArea({ value, onChange, placeholder = 'Paste text here', rows = 'h-44' }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${rows} w-full rounded-2xl border border-zinc-300 p-5 font-mono text-sm`}
    />
  )
}

function Output({ children }) {
  return <pre className="min-h-32 whitespace-pre-wrap break-words rounded-2xl border border-zinc-200 bg-white p-5 font-mono text-sm">{children}</pre>
}

function safeJson(value, fallback = null) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function decodeBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=')
  return decodeURIComponent(escape(atob(padded)))
}

function csvRows(input) {
  const rows = []
  let cell = ''
  let row = []
  let quoted = false
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i]
    const next = input[i + 1]
    if (char === '"' && quoted && next === '"') {
      cell += '"'
      i += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      row.push(cell)
      cell = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }
  row.push(cell)
  rows.push(row)
  return rows.filter(items => items.some(item => item.trim() !== ''))
}

function rowsToCsv(rows) {
  return rows.map(row => row.map(value => {
    const text = String(value ?? '')
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }).join(',')).join('\n')
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim()
  if (!/^[0-9a-f]{6}$/i.test(clean)) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function luminance({ r, g, b }) {
  const values = [r, g, b].map(value => {
    const channel = value / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return (0.2126 * values[0]) + (0.7152 * values[1]) + (0.0722 * values[2])
}

function randomInt(min, max) {
  const low = Math.ceil(Math.min(min, max))
  const high = Math.floor(Math.max(min, max))
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return low + (bytes[0] % (high - low + 1))
}

export function JWTDecoderTool() {
  const [token, setToken] = useState('')
  const output = useMemo(() => {
    const parts = token.split('.')
    if (parts.length < 2) return 'Paste a JWT to decode header and payload.'
    try {
      return JSON.stringify({
        header: safeJson(decodeBase64Url(parts[0]), {}),
        payload: safeJson(decodeBase64Url(parts[1]), {}),
        signature: parts[2] ? `${parts[2].slice(0, 18)}...` : '',
      }, null, 2)
    } catch (error) {
      return `Invalid JWT: ${error.message}`
    }
  }, [token])

  return <div className="max-w-5xl space-y-4"><TextArea value={token} onChange={setToken} placeholder="eyJhbGciOi..." /><Output>{output}</Output></div>
}

export function HMACTool() {
  const [input, setInput] = useState('message')
  const [secret, setSecret] = useState('secret')
  const [algo, setAlgo] = useState('SHA256')
  const output = useMemo(() => {
    const makers = {
      SHA1: CryptoJS.HmacSHA1,
      SHA256: CryptoJS.HmacSHA256,
      SHA384: CryptoJS.HmacSHA384,
      SHA512: CryptoJS.HmacSHA512,
    }
    return makers[algo](input, secret).toString(CryptoJS.enc.Hex)
  }, [input, secret, algo])

  return (
    <div className="max-w-4xl space-y-4">
      <TextArea value={input} onChange={setInput} placeholder="Message" />
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input value={secret} onChange={e => setSecret(e.target.value)} className="rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" placeholder="Secret key" />
        <select value={algo} onChange={e => setAlgo(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3">
          <option>SHA1</option><option>SHA256</option><option>SHA384</option><option>SHA512</option>
        </select>
      </div>
      <Output>{output}</Output>
    </div>
  )
}

export function MarkdownPreviewTool() {
  const [input, setInput] = useState('# Lyra Chef\n\n- Fast\n- Private\n- Client-side')
  const html = useMemo(() => input
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .replace(/\n/g, '<br />'), [input])

  return (
    <div className="grid max-w-6xl gap-5 lg:grid-cols-2">
      <TextArea value={input} onChange={setInput} rows="h-96" />
      <div className="prose max-w-none rounded-2xl border border-zinc-200 bg-white p-5" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export function TextDiffTool() {
  const [left, setLeft] = useState('one\ntwo\nthree')
  const [right, setRight] = useState('one\nTWO\nthree\nfour')
  const diff = useMemo(() => {
    const a = left.split('\n')
    const b = right.split('\n')
    const max = Math.max(a.length, b.length)
    return Array.from({ length: max }, (_, index) => {
      if (a[index] === b[index]) return `  ${a[index] ?? ''}`
      return `${a[index] !== undefined ? `- ${a[index]}` : ''}${a[index] !== undefined && b[index] !== undefined ? '\n' : ''}${b[index] !== undefined ? `+ ${b[index]}` : ''}`
    }).join('\n')
  }, [left, right])

  return (
    <div className="max-w-6xl space-y-4">
      <div className="grid gap-4 lg:grid-cols-2"><TextArea value={left} onChange={setLeft} /><TextArea value={right} onChange={setRight} /></div>
      <Output>{diff}</Output>
    </div>
  )
}

export function CsvJsonTool() {
  const [input, setInput] = useState('name,category\nJSON Formatter,Developer\nColor Converter,Design')
  const [mode, setMode] = useState('csvToJson')
  const output = useMemo(() => {
    try {
      if (mode === 'csvToJson') {
        const [headers, ...rows] = csvRows(input)
        return JSON.stringify(rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? '']))), null, 2)
      }
      const data = safeJson(input, [])
      const rows = Array.isArray(data) ? data : [data]
      const headers = [...new Set(rows.flatMap(row => Object.keys(row)))]
      return rowsToCsv([headers, ...rows.map(row => headers.map(header => row[header]))])
    } catch (error) {
      return `Conversion failed: ${error.message}`
    }
  }, [input, mode])

  return (
    <div className="max-w-5xl space-y-4">
      <select value={mode} onChange={e => setMode(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3">
        <option value="csvToJson">CSV to JSON</option>
        <option value="jsonToCsv">JSON to CSV</option>
      </select>
      <TextArea value={input} onChange={setInput} rows="h-64" />
      <Output>{output}</Output>
    </div>
  )
}

export function QueryStringTool() {
  const [input, setInput] = useState('https://example.com/search?q=lyra&page=1')
  const output = useMemo(() => {
    try {
      const url = input.includes('://') ? new URL(input) : new URL(`https://example.com/?${input.replace(/^\?/, '')}`)
      return JSON.stringify(Object.fromEntries(url.searchParams.entries()), null, 2)
    } catch {
      return 'Enter a full URL or query string.'
    }
  }, [input])

  return <div className="max-w-4xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

export function JsonPathTool() {
  const [json, setJson] = useState('{"user":{"name":"Lyra","tools":["json","uuid"]}}')
  const [path, setPath] = useState('user.tools.0')
  const output = useMemo(() => {
    try {
      const value = path.split('.').filter(Boolean).reduce((current, key) => current?.[key], JSON.parse(json))
      return JSON.stringify(value, null, 2)
    } catch (error) {
      return error.message
    }
  }, [json, path])

  return <div className="max-w-5xl space-y-4"><TextArea value={json} onChange={setJson} /><input value={path} onChange={e => setPath(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

export function KeyValueJsonTool() {
  const [input, setInput] = useState('name=Lyra Chef\nversion=0.3.0\nprivate=true')
  const output = useMemo(() => JSON.stringify(Object.fromEntries(input.split('\n').filter(Boolean).map(line => {
    const [key, ...rest] = line.split('=')
    return [key.trim(), rest.join('=').trim()]
  })), null, 2), [input])

  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function RegexEscapeTool() {
  const [input, setInput] = useState('https://example.com/search?q=(lyra)')
  const escaped = useMemo(() => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{escaped}</Output></div>
}

export function TextStatsTool() {
  const [input, setInput] = useState(sampleText)
  const stats = useMemo(() => {
    const chars = input.length
    const words = input.trim() ? input.trim().split(/\s+/).length : 0
    const lines = input ? input.split('\n').length : 0
    return { chars, words, lines, bytes: new Blob([input]).size, reading: `${Math.max(1, Math.ceil(words / 225))} min` }
  }, [input])

  return (
    <div className="max-w-5xl space-y-4">
      <TextArea value={input} onChange={setInput} />
      <div className="grid gap-3 sm:grid-cols-5">{Object.entries(stats).map(([label, value]) => <Panel key={label}><div className="text-xs uppercase text-zinc-500">{label}</div><div className="mt-2 text-2xl font-semibold">{value}</div></Panel>)}</div>
    </div>
  )
}

export function LoremIpsumTool() {
  const [count, setCount] = useState(80)
  const text = useMemo(() => `${Array.from({ length: count }, (_, index) => loremWords[index % loremWords.length]).join(' ')}.`, [count])
  return <div className="max-w-4xl space-y-4"><input type="range" min="10" max="500" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full" /><div className="text-sm text-zinc-500">{count} words</div><Output>{text}</Output></div>
}

export function RandomTool() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)
  const values = useMemo(() => Array.from({ length: count }, () => randomInt(min, max)).join('\n'), [min, max, count])
  return (
    <div className="max-w-3xl space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" />
        <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" />
        <input type="number" min="1" max="200" value={count} onChange={e => setCount(Math.max(1, Math.min(200, Number(e.target.value))))} className="rounded-2xl border border-zinc-300 px-4 py-3" />
      </div>
      <Output>{values}</Output>
    </div>
  )
}

export function SlugifyTool() {
  const [input, setInput] = useState('Lyra Chef Developer Toolkit')
  const slug = useMemo(() => input.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{slug}</Output></div>
}

export function DuplicateLinesTool() {
  const [input, setInput] = useState('alpha\nbeta\nalpha\ngamma\nbeta')
  const output = useMemo(() => [...new Set(input.split('\n'))].join('\n'), [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function LineWrapTool() {
  const [input, setInput] = useState(sampleText.repeat(3))
  const [width, setWidth] = useState(72)
  const output = useMemo(() => {
    const words = input.split(/\s+/)
    const lines = []
    let line = ''
    words.forEach(word => {
      if ((line + ' ' + word).trim().length > width) {
        lines.push(line)
        line = word
      } else {
        line = `${line} ${word}`.trim()
      }
    })
    if (line) lines.push(line)
    return lines.join('\n')
  }, [input, width])
  return <div className="max-w-5xl space-y-4"><input type="number" value={width} onChange={e => setWidth(Number(e.target.value) || 72)} className="rounded-2xl border border-zinc-300 px-4 py-3" /><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function UrlValidatorTool() {
  const [input, setInput] = useState('https://lyra-alishaikh.github.io/lyra-chef/')
  const result = useMemo(() => {
    try {
      const url = new URL(input)
      return `Valid URL\nProtocol: ${url.protocol}\nHost: ${url.host}\nPath: ${url.pathname}`
    } catch {
      return 'Invalid URL'
    }
  }, [input])
  return <div className="max-w-4xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{result}</Output></div>
}

export function IpValidatorTool() {
  const [input, setInput] = useState('192.168.1.1')
  const result = useMemo(() => {
    const ipv4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(input)
    const ipv6 = /^(([0-9a-f]{1,4}:){2,7}[0-9a-f]{1,4}|::1|::)$/i.test(input)
    return ipv4 ? 'Valid IPv4 address' : ipv6 ? 'Valid IPv6 address' : 'Invalid IP address'
  }, [input])
  return <div className="max-w-3xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{result}</Output></div>
}

export function EmailNormalizerTool() {
  const [input, setInput] = useState('  Lyra.Example+tools@Gmail.com  ')
  const output = useMemo(() => input.trim().toLowerCase().replace(/@googlemail\.com$/, '@gmail.com'), [input])
  return <div className="max-w-3xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3" /><Output>{output}</Output></div>
}

export function UnicodeInspectorTool() {
  const [input, setInput] = useState('Lyra')
  const output = useMemo(() => [...input].map(char => `${char}  U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join('\n'), [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function BinaryTextTool() {
  const [input, setInput] = useState('Lyra')
  const [mode, setMode] = useState('encode')
  const output = useMemo(() => {
    try {
      return mode === 'encode'
        ? [...input].map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
        : input.split(/\s+/).filter(Boolean).map(bin => String.fromCharCode(parseInt(bin, 2))).join('')
    } catch {
      return 'Invalid binary input.'
    }
  }, [input, mode])
  return <div className="max-w-4xl space-y-4"><select value={mode} onChange={e => setMode(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3"><option value="encode">Text to binary</option><option value="decode">Binary to text</option></select><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function HexTextTool() {
  const [input, setInput] = useState('Lyra')
  const [mode, setMode] = useState('encode')
  const output = useMemo(() => {
    try {
      return mode === 'encode'
        ? [...input].map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
        : input.replace(/\s+/g, '').match(/.{1,2}/g)?.map(hex => String.fromCharCode(parseInt(hex, 16))).join('') ?? ''
    } catch {
      return 'Invalid hex input.'
    }
  }, [input, mode])
  return <div className="max-w-4xl space-y-4"><select value={mode} onChange={e => setMode(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3"><option value="encode">Text to hex</option><option value="decode">Hex to text</option></select><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function NumberBaseTool() {
  const [input, setInput] = useState('255')
  const number = Number(input)
  const output = Number.isFinite(number) ? `Decimal: ${number}\nBinary: ${number.toString(2)}\nOctal: ${number.toString(8)}\nHex: ${number.toString(16).toUpperCase()}` : 'Enter a valid number.'
  return <div className="max-w-3xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

export function UnitConverterTool() {
  const [value, setValue] = useState(1)
  const [unit, setUnit] = useState('km')
  const meters = unit === 'km' ? value * 1000 : unit === 'mi' ? value * 1609.344 : unit === 'ft' ? value * 0.3048 : value
  const output = `Meters: ${meters}\nKilometers: ${meters / 1000}\nMiles: ${meters / 1609.344}\nFeet: ${meters / 0.3048}`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-[1fr_140px]"><input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /><select value={unit} onChange={e => setUnit(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3"><option value="m">m</option><option value="km">km</option><option value="mi">mi</option><option value="ft">ft</option></select></div><Output>{output}</Output></div>
}

export function PercentageTool() {
  const [value, setValue] = useState(20)
  const [total, setTotal] = useState(200)
  const output = `${value} is ${(value / total * 100).toFixed(2)}% of ${total}\n${value}% of ${total} is ${(value / 100 * total).toFixed(2)}\nIncrease ${total} by ${value}%: ${(total * (1 + value / 100)).toFixed(2)}`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /><input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /></div><Output>{output}</Output></div>
}

export function DateCalculatorTool() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [days, setDays] = useState(30)
  const result = useMemo(() => {
    const base = new Date(`${date}T00:00:00`)
    const next = new Date(base)
    next.setDate(next.getDate() + Number(days))
    return `Start: ${base.toDateString()}\nAfter ${days} days: ${next.toDateString()}\nDifference from today: ${Math.round((base - new Date()) / 86400000)} days`
  }, [date, days])
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3" /><input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /></div><Output>{result}</Output></div>
}

export function CronExplainerTool() {
  const [input, setInput] = useState('0 9 * * 1-5')
  const output = useMemo(() => {
    const [min, hour, dom, month, dow] = input.trim().split(/\s+/)
    if (!dow) return 'Enter five cron fields: minute hour day month weekday.'
    return `Minute: ${min}\nHour: ${hour}\nDay of month: ${dom}\nMonth: ${month}\nDay of week: ${dow}`
  }, [input])
  return <div className="max-w-3xl space-y-4"><input value={input} onChange={e => setInput(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

const httpStatuses = { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Content', 429: 'Too Many Requests', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable' }

export function HttpStatusTool() {
  const [query, setQuery] = useState('404')
  const output = useMemo(() => Object.entries(httpStatuses).filter(([code, text]) => `${code} ${text}`.toLowerCase().includes(query.toLowerCase())).map(([code, text]) => `${code} - ${text}`).join('\n') || 'No match.', [query])
  return <div className="max-w-3xl space-y-4"><input value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3" /><Output>{output}</Output></div>
}

const mimeTypes = { json: 'application/json', html: 'text/html', css: 'text/css', js: 'text/javascript', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', pdf: 'application/pdf', csv: 'text/csv', txt: 'text/plain', wasm: 'application/wasm' }

export function MimeTypeTool() {
  const [query, setQuery] = useState('svg')
  const output = useMemo(() => Object.entries(mimeTypes).filter(([ext, mime]) => `${ext} ${mime}`.includes(query.toLowerCase())).map(([ext, mime]) => `.${ext}  ${mime}`).join('\n') || 'No match.', [query])
  return <div className="max-w-3xl space-y-4"><input value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3" /><Output>{output}</Output></div>
}

export function UserAgentTool() {
  const [input, setInput] = useState(navigator.userAgent)
  const output = useMemo(() => `Length: ${input.length}\nMobile: ${/mobile|android|iphone/i.test(input) ? 'Yes' : 'No'}\nBrowser hints: ${['Chrome', 'Firefox', 'Safari', 'Edge'].filter(name => input.includes(name)).join(', ') || 'Unknown'}`, [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function HtmlStripTool() {
  const [input, setInput] = useState('<p>Hello <strong>Lyra</strong></p>')
  const output = useMemo(() => new DOMParser().parseFromString(input, 'text/html').body.textContent || '', [input])
  return <div className="max-w-4xl space-y-4"><TextArea value={input} onChange={setInput} /><Output>{output}</Output></div>
}

export function BasicAuthTool() {
  const [user, setUser] = useState('lyra')
  const [pass, setPass] = useState('secret')
  const output = `Authorization: Basic ${btoa(`${user}:${pass}`)}`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input value={user} onChange={e => setUser(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3" /><input value={pass} onChange={e => setPass(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3" /></div><Output>{output}</Output></div>
}

export function NanoIdTool() {
  const [length, setLength] = useState(21)
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'
  const output = useMemo(() => Array.from({ length: 10 }, () => Array.from({ length }, () => alphabet[randomInt(0, alphabet.length - 1)]).join('')).join('\n'), [length])
  return <div className="max-w-3xl space-y-4"><input type="range" min="6" max="64" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full" /><div className="text-sm text-zinc-500">{length} characters</div><Output>{output}</Output></div>
}

export function DiceRollerTool() {
  const [dice, setDice] = useState('2d6')
  const output = useMemo(() => {
    const match = dice.match(/^(\d+)d(\d+)$/i)
    if (!match) return 'Use NdS format, like 2d6.'
    const rolls = Array.from({ length: Number(match[1]) }, () => randomInt(1, Number(match[2])))
    return `Rolls: ${rolls.join(', ')}\nTotal: ${rolls.reduce((sum, item) => sum + item, 0)}`
  }, [dice])
  return <div className="max-w-3xl space-y-4"><input value={dice} onChange={e => setDice(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

export function SemverTool() {
  const [version, setVersion] = useState('1.4.9')
  const output = useMemo(() => {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)(.*)$/)
    if (!match) return 'Enter semantic version like 1.2.3.'
    const [, major, minor, patch, suffix] = match
    return `Major: ${major}\nMinor: ${minor}\nPatch: ${patch}\nPrerelease/build: ${suffix || 'none'}\nNext patch: ${major}.${minor}.${Number(patch) + 1}\nNext minor: ${major}.${Number(minor) + 1}.0\nNext major: ${Number(major) + 1}.0.0`
  }, [version])
  return <div className="max-w-3xl space-y-4"><input value={version} onChange={e => setVersion(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono text-sm" /><Output>{output}</Output></div>
}

export function ContrastCheckerTool() {
  const [fg, setFg] = useState('#111827')
  const [bg, setBg] = useState('#ffffff')
  const output = useMemo(() => {
    const a = hexToRgb(fg)
    const b = hexToRgb(bg)
    if (!a || !b) return 'Enter valid 6-digit hex colors.'
    const ratio = (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05)
    return `Contrast ratio: ${ratio.toFixed(2)}:1\nAA normal text: ${ratio >= 4.5 ? 'Pass' : 'Fail'}\nAA large text: ${ratio >= 3 ? 'Pass' : 'Fail'}\nAAA normal text: ${ratio >= 7 ? 'Pass' : 'Fail'}`
  }, [fg, bg])
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input value={fg} onChange={e => setFg(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3 font-mono" /><input value={bg} onChange={e => setBg(e.target.value)} className="rounded-2xl border border-zinc-300 px-4 py-3 font-mono" /></div><div className="rounded-2xl border border-zinc-200 p-8 text-center text-2xl font-semibold" style={{ color: fg, backgroundColor: bg }}>Sample Text</div><Output>{output}</Output></div>
}

export function CssUnitTool() {
  const [px, setPx] = useState(16)
  const [base, setBase] = useState(16)
  const output = `${px}px\n${px / base}rem\n${px / base}em\n${(px / 16 * 100).toFixed(2)}% of 16px`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input type="number" value={px} onChange={e => setPx(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /><input type="number" value={base} onChange={e => setBase(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /></div><Output>{output}</Output></div>
}

export function ClampTool() {
  const [min, setMin] = useState(16)
  const [max, setMax] = useState(40)
  const output = `clamp(${min}px, ${(min / 16).toFixed(2)}rem + 2vw, ${max}px)`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-2"><input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /><input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" /></div><Output>{output}</Output></div>
}

export function BoxShadowTool() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(16)
  const [blur, setBlur] = useState(40)
  const output = `box-shadow: ${x}px ${y}px ${blur}px rgba(15, 23, 42, 0.18);`
  return <div className="max-w-3xl space-y-4"><div className="grid gap-3 sm:grid-cols-3">{[[x, setX], [y, setY], [blur, setBlur]].map(([value, setValue], index) => <input key={index} type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="rounded-2xl border border-zinc-300 px-4 py-3" />)}</div><div className="mx-auto h-32 w-56 rounded-2xl bg-white" style={{ boxShadow: `${x}px ${y}px ${blur}px rgba(15, 23, 42, 0.18)` }} /><Output>{output}</Output></div>
}

export function BorderRadiusTool() {
  const [radius, setRadius] = useState(16)
  const output = `border-radius: ${radius}px;`
  return <div className="max-w-3xl space-y-4"><input type="range" min="0" max="80" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full" /><div className="h-36 border border-zinc-200 bg-white" style={{ borderRadius: radius }} /><Output>{output}</Output></div>
}

export function ColorPaletteTool() {
  const [base, setBase] = useState('#0f766e')
  const rgb = hexToRgb(base) || { r: 15, g: 118, b: 110 }
  const swatches = [-48, -24, 0, 24, 48].map(delta => `rgb(${Math.max(0, Math.min(255, rgb.r + delta))}, ${Math.max(0, Math.min(255, rgb.g + delta))}, ${Math.max(0, Math.min(255, rgb.b + delta))})`)
  return <div className="max-w-4xl space-y-4"><input value={base} onChange={e => setBase(e.target.value)} className="w-full rounded-2xl border border-zinc-300 px-5 py-3 font-mono" /><div className="grid grid-cols-5 overflow-hidden rounded-2xl border border-zinc-200">{swatches.map(color => <div key={color} className="h-32" style={{ background: color }} />)}</div><Output>{swatches.join('\n')}</Output></div>
}
