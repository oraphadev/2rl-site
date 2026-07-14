import { useEffect, useRef, type ReactNode } from 'react'
import { animate, stagger } from 'animejs'

function MockFrame({
  tag,
  children,
}: {
  tag: string
  children: ReactNode
}) {
  return (
    <div className="relative mb-8 h-56 overflow-hidden rounded-md border border-white/10 bg-[#0A0A0B]">
      {children}
      <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-400">
        {tag}
      </span>
    </div>
  )
}

/* 01 — Compreender: radar scan over a blueprint field */
export function ScanMock() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const blips = ref.current?.querySelectorAll('.blip')
    if (!blips?.length) return
    const anim = animate(blips, {
      opacity: [
        { to: 1, duration: 500 },
        { to: 0, duration: 1600 },
      ],
      scale: [
        { from: 0.4, to: 1.3, duration: 2100 },
      ],
      delay: stagger(900),
      loop: true,
      ease: 'outQuad',
    })
    return () => {
      anim.pause()
    }
  }, [])

  return (
    <MockFrame tag="Scan">
      <div ref={ref} className="absolute inset-0" aria-hidden="true">
        <div className="dot-matrix absolute inset-0 opacity-40" />
        {/* concentric rings */}
        {[70, 120, 170].map((d) => (
          <div
            key={d}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: d, height: d }}
          />
        ))}
        {/* axes */}
        <div className="absolute left-1/2 top-1/2 h-44 w-px -translate-x-1/2 -translate-y-1/2 bg-white/5" />
        <div className="absolute left-1/2 top-1/2 h-px w-44 -translate-x-1/2 -translate-y-1/2 bg-white/5" />
        {/* rotating sweep */}
        <div
          className="animate-radar-sweep absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(239,68,68,0.28), transparent 70deg, transparent 360deg)',
          }}
        />
        {/* detected blips */}
        <span className="blip absolute left-[38%] top-[32%] h-1.5 w-1.5 rounded-full bg-red-500 opacity-0" />
        <span className="blip absolute left-[62%] top-[58%] h-1.5 w-1.5 rounded-full bg-red-500 opacity-0" />
        <span className="blip absolute left-[48%] top-[68%] h-1 w-1 rounded-full bg-red-400 opacity-0" />
        <span className="blip absolute left-[66%] top-[36%] h-1 w-1 rounded-full bg-red-400 opacity-0" />
        <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
          Mapeando contexto…
        </span>
      </div>
    </MockFrame>
  )
}

/* 02 — Diagnosticar: bar chart with priority bar in accent */
export function DiagnoseMock() {
  const bars = [34, 58, 42, 88, 51, 66, 29]
  return (
    <MockFrame tag="Diag">
      <div className="absolute inset-0 p-5" aria-hidden="true">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
            Impacto × Esforço
          </span>
        </div>
        <div className="relative flex h-32 items-end gap-2.5 border-b border-l border-white/10 pb-px pl-px">
          {/* threshold line */}
          <div className="absolute left-0 right-0 top-[28%] border-t border-dashed border-red-500/30" />
          {bars.map((h, i) => (
            <div
              key={i}
              className={`animate-bar-reveal w-full ${
                h === 88 ? 'bg-red-500/80' : 'bg-neutral-800'
              }`}
              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[9px] text-neutral-500">
          <span>P-01</span>
          <span className="text-red-500/70">P-04 // prioridade</span>
          <span>P-07</span>
        </div>
      </div>
    </MockFrame>
  )
}

/* 03 — Construir: code editor with looping typed lines */
export function BuildMock() {
  const lines = [
    { cls: 'line-1', content: <><span className="text-neutral-500">const</span> <span className="text-neutral-200">problema</span> <span className="text-neutral-400">=</span> <span className="text-red-400">compreender</span><span className="text-neutral-500">(negocio)</span></> },
    { cls: 'line-2', content: <><span className="text-neutral-500">const</span> <span className="text-neutral-200">plano</span> <span className="text-neutral-400">=</span> <span className="text-red-400">diagnosticar</span><span className="text-neutral-500">(problema)</span></> },
    { cls: 'line-3', content: <><span className="text-neutral-500">const</span> <span className="text-neutral-200">solucao</span> <span className="text-neutral-400">=</span> <span className="text-red-400">construir</span><span className="text-neutral-500">(plano)</span></> },
    { cls: 'line-4', content: <><span className="text-red-400">medir</span><span className="text-neutral-500">(solucao.</span><span className="text-neutral-200">impacto</span><span className="text-neutral-500">)</span></> },
    { cls: 'line-5', content: <><span className="text-neutral-400">// resultado &gt; hype</span></> },
  ]
  return (
    <MockFrame tag="Build">
      <div className="absolute inset-0 flex flex-col" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-neutral-800" />
          <span className="h-2 w-2 rounded-full bg-neutral-800" />
          <span className="h-2 w-2 rounded-full bg-red-500/40" />
          <span className="ml-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
            solucao.ts
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 px-4 font-mono text-[11px] leading-relaxed">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-3 shrink-0 text-right text-neutral-500">{i + 1}</span>
              <span className={`typing-line ${l.cls}`}>{l.content}</span>
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

/* 04 — Evoluir: settings panel with toggles switching themselves on */
export function EvolveMock() {
  const rows = [
    { label: 'Automação de processos', d: '0s' },
    { label: 'Métricas de impacto', d: '4s' },
    { label: 'Evolução contínua', d: '8s' },
  ]
  return (
    <MockFrame tag="Evolve">
      <div className="absolute inset-0 flex flex-col justify-center gap-1 px-4" aria-hidden="true">
        <span className="mb-2 px-2 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
          Operação // parceria contínua
        </span>
        {rows.map((r) => (
          <div
            key={r.label}
            className="toggle-row flex items-center justify-between rounded-[1px] px-2 py-3"
            style={{ '--d': r.d } as React.CSSProperties}
          >
            <span className="toggle-label text-xs text-neutral-400" style={{ '--d': r.d } as React.CSSProperties}>
              {r.label}
            </span>
            <span
              className="toggle-track relative h-4.5 w-8 rounded-full border border-white/10 bg-neutral-900"
              style={{ '--d': r.d } as React.CSSProperties}
            >
              <span
                className="toggle-knob absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-neutral-500"
                style={{ '--d': r.d } as React.CSSProperties}
              />
            </span>
          </div>
        ))}
      </div>
    </MockFrame>
  )
}
