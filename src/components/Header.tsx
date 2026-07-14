import { useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToId } from '../lib/scroll'
import { MenuIcon, CloseIcon } from './ui'

const LINKS = [
  { label: 'Como atuamos', href: '#como-atuamos' },
  { label: 'Princípios', href: '#principios' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  const go = (e: MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header className="fixed left-0 top-0 z-50 h-16 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-6 md:px-8">
        <a
          href="/"
          className="group flex items-baseline gap-2"
          aria-label="2RL — página inicial"
        >
          <span className="font-display text-sm font-medium tracking-widest text-white uppercase transition-colors group-hover:text-red-500">
            2RL
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          onClick={(e) => go(e, '#contato')}
          className="hidden rounded-sm bg-white px-6 py-2.5 text-[10px] font-bold tracking-widest text-black uppercase transition-colors hover:bg-neutral-200 md:flex"
        >
          Fale conosco
        </a>

        <button
          type="button"
          className="relative z-50 cursor-pointer p-2 text-neutral-300 transition-colors hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute right-4 top-full mt-3 w-56 rounded-lg border border-white/10 bg-neutral-900 p-2 shadow-2xl md:hidden"
            >
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="block rounded px-4 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => go(e, '#contato')}
                className="mt-2 block rounded bg-white px-4 py-2.5 text-center text-[10px] font-bold tracking-widest text-black uppercase"
              >
                Fale conosco
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
