import type { ConsoleProfile, VenueItem } from './types'

export const CONSOLES: ConsoleProfile[] = [
  { id: 'ql5', name: 'Yamaha QL5', inputs: 64, outputs: 32 },
  { id: 'ql1', name: 'Yamaha QL1', inputs: 32, outputs: 16 },
  { id: 'cl5', name: 'Yamaha CL5', inputs: 72, outputs: 48 },
  { id: 'wing', name: 'Behringer Wing', inputs: 48, outputs: 48 },
  { id: 'x32', name: 'Behringer X32', inputs: 32, outputs: 16 },
  { id: 'sq5', name: 'Allen & Heath SQ-5', inputs: 48, outputs: 16 },
  { id: 'generic32', name: 'Другой 32/16', inputs: 32, outputs: 16 },
]

/** venue stock — editable per project, used for the audit */
export const DEFAULT_VENUE: VenueItem[] = [
  { id: 'v-sm58', name: 'Shure SM58', category: 'mic', qty: 8 },
  { id: 'v-sm57', name: 'Shure SM57', category: 'mic', qty: 6 },
  { id: 'v-beta58', name: 'Shure Beta 58A', category: 'mic', qty: 4 },
  { id: 'v-beta52', name: 'Shure Beta 52A', category: 'mic', qty: 2 },
  { id: 'v-e604', name: 'Sennheiser e604', category: 'mic', qty: 4 },
  { id: 'v-e906', name: 'Sennheiser e906', category: 'mic', qty: 3 },
  { id: 'v-c414', name: 'AKG C414', category: 'mic', qty: 2 },
  { id: 'v-c451', name: 'AKG C451', category: 'mic', qty: 2 },
  { id: 'v-dpa4099', name: 'DPA 4099', category: 'mic', qty: 4 },
  { id: 'v-dia', name: 'DI активный', category: 'di', qty: 6 },
  { id: 'v-dip', name: 'DI пассивный', category: 'di', qty: 4 },
  { id: 'v-boom', name: 'Стойка журавль', category: 'stand', qty: 10 },
  { id: 'v-straight', name: 'Стойка прямая', category: 'stand', qty: 6 },
  { id: 'v-short', name: 'Стойка низкая', category: 'stand', qty: 4 },
  { id: 'v-clip', name: 'Клипса барабанная', category: 'stand', qty: 6 },
  { id: 'v-wedge', name: 'Монитор точечный 12"', category: 'monitor', qty: 8 },
  { id: 'v-sidefill', name: 'Сайдфилл', category: 'monitor', qty: 2 },
  { id: 'v-drumfill', name: 'Драмфилл', category: 'monitor', qty: 1 },
]
