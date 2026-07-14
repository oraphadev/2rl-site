import { Fragment } from 'react'
import { GhostGrid } from './ui'

const WORDS = [
  'Estratégia',
  'Diagnóstico',
  'Impacto',
  'Resultado',
  'Evolução',
  'Eficiência',
  'Parceria',
  'Execução',
]

function Run() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <Fragment key={w}>
          <span className="font-display px-8 text-lg font-medium tracking-tight text-neutral-500 uppercase transition-colors duration-300 hover:text-white md:px-10">
            {w}
          </span>
          <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-red-600" />
        </Fragment>
      ))}
    </div>
  )
}

export function WordMarquee() {
  return (
    <section
      aria-label="Palavras-chave da atuação"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      <GhostGrid />
      <div className="relative py-10">
        {/* edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-neutral-950 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-neutral-950 to-transparent md:w-32" />
        <div className="animate-marquee-infinite flex w-max">
          <Run />
          <Run />
        </div>
      </div>
    </section>
  )
}
