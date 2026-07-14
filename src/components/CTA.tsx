import { useLayoutEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { useMouseParallax } from '../lib/useMouseParallax'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { Meta, TechButton } from './ui'

export function CTA() {
  const section = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // same layered motion as the hero backdrop: springy mouse drift + scroll zoom
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
          trigger: section.current,
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
    <section
      ref={section}
      id="contato"
      className="relative z-20 flex w-full items-center justify-center overflow-hidden border-t border-white/10 bg-neutral-950 pt-32 pb-32 md:py-48"
    >
      {/* ultra-HD data-wave backdrop, tone-matched to the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <animated.div style={mouse} className="absolute inset-0 will-change-transform">
          <img
            ref={imgRef}
            src="/cta-wave.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.12] object-cover object-bottom brightness-110 saturate-125 will-change-transform"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            }}
          />
        </animated.div>
        {/* legibility scrim — strongest where the copy and button sit */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950/30" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Meta data-reveal="" className="mb-8 text-center">
          <span className="text-neutral-300">/// Próximo passo</span>
        </Meta>
        <h2
          data-reveal=""
          className="font-display mb-6 max-w-5xl text-4xl leading-[0.95] font-semibold tracking-tighter text-white md:text-6xl lg:text-8xl"
        >
          Vamos conversar sobre o seu negócio?
        </h2>
        <p
          data-reveal=""
          className="mb-12 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg"
        >
          Toda relação começa pelo problema, nunca pela tecnologia. Conte-nos o
          contexto do seu negócio e descubra o que faz sentido construir.
        </p>
        <div data-reveal="">
          <TechButton label="Fale conosco" size="lg" href="mailto:contato@2rl.com.br" />
        </div>
      </div>
    </section>
  )
}
