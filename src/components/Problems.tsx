import { Beam, Cross, Meta, TechButton, ArrowUpRight } from './ui'
import { scrollToId } from '../lib/scroll'

const PROBLEMS = [
  'Processos excessivamente manuais e baixa produtividade',
  'Equipes sobrecarregadas com atividades repetitivas',
  'Custos operacionais elevados',
  'Ausência de estratégia para adoção de IA',
  'Dificuldade para priorizar iniciativas tecnológicas',
  'Dificuldade em escalar operações',
]

export function Problems() {
  return (
    <section
      id="o-que-resolvemos"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12">
        {/* sidebar */}
        <div className="relative flex flex-col justify-between border-b border-white/10 p-6 md:col-span-4 md:border-b-0 md:p-8 lg:p-12">
          <Beam delay={2} className="hidden md:block" />
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <div>
            <Meta data-reveal="" className="mb-4">
              /// O que resolvemos
            </Meta>
            <h2
              data-reveal=""
              className="font-display mb-4 text-3xl leading-[1.05] font-medium tracking-tight text-white md:text-4xl"
            >
              Resolvemos problemas de negócio. Não problemas tecnológicos.
            </h2>
            <p data-reveal="" className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-400">
              Estes são sintomas frequentes. Nosso trabalho é compreender as
              causas. Só então definimos a solução.
            </p>
          </div>
          <div data-reveal="" className="mt-8 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <span className="font-display text-2xl text-white">06</span>
              <span className="font-mono text-[9px] leading-tight tracking-widest text-neutral-400 uppercase">
                Sintomas
                <br />
                mapeados
              </span>
            </div>
            <TechButton
              label="Fale conosco"
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('#contato')
              }}
            />
          </div>
        </div>

        {/* numbered rows */}
        <div className="md:col-span-8 md:border-l md:border-white/10">
          {PROBLEMS.map((p, i) => (
            <div
              key={p}
              data-reveal=""
              className="group grid grid-cols-[72px_1fr_auto] items-center border-b border-white/10 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.015] md:grid-cols-[120px_1fr_auto]"
            >
              <div className="flex h-full items-center justify-center border-r border-white/10 p-6 md:p-8">
                <span className="font-mono text-xs text-neutral-500 transition-colors duration-300 group-hover:text-red-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="p-6 text-base font-medium tracking-tight text-neutral-300 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:p-8 md:text-xl">
                {p}
              </h3>
              <div className="pr-6 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-2 md:pr-8">
                <ArrowUpRight size={18} className="text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
