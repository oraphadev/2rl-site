import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll'
import { Cross, Meta } from './ui'

const LINES = [
  'O mercado evolui em velocidade crescente. Novas tecnologias surgem constantemente e processos tornam-se obsoletos.',
  'A maioria das empresas sabe que precisa evoluir. Poucas sabem exatamente como.',
  'Existe excesso de informação técnica e escassez de direcionamento estratégico.',
]

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.manifesto-line').forEach((line) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0.14, filter: 'blur(3px)' },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 82%',
              end: 'top 48%',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section
      ref={root}
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12 md:divide-x md:divide-white/10">
        <div className="relative flex flex-col justify-between p-6 md:col-span-3 md:p-8 lg:p-12">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <div>
            <Meta className="mb-4">/// Contexto</Meta>
            <span className="font-mono text-xs text-red-500">01 // O problema</span>
          </div>
          <span className="mt-16 hidden font-mono text-[9px] leading-tight tracking-widest text-neutral-500 uppercase md:block">
            Excesso de ruído.
            <br />
            Escassez de direção.
          </span>
        </div>

        <div className="flex flex-col gap-12 p-6 py-20 md:col-span-9 md:p-12 md:py-28 lg:p-16 lg:py-32">
          {LINES.map((l) => (
            <p
              key={l}
              className="manifesto-line font-display max-w-4xl text-2xl leading-[1.15] font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              {l}
            </p>
          ))}
          <p className="manifesto-line font-display max-w-4xl text-2xl leading-[1.15] font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
            <span aria-hidden="true" className="mr-5 mb-1 inline-block h-2 w-2 bg-red-600 align-middle" />
            A 2RL existe para preencher essa lacuna.
          </p>
        </div>
      </div>
    </section>
  )
}
