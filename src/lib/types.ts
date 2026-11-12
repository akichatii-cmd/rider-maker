export type Lang = 'ru' | 'en'

export interface LText {
  ru: string
  en: string
}

/** one microphone/DI channel contributed by a placed element */
export interface ChannelTemplate {
  instrument: LText
  mic: string // default mic or DI model
  stand: 'boom' | 'short' | 'straight' | 'clip' | 'none'
  phantom: boolean
}

/** catalog entry: a draggable stage element */
export interface CatalogItem {
  id: string
  name: LText
  /** pixel footprint on the stage grid */
  w: number
  h: number
  category: 'drums' | 'backline' | 'mics' | 'monitors' | 'dj' | 'orchestra' | 'stage'
  channels: ChannelTemplate[]
  /** true for pure outputs (wedges, sidefills) — no input channels */
  isOutput?: boolean
}

/** element placed on the plot */
export interface PlacedElement {
  id: string
  type: string // catalog id
  x: number
  y: number
  rotation: number // degrees, any value 0-359
  label: string // custom label, e.g. "GTR L"
}

/** per-channel user overrides, keyed "elementId:channelIndex" */
export interface ChannelOverride {
  mic?: string
  phantom?: boolean
  stand?: ChannelTemplate['stand']
  note?: string
}

/** manually added / imported channel (not tied to a plot element) */
export interface ManualChannel {
  id: string
  instrument: string
  mic: string
  stand: ChannelTemplate['stand']
  phantom: boolean
  note: string
  /** original channel number from the imported rider, if any */
  ch?: number
}

/** resolved input-list row */
export interface InputRow {
  key: string
  ch: number
  elementId: string // '' for manual rows
  instrument: LText
  mic: string
  stand: ChannelTemplate['stand']
  phantom: boolean
  note: string
  manual?: boolean
}

export interface MonitorMix {
  id: string
  name: string // MIX 1 …
  forWhom: string
  wedge: string // monitor type
  note: string
  /** true for mixes imported from text (not tied to a plot monitor) */
  manual?: boolean
}

export interface VenueItem {
  id: string
  name: string
  category: 'mic' | 'di' | 'stand' | 'monitor' | 'other'
  qty: number
}

export interface Project {
  name: string
  artist: string
  date: string
  contact: string
  stageW: number // meters
  stageD: number
  elements: PlacedElement[]
  overrides: Record<string, ChannelOverride>
  manualRows: ManualChannel[]
  mixes: MonitorMix[]
  consoleId: string
  notes: string
  venue: VenueItem[]
  lang: Lang
}

export interface ConsoleProfile {
  id: string
  name: string
  inputs: number
  outputs: number
}
