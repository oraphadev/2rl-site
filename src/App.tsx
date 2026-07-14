import { useLayoutEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { useMouseParallax } from './lib/useMouseParallax'
import {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  registerEases,
  prefersReducedMotion,
} from './lib/scroll'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WordMarquee } from './components/WordMarquee'
import { Manifesto } from './components/Manifesto'
import { HowWeWork } from './components/HowWeWork'
import { Problems } from './components/Problems'
import { Philosophy } from './components/Philosophy'
import { Principles } from './components/Principles'
import { FAQ } from './components/FAQ'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

/**
 * Fixed animated backdrop behind the hero (§8.8) — sections slide over it.
 * Two motion layers: a springy mouse drift (react-spring) on the wrapper and
 * a scroll-scrubbed zoom/rise (GSAP) on the image itself.
 */
function HeroBackdrop() {
  const mouse = useMouseParallax(-28, -18)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const tween = gsap.fromTo(
      imgRef.current,
      { scale: 1.12, yPercent: 0 },
      {
        scale: 1.26,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: 0.6 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-screen w-full overflow-hidden"
    >
      <animated.div style={mouse} className="absolute inset-0 will-change-transform">
        <img
          ref={imgRef}
          src="/hero-wave.jpg"
          alt=""
          className="h-full w-full scale-[1.12] object-cover object-bottom brightness-110 saturate-125 will-change-transform"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          }}
        />
      </animated.div>
      <div className="dot-matrix absolute inset-0 opacity-15" />
      <div className="noise-overlay absolute inset-0 opacity-30" />
    </div>
  )
}

export default function App() {
  useLayoutEffect(() => {
    registerEases()
    const reduced = prefersReducedMotion()

    let smoother: ScrollSmoother | undefined
    if (!reduced) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      })
    }

    let revealCtx: gsap.Context | undefined
    if (!reduced) {
      // each element owns its trigger: it animates the moment IT enters,
      // with no batch-stagger latency on long editorial rows
      revealCtx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'reveal',
            scrollTrigger: { trigger: el, start: 'top 94%', once: true },
            onComplete: () => {
              // drop the attribute so the CSS initial state stops applying,
              // then wipe inline styles left behind by the tween
              el.removeAttribute('data-reveal')
              gsap.set(el, { clearProps: 'all' })
            },
          })
        })
      })
      ScrollTrigger.refresh()
    } else {
      // reduced motion: everything visible immediately (CSS also guards this)
      gsap.set('[data-reveal]', { clearProps: 'all', opacity: 1 })
    }

    return () => {
      revealCtx?.revert()
      smoother?.kill()
    }
  }, [])

  return (
    <>
      <Header />
      <HeroBackdrop />
      <div id="smooth-wrapper" className="relative z-10">
        <div id="smooth-content">
          <main className="w-full pt-16">
            <Hero />
            <WordMarquee />
            <Manifesto />
            <HowWeWork />
            <Problems />
            <Philosophy />
            <Principles />
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
