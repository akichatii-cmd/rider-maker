import type { ChannelTemplate, ManualChannel, MonitorMix } from './types'

export interface ParsedRider {
  channels: Omit<ManualChannel, 'id'>[]
  mixes: Omit<MonitorMix, 'id'>[]
}

// mic / DI model patterns → canonical name (first match wins)
const MIC_PATTERNS: [RegExp, string][] = [
  [/beta\s*52/i, 'Shure Beta 52A'],
  [/beta\s*58/i, 'Shure Beta 58A'],
  [/beta\s*57/i, 'Shure Beta 57A'],
  [/beta\s*91/i, 'Shure Beta 91A'],
  [/sm\s*58/i, 'Shure SM58'],
  [/sm\s*57/i, 'Shure SM57'],
  [/e\s*604/i, 'Sennheiser e604'],
  [/e\s*902/i, 'Sennheiser e902'],
  [/e\s*904/i, 'Sennheiser e904'],
  [/e\s*906/i, 'Sennheiser e906'],
  [/e\s*609/i, 'Sennheiser e609'],
  [/md\s*421/i, 'Sennheiser MD421'],
  [/md\s*441/i, 'Sennheiser MD441'],
  [/c\s*414/i, 'AKG C414'],
  [/c\s*451/i, 'AKG C451'],
  [/c\s*535/i, 'AKG C535'],
  [/d\s*112/i, 'AKG D112'],
  [/dpa/i, 'DPA 4099'],
  [/4099|4011|4055|4060/i, 'DPA 4099'],
  [/km\s*184/i, 'Neumann KM184'],
  [/u\s*87/i, 'Neumann U87'],
  [/re\s*20/i, 'EV RE20'],
  [/m\s*88/i, 'Beyerdynamic M88'],
  [/di\b|ди\b|ди\s*бокс|direct\s*box/i, 'DI активный'],
  [/mxl|rode|nt\d/i, 'Конденсаторный'],
]

const STAND_HINTS: [RegExp, ChannelTemplate['stand']][] = [
  [/низк|short|low/i, 'short'],
  [/прям|straight/i, 'straight'],
  [/клипс|clip/i, 'clip'],
  [/без\s*стойк|no\s*stand/i, 'none'],
  [/журавл|boom/i, 'boom'],
]

const PHANTOM_RE = /48\s*[vв]|phantom|фантом/i

// lines that describe monitor mixes, not input channels
const MIX_LINE_RE = /^(mix|мон|монитор|aux|iem|wedge|side\s*fill|sidefill|drumfill|драмфилл|сайдфилл|ин[- ]??уши|уши)/i
const WEDGE_HINT_RE = /iem|ин[- ]?уши|уши/i
const SIDEFILL_HINT_RE = /side|сайд/i
const DRUMFILL_HINT_RE = /drumfill|драм/i

function detectMic(text: string): string {
  for (const [re, name] of MIC_PATTERNS) if (re.test(text)) return name
  return ''
}

function detectStand(text: string, mic: string): ChannelTemplate['stand'] {
  for (const [re, s] of STAND_HINTS) if (re.test(text)) return s
  // DI boxes live on the floor — no stand by default
  if (/^di\b|\bdi\b|ди/i.test(mic)) return 'none'
  return 'boom'
}

function detectWedge(text: string): string {
  if (WEDGE_HINT_RE.test(text)) return 'IEM'
  if (SIDEFILL_HINT_RE.test(text)) return 'Сайдфилл'
  if (DRUMFILL_HINT_RE.test(text)) return 'Драмфилл'
  return 'Монитор точечный 12"'
}

/**
 * Parse one line. Supported shapes:
 *   "16 | Скрипка | DPA 4099 | клипса | 48V"
 *   "16. Скрипка — DPA 4099"
 *   "Скрипка DPA 4099 клипса"
 *   "Mix 2 | Вокалистка | wedge"
 */
function parseChannelLine(line: string): Omit<ManualChannel, 'id'> | null {
  // leading channel number: "16 |", "16.", "16)", "16 -", "ch 16"
  let rest = line.trim()
  let ch: number | undefined
  const mNum = rest.match(/^(?:ch\s*)?(\d{1,3})\s*(?:[.|):\-–—]|\s{2,}|\t)/i)
  if (mNum) {
    ch = parseInt(mNum[1], 10)
    rest = rest.slice(mNum[0].length).trim()
  }
  const parts = rest.split(/[|\t;]/).map((s) => s.trim()).filter(Boolean)
  const joined = parts.join(' | ')
  const mic = detectMic(joined)
  const instrument = parts[0] || joined
  if (!instrument || instrument.length < 2) return null
  // skip header rows
  if (/^(ch|channel|канал|№|инструмент|instrument)/i.test(instrument) && mic === '') return null
  return {
    instrument,
    mic,
    stand: detectStand(joined, mic),
    phantom: PHANTOM_RE.test(joined),
    note: parts.slice(2).join(' · '),
    ch,
  }
}

function parseMixLine(line: string): Omit<MonitorMix, 'id'> | null {
  const parts = line.split(/[|\t;]/).map((s) => s.trim()).filter(Boolean)
  const first = parts[0] || line.trim()
  // "Mix 2", "Монитор 3", "AUX 1" → name + optional forWhom
  const mName = first.match(/^(mix|монитор|мон|aux)\s*(\d+)?/i)
  const name = mName ? `MIX ${mName[2] || ''}`.trim() : first.slice(0, 24)
  const forWhom = parts[1] || (mName ? '' : first)
  const joined = parts.join(' ')
  return {
    name,
    forWhom: forWhom || '',
    wedge: detectWedge(joined),
    note: parts.slice(2).join(' · '),
    manual: true,
  }
}

export function parseRiderText(text: string): ParsedRider {
  const channels: Omit<ManualChannel, 'id'>[] = []
  const mixes: Omit<MonitorMix, 'id'>[] = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (line.length < 3) continue
    if (MIX_LINE_RE.test(line) && !/^\d+\s*[.|)]/.test(line)) {
      const mix = parseMixLine(line)
      if (mix) { mixes.push(mix); continue }
    }
    const chLine = parseChannelLine(line)
    if (chLine) channels.push(chLine)
  }
  return { channels, mixes }
}
