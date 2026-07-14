import { useLayoutEffect, useRef } from 'react'
import { animate } from 'animejs'
import { animated } from '@react-spring/web'
import { useMouseParallax } from '../lib/useMouseParallax'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/scroll'
import { Beam, Cross, Meta, TechButton, ArrowDown } from './ui'

const WORD = '2RL'

function GiantWord() {
  // drifts with the cursor, opposite the backdrop, for layered depth
  const mouse = useMouseParallax(16, 10)
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      <animated.span
        style={mouse}
        className="font-display leading-none font-semibold tracking-tighter text-white/95 text-[clamp(8.5rem,42vw,24rem)] will-change-transform"
      >
        {WORD.split('').map((ch, i) => (
          <span key={i} className="hero-letter inline-block will-change-transform">
            {ch}
          </span>
        ))}
      </animated.span>
    </div>
  )
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'reveal' } })
      tl.from('.hero-letter', {
        yPercent: 40,
        opacity: 0,
        filter: 'blur(24px)',
        stagger: 0.09,
        duration: 1.3,
        delay: 0.2,
      }).from(
        '[data-hero-fade]',
        {
          y: 24,
          opacity: 0,
          filter: 'blur(10px)',
          stagger: 0.12,
          duration: 0.9,
          clearProps: 'filter',
        },
        '-=0.7',
      )
    }, root)

    const line = cue.current?.querySelector('.cue-line')
    const cueAnim = line
      ? animate(line, {
          scaleY: [{ from: 0, to: 1, duration: 900 }, { to: 0, duration: 700 }],
          transformOrigin: ['top', 'top', 'bottom'],
          loop: true,
          loopDelay: 400,
          ease: 'inOutQuad',
        })
      : null

    return () => {
      ctx.revert()
      cueAnim?.pause()
    }
  }, [])

  return (
    <div
      ref={root}
      className="relative z-20 flex h-svh max-h-[900px] min-h-[640px] w-full flex-col justify-end gap-2 md:grid md:grid-cols-4 md:gap-0"
    >
      {/* giant display word, parallaxed by ScrollSmoother */}
      {/* mobile: in-flow, centered in the free space above the copy; desktop: full-bleed center */}
      <div
        className="pointer-events-none relative z-0 min-h-0 flex-1 md:absolute md:inset-0 md:flex-none"
        data-speed="0.82"
      >
        <GiantWord />
      </div>

      {/* legibility scrim under the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />

      {/* column 1 — headline cell */}
      <div className="relative flex flex-col justify-end p-6 md:p-8">
        <Beam delay={0} className="hidden md:block" />
        <Cross className="-bottom-[9px] -right-[5px] hidden md:block" />
        <div className="relative z-10 max-w-xs">
          <Meta className="mb-4 text-[10px]">
            <span data-hero-fade="" className="block text-neutral-300">/// Consultoria especializada em IA aplicada</span>
          </Meta>
          <h1
            data-hero-fade=""
            className="text-lg leading-relaxed font-normal text-neutral-200 md:text-xl"
          >
            Impulsionamos negócios através da{' '}
            <span className="text-white">inteligência artificial</span>.
          </h1>
        </div>
      </div>

      {/* columns 2–3 — structural rules with beams */}
      <div className="relative hidden md:block">
        <Beam delay={1.5} />
      </div>
      <div className="relative hidden md:block">
        <Beam delay={3} />
      </div>

      {/* column 4 — CTA cell */}
      <div className="relative flex flex-col items-start justify-end gap-6 p-6 md:items-end md:p-8">
        <p
          data-hero-fade=""
          className="max-w-xs text-sm leading-relaxed text-neutral-300 md:text-right"
        >
          Compreendemos profundamente seu negócio para construir soluções
          inteligentes que geram impacto real.
        </p>
        <div data-hero-fade="">
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

      {/* scroll cue */}
      <div
        ref={cue}
        data-hero-fade=""
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-300 uppercase">Scroll</span>
        <span className="cue-line block h-10 w-px bg-gradient-to-b from-red-500/80 to-transparent" />
        <ArrowDown size={12} className="text-neutral-300" />
      </div>
    </div>
  )
}
