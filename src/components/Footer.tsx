import type { MouseEvent } from 'react'
import { Cross, TechButton } from './ui'
import { scrollToId } from '../lib/scroll'

const EXPLORE = [
  { label: 'Como atuamos', href: '#como-atuamos' },
  { label: 'O que resolvemos', href: '#o-que-resolvemos' },
  { label: 'Princípios', href: '#principios' },
  { label: 'FAQ', href: '#faq' },
]

export function Footer() {
  const go = (e: MouseEvent, href: string) => {
    e.preventDefault()
    scrollToId(href)
  }

  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-neutral-950">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-4 md:divide-x md:divide-white/10">
        {/* brand cell */}
        <div className="relative flex min-h-[300px] flex-col justify-between p-8">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <div>
            <span aria-hidden="true" className="mb-6 block font-mono text-xs text-neutral-500">
              ///
            </span>
            <h2 className="font-display mb-4 text-3xl font-medium tracking-tight text-white">
              2RL
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              Consultoria especializada em Inteligência Artificial aplicada.
              Impulsionamos negócios através da inteligência artificial.
            </p>
          </div>
          <div className="mt-10">
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

        {/* link columns */}
        <div className="p-8 md:col-span-2">
          <h3 className="mb-6 text-sm font-medium tracking-widest text-white uppercase">
            Explorar
          </h3>
          <ul className="space-y-4">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="text-sm text-neutral-500 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between p-8">
          <div>
            <h3 className="mb-6 text-sm font-medium tracking-widest text-white uppercase">
              Contato
            </h3>
            <a
              href="mailto:contato@2rl.com.br"
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              contato@2rl.com.br
            </a>
          </div>
          <div className="mt-12 space-y-3">
            <p className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
              Nós pensamos. A IA torna real.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
              © 2026 2RL. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
