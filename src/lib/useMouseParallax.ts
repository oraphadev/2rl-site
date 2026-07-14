import { useEffect } from 'react'
import { useSpring } from '@react-spring/web'

/**
 * Springy viewport-relative mouse parallax. Positive factors follow the
 * cursor, negative ones drift against it — pair opposite signs on stacked
 * layers to create depth. Inert on touch devices and under reduced motion.
 */
export function useMouseParallax(fx: number, fy: number) {
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 2, tension: 80, friction: 26 },
  }))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      api.start({ x: nx * fx, y: ny * fy })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [api, fx, fy])

  return spring
}
