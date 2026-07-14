import { useLayoutEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { useMouseParallax } from '../lib/useMouseParallax'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { Cross, Meta } from './ui'

export function Philosophy() {
  const exhibit = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // same layered motion as the hero/CTA backdrops: springy mouse drift + scroll zoom
  const mouse = useMouseParallax(-28, -18)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const tween = gsap.fromTo(
      imgRef.current,
      { scale: 1.12, yPercent: 0 },
      {
        scale: 1.26,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: exhibit.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-neutral-950">
      {/* ambient glow orb (§8.9) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-start">
        <div className="h-[36vw] w-[36vw] rounded-full bg-red-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 md:grid-cols-12 md:divide-x md:divide-white/10">
        {/* statement */}
        <div className="relative flex flex-col justify-between p-6 py-20 md:col-span-7 md:p-12 md:py-28 lg:p-16">
          <Cross className="-right-[5px] -top-[5px] hidden md:block" />
          <div>
            <Meta data-reveal="" className="mb-10">
              /// Nossa filosofia
            </Meta>
            <h2
              data-reveal=""
              className="font-display mb-10 text-4xl leading-[0.95] font-semibold tracking-tighter text-white md:text-6xl lg:text-7xl"
            >
              Nós pensamos.
              <br />
              A IA torna <span className="text-red-500">real</span>.
            </h2>
            <blockquote
              data-reveal=""
              className="font-display max-w-md text-xl leading-tight font-light tracking-tight text-neutral-300 md:text-2xl"
            >
              “Empresas não contratam Inteligência Artificial. Empresas contratam
              evolução. A IA apenas a tornou mais rápida.”
            </blockquote>
          </div>
          <div data-reveal="" className="mt-16 flex items-center gap-4 border-t border-white/5 pt-6">
            <span className="font-mono text-xs text-red-500">02 // Tese</span>
            <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
              Evolução &gt; tecnologia
            </span>
          </div>
        </div>

        {/* exhibit — generated neural wireframe */}
        <div
          ref={exhibit}
          className="relative min-h-[420px] overflow-hidden md:col-span-5 md:min-h-[560px]"
        >
          <animated.div style={mouse} className="absolute inset-0 will-change-transform">
            <img
              ref={imgRef}
              src="/neural-brain.webp"
              alt="Ilustração técnica de um cérebro em wireframe com trajetos neurais destacados em vermelho"
              className="h-full w-full scale-[1.12] object-cover will-change-transform"
              loading="lazy"
              decoding="async"
            />
          </animated.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40" />
          <Cross className="-left-[5px] -top-[5px] hidden md:block" />
        </div>
      </div>
    </section>
  )
}
