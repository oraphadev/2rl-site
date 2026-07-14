import { Cross, Meta } from './ui'

const PRINCIPLES = [
  {
    title: 'O negócio antes da tecnologia',
    body: 'Nunca iniciamos uma conversa propondo solução: primeiro o problema, depois os objetivos, só então a tecnologia.',
  },
  {
    title: 'Compreender antes de construir',
    body: 'Construir rapidamente a solução errada desperdiça tempo, dinheiro e confiança. Diagnóstico não é burocracia, é engenharia.',
  },
  {
    title: 'Resultados acima de tudo',
    body: 'Software, automação e IA não são sucesso. Resultado é sucesso. Toda iniciativa deve ter impacto claro e mensurável.',
  },
  {
    title: 'ROI acima de hype',
    body: 'Nenhuma decisão baseada em tendências. Toda tecnologia deve justificar sua existência através de retorno para o cliente.',
  },
  {
    title: 'Simplicidade vence',
    body: 'A solução ideal resolve completamente o problema com o menor nível possível de complexidade.',
  },
  {
    title: 'Honestidade constrói parcerias',
    body: 'Se uma tecnologia não for a melhor solução para você, não será recomendada, mesmo que isso reduza o escopo comercial.',
  },
]

export function Principles() {
  return (
    <section
      id="principios"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      {/* intro band */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12 md:divide-x md:divide-white/10">
        <div className="relative p-6 md:col-span-3 md:p-8 lg:p-12">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <Meta data-reveal="">/// Princípios</Meta>
        </div>
        <div className="p-6 pb-12 md:col-span-9 md:p-12 lg:p-16">
          <h2
            data-reveal=""
            className="font-display max-w-3xl text-4xl leading-[0.95] font-semibold tracking-tighter text-white md:text-6xl"
          >
            O que orienta cada decisão.
          </h2>
        </div>
      </div>

      {/* editorial rows */}
      <div className="mx-auto w-full max-w-[1920px] divide-y divide-white/10 border-t border-white/10">
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.title}
            data-reveal=""
            className="group relative grid grid-cols-1 gap-4 p-6 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:items-center md:gap-8 md:p-10 lg:px-16"
          >
            <span className="font-mono text-[10px] tracking-widest text-red-500 uppercase md:col-span-2">
              Princípio-{String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl leading-tight font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2 md:col-span-6 md:text-3xl">
              {p.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500 transition-colors duration-500 group-hover:text-neutral-400 md:col-span-4">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
