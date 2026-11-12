import type { InputRow, MonitorMix, VenueItem } from './types'

export interface AuditLine {
  id: string
  name: string
  category: VenueItem['category']
  need: number
  have: number
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, ' ').trim()

export function findVenueItem(venue: VenueItem[], name: string): VenueItem | undefined {
  const n = norm(name)
  if (!n) return undefined
  return (
    venue.find((v) => norm(v.name) === n) ||
    venue.find((v) => n.includes(norm(v.name)) || norm(v.name).includes(n))
  )
}

const STAND_NEED: Record<string, string> = {
  boom: 'Стойка журавль',
  short: 'Стойка низкая',
  straight: 'Стойка прямая',
  clip: 'Клипса барабанная',
}

export function buildAudit(
  venue: VenueItem[],
  inputRows: InputRow[],
  mixes: MonitorMix[],
): AuditLine[] {
  const needMap = new Map<string, { name: string; category: VenueItem['category']; need: number }>()
  const bump = (name: string, category: VenueItem['category']) => {
    const key = norm(name)
    const cur = needMap.get(key)
    if (cur) cur.need += 1
    else needMap.set(key, { name, category, need: 1 })
  }

  for (const r of inputRows) {
    if (r.mic) bump(r.mic, /di|ди/i.test(r.mic) ? 'di' : 'mic')
    const standName = STAND_NEED[r.stand]
    if (standName) bump(standName, 'stand')
  }
  for (const m of mixes) {
    if (m.wedge && m.wedge !== 'IEM') bump(m.wedge, 'monitor')
  }

  const lines: AuditLine[] = []
  for (const [key, v] of needMap) {
    const vi = findVenueItem(venue, v.name)
    lines.push({
      id: vi?.id || `audit-${key}`,
      name: vi?.name || v.name,
      category: v.category,
      need: v.need,
      have: vi?.qty ?? 0,
    })
  }
  return lines.sort((a, b) => a.have - a.need - (b.have - b.need) || a.name.localeCompare(b.name, 'ru'))
}
