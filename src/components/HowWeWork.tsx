import type { ReactNode } from 'react'
import { Cross, Meta } from './ui'
import { ScanMock, DiagnoseMock, BuildMock, EvolveMock } from './mocks'

type Step = {
  index: string
  title: string
  body: string
  mock: ReactNode
}

const STEPS: Step[] = [
  {
    index: '01',
    title: 'Compreender',
    body: 'Entendemos profundamente o seu negócio: processos, pessoas, objetivos e restrições. Sem entendimento profundo, não existe recomendação técnica.',
    mock: <ScanMock />,
  },
  {
    index: '02',
    title: 'Diagnosticar',
    body: 'Transformamos conhecimento em clareza: identificamos gargalos, priorizamos oportunidades, avaliamos riscos e estimamos impacto.',
    mock: <DiagnoseMock />,
  },
  {
    index: '03',
    title: 'Construir',
    body: 'Projetamos e implementamos soluções personalizadas. Toda tecnologia utilizada possui justificativa explícita, nunca tendências.',
    mock: <BuildMock />,
  },
  {
    index: '04',
    title: 'Evoluir',
    body: 'Acompanhamos a evolução do seu negócio após a implementação. O objetivo não é concluir um projeto; é construir parceria de longo prazo.',
    mock: <EvolveMock />,
  },
]

export function HowWeWork() {
  return (
    <section
      id="como-atuamos"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      {/* intro band */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12 md:divide-x md:divide-white/10">
        <div className="relative p-6 md:col-span-3 md:p-8 lg:p-12">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <Meta data-reveal="">/// Como atuamos</Meta>
        </div>
        <div className="p-6 pb-16 md:col-span-9 md:p-12 lg:p-16">
          <h2
            data-reveal=""
            className="font-display mb-6 max-w-3xl text-4xl leading-[0.95] font-semibold tracking-tighter text-white md:text-6xl"
          >
            Estratégia antes de tecnologia.
          </h2>
          <p data-reveal="" className="max-w-lg text-lg leading-relaxed font-normal text-neutral-300">
            Todo relacionamento começa pela compreensão do problema. A
            implementação é consequência, nunca o ponto de partida.
          </p>
        </div>
      </div>

      {/* 4-column step grid */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 border-t border-white/10 md:grid-cols-2 md:divide-x md:divide-white/10 xl:grid-cols-4">
        {STEPS.map((s) => (
          <article key={s.index} data-reveal="" className="group relative flex flex-col border-b border-white/10 p-6 md:p-8 xl:border-b-0">
            <Cross className="-right-[5px] -top-[5px] hidden xl:block" />
            {s.mock}
            <span className="mb-3 block font-mono text-xs text-red-500">{s.index}</span>
            <h3 className="mb-3 text-xl font-medium tracking-widest text-white uppercase">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
