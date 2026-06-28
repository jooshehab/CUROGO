'use client'

import { useEffect, useState, useCallback } from 'react'

/**
 * Hash-based routing hook
 * URL format: /#/path/to/page
 * Examples: /#/services/ambulance, /#/areas/cairo/nasr-city
 */
export function useHashRoute() {
  const getInitialState = () => {
    if (typeof window === 'undefined') return { route: '/', params: [] as string[] }
    return parseHash(window.location.hash)
  }

  const initial = getInitialState()
  const [route, setRoute] = useState<string>(initial.route)
  const [params, setParams] = useState<string[]>(initial.params)

  const parse = useCallback(() => {
    if (typeof window === 'undefined') return
    const parsed = parseHash(window.location.hash)
    setRoute(parsed.route)
    setParams(parsed.params)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', parse)
    return () => window.removeEventListener('hashchange', parse)
  }, [parse])

  const navigate = useCallback((path: string) => {
    if (path === '/' || path === '') {
      // Clear hash completely
      const url = window.location.pathname + window.location.search
      window.history.replaceState(null, '', url)
      setRoute('/')
      setParams([])
    } else {
      const clean = path.startsWith('/') ? path.slice(1) : path
      // Remove any '#' that may have slipped in
      const safe = clean.replace(/^#+/, '').replace(/^\/+/, '/')
      window.location.hash = safe
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { route, params, navigate }
}

/** Parse a hash string into { route, params } */
function parseHash(rawHash: string): { route: string; params: string[] } {
  // Strip ALL leading '#' characters
  let hash = rawHash.replace(/^#+/, '')
  if (!hash) return { route: '/', params: [] }
  // Ensure leading slash
  if (!hash.startsWith('/')) hash = `/${hash}`
  // Split into segments, ignoring any remaining '#'
  const parts = hash.split('/').filter(Boolean).map(p => p.replace(/#/g, ''))
  return {
    route: parts.length ? `/${parts.join('/')}` : '/',
    params: parts,
  }
}

/** Build a hash URL like "/#/services/ambulance" from path "/services/ambulance" */
export function buildHref(path: string): string {
  if (path === '/' || path === '') return '/'
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `#/` + clean
}


