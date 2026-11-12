import LZString from 'lz-string'
import type { Project } from './types'

export function encodeProject(p: Project): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(p))
}

export function decodeProject(s: string): Project | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(s)
    if (!json) return null
    return JSON.parse(json) as Project
  } catch {
    return null
  }
}

export function projectFromHash(hash: string): Project | null {
  const m = hash.match(/#p=([A-Za-z0-9+\-%$()*.]+)/)
  if (!m) return null
  return decodeProject(m[1])
}

export function shareUrl(p: Project): string {
  const base = window.location.origin + window.location.pathname
  return `${base}#p=${encodeProject(p)}`
}
