import { useState, useRef, useEffect } from 'react'

export default function StopwatchTool() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  const start = () => {
    if (!running) {
      const startTime = Date.now() - time
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10)
      setRunning(true)
    }
  }

  const pause = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setTime(0)
    setRunning(false)
    setLaps([])
  }

  const lap = () => {
    if (running) setLaps([...laps, time])
  }

  const format = (ms) => {
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    const msPart = Math.floor((ms % 1000) / 10)
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${msPart.toString().padStart(2,'0')}`
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div className="max-w-md">
      <div className="font-mono text-7xl tracking-tighter text-center py-8 bg-white border rounded-3xl mb-6">{format(time)}</div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {!running ? (
          <button onClick={start} className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold">Start</button>
        ) : (
          <button onClick={pause} className="py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-semibold">Pause</button>
        )}
        <button onClick={lap} disabled={!running} className="py-4 bg-white border rounded-2xl font-medium disabled:opacity-40">Lap</button>
      </div>

      <div className="flex gap-3">
        <button onClick={reset} className="flex-1 py-3 border rounded-2xl">Reset</button>
      </div>

      {laps.length > 0 && (
        <div className="mt-6 bg-white border rounded-3xl p-4 text-sm">
          {laps.slice().reverse().map((l, i) => (
            <div key={i} className="flex justify-between py-1 border-b last:border-0">
              <span>Lap {laps.length - i}</span>
              <span className="font-mono">{format(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
