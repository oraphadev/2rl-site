import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Cross, Meta, PlusIcon } from './ui'

const ITEMS = [
  {
    q: 'O que a 2RL faz?',
    a: 'Ajudamos empresas a evoluírem através da IA: compreensão profunda do negócio, diagnóstico estratégico, definição de prioridades e implementação de soluções personalizadas. Não vendemos tecnologia, resolvemos problemas.',
  },
  {
    q: 'A 2RL vende projetos de IA?',
    a: 'Não. Vendemos soluções. Algumas usam IA intensivamente, outras parcialmente, outras podem nem usar IA se existir alternativa mais adequada.',
  },
  {
    q: 'A 2RL possui soluções prontas?',
    a: 'Não. Toda solução é construída após diagnóstico; problemas semelhantes podem resultar em soluções diferentes.',
  },
  {
    q: 'O diagnóstico é obrigatório?',
    a: 'Na filosofia da 2RL, sim. Sem compreensão adequada, recomendações tornam-se especulação.',
  },
  {
    q: 'A 2RL realiza apenas consultoria?',
    a: 'Não. Sempre que fizer sentido, também executamos a implementação. Preferimos acompanhar toda a jornada, da estratégia à entrega.',
  },
  {
    q: 'A 2RL atende apenas empresas de tecnologia?',
    a: 'Não. A metodologia é independente de segmento; tecnologia é apenas o foco inicial de comunicação.',
  },
  {
    q: 'Como a 2RL mede sucesso?',
    a: 'Pelo impacto gerado. Tecnologia entregue não é sucesso; resultados percebidos são.',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12">
        {/* sidebar */}
        <div className="relative border-b border-white/10 p-6 md:col-span-4 md:border-b-0 md:p-8 lg:p-12">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <Meta data-reveal="" className="mb-4">
            /// FAQ
          </Meta>
          <h2
            data-reveal=""
            className="font-display mb-4 text-3xl font-medium tracking-tight text-white md:text-4xl"
          >
            Perguntas frequentes
          </h2>
          <p data-reveal="" className="max-w-sm text-sm leading-relaxed text-neutral-400">
            O essencial sobre como pensamos e trabalhamos. Se a sua dúvida não
            estiver aqui, fale diretamente conosco.
          </p>
        </div>

        {/* accordion */}
        <div className="md:col-span-8 md:border-l md:border-white/10">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} data-reveal="" className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full cursor-pointer items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-white/[0.015] md:px-10 md:py-7"
                >
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isOpen ? 'text-red-500' : 'text-neutral-500 group-hover:text-red-500/60'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-base font-medium tracking-tight transition-colors duration-300 md:text-lg ${
                        isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-red-500' : 'text-neutral-500'
                    }`}
                  >
                    <PlusIcon size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[65ch] px-6 pb-7 pl-6 text-sm leading-relaxed text-neutral-400 md:px-10 md:pl-[4.5rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
