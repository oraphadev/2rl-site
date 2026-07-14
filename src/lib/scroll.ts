import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Signature reveal curve from the design system (§8). */
export function registerEases() {
  if (!CustomEase.get('reveal')) CustomEase.create('reveal', '0.2, 0.8, 0.2, 1')
  if (!CustomEase.get('spring-out')) CustomEase.create('spring-out', '0.22, 1, 0.36, 1')
}

export function scrollToId(id: string) {
  const smoother = ScrollSmoother.get()
  const target = document.querySelector(id)
  if (!target) return
  if (smoother) {
    smoother.scrollTo(target, true, 'top 63px')
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export { gsap, ScrollTrigger, ScrollSmoother }
