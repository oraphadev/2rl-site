import { useRef, type ReactNode, type MouseEvent, type HTMLAttributes } from 'react'
import { useSpring, animated } from '@react-spring/web'

/* ---------- thin-line icons (1.5px stroke, per §6) ---------- */

type IconProps = { size?: number; className?: string }

export function ArrowUpRight({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function ArrowDown({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  )
}

export function PlusIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function MenuIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

/* ---------- blueprint ornaments (§5.2) ---------- */

export function Cross({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 text-xs text-white/30 select-none ${className}`}
    >
      +
    </span>
  )
}

/** Ghost 4-column grid overlay so vertical rules continue through free-form sections. */
export function GhostGrid({ crosses = true }: { crosses?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full grid-cols-4 md:grid"
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative h-full border-r border-white/10">
          {crosses && <Cross className="-right-[5px] -top-[5px]" />}
        </div>
      ))}
      <div className="relative h-full" />
    </div>
  )
}

/** 1px column rule hosting a falling accent beam (§8.2). */
export function Beam({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute right-0 top-0 h-full w-px overflow-hidden bg-white/10 ${className}`}
    >
      <div
        className="animate-beam absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-75"
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  )
}

/* ---------- section meta label ---------- */

export function Meta({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`block font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

/* ---------- signature tech button (§7.2) with magnetic physics ---------- */

type TechButtonProps = {
  label: string
  href?: string
  size?: 'sm' | 'lg'
  onClick?: (e: MouseEvent) => void
}

export function TechButton({ label, href, size = 'sm', onClick }: TechButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 320, friction: 18 },
  }))

  const onMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    api.start({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
    })
  }
  const onMouseLeave = () => api.start({ x: 0, y: 0 })

  const inner = (
    <animated.div
      ref={ref}
      style={spring}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative w-max cursor-pointer"
    >
      <div
        className={`relative flex items-center gap-3 overflow-hidden rounded-sm border border-white/15 bg-neutral-900/80 text-neutral-200 shadow-lg shadow-red-500/5 transition-colors duration-300 group-hover:border-red-500/40 group-hover:bg-neutral-900 group-hover:text-white ${
          size === 'lg' ? 'px-8 py-4' : 'px-6 py-3'
        }`}
      >
        {/* accent underline sweep */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-red-500 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
        <span className={`font-medium tracking-[0.2em] uppercase ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          {label}
        </span>
        <ArrowUpRight
          size={size === 'lg' ? 18 : 16}
          className="text-red-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </animated.div>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block w-max focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className="block w-max cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
      {inner}
    </button>
  )
}
