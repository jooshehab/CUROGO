'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

// ---- Variants ----
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

// ---- Components ----

type MotionDivProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

/** Animate on scroll — fade in + slide up */
export function Reveal({ children, className, variants = fadeInUp, delay = 0 }: MotionDivProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

/** Container for staggered children — pass as parent of multiple <Reveal> */
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered child — must be inside <StaggerGroup> */
export function StaggerItem({ children, className, variants = fadeInUp }: MotionDivProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

/** Animated heading on mount */
export function AnimatedHeading({ children, className, delay = 0 }: MotionDivProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <h2 className={className}>{children}</h2>
  }
  return (
    <motion.h2
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </motion.h2>
  )
}

/** Floating pulse animation for emergency buttons */
export function FloatingElement({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
