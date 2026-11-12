import type { ReactNode } from 'react'
import type { CatalogItem } from './types'

/**
 * Icon strokes drawn in a 64x64 box, top view, stroke-based.
 * Rendered with currentColor; stage-facing direction is UP.
 */
export const ICONS: Record<string, ReactNode> = {
  kick: (
    <>
      <circle cx="32" cy="26" r="20" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="26" r="12" fill="none" strokeWidth="1.5" opacity=".5" />
      <circle cx="32" cy="26" r="3" fill="currentColor" stroke="none" opacity=".7" />
      <path d="M32 46 L32 56" strokeWidth="2.5" />
      <path d="M27 56 L37 56 L32 60 Z" fill="none" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  snare: (
    <>
      <circle cx="32" cy="30" r="15" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="30" r="9" fill="none" strokeWidth="1.5" opacity=".5" />
      <path d="M32 45 L32 52 M25 56 L39 56" strokeWidth="2" />
    </>
  ),
  tom: (
    <>
      <circle cx="32" cy="30" r="13" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="30" r="6.5" fill="none" strokeWidth="1.5" opacity=".5" />
      <path d="M32 43 L32 50 M27 53 L37 53" strokeWidth="2" />
    </>
  ),
  cymbal: (
    <>
      <circle cx="32" cy="26" r="17" fill="none" strokeWidth="2" />
      <circle cx="32" cy="26" r="10" fill="none" strokeWidth="1" opacity=".45" />
      <circle cx="32" cy="26" r="2.5" fill="currentColor" stroke="none" />
      <path d="M32 43 L32 58" strokeWidth="2.5" />
    </>
  ),
  hihat: (
    <>
      <circle cx="32" cy="26" r="14" fill="none" strokeWidth="2" />
      <circle cx="32" cy="26" r="14" fill="none" strokeWidth="1" strokeDasharray="2 3" opacity=".6" transform="translate(1.5 1.5)" />
      <circle cx="32" cy="26" r="2" fill="currentColor" stroke="none" />
      <path d="M32 40 L32 58 M28 54 L36 54" strokeWidth="2" />
    </>
  ),
  drumkit: (
    <>
      <circle cx="32" cy="44" r="14" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="44" r="7" fill="none" strokeWidth="1.2" opacity=".5" />
      <path d="M32 58 L32 62 M29 62 L35 62" strokeWidth="2" />
      <circle cx="24" cy="26" r="7.5" fill="none" strokeWidth="2" />
      <circle cx="40" cy="26" r="7.5" fill="none" strokeWidth="2" />
      <circle cx="16" cy="40" r="6" fill="none" strokeWidth="2" />
      <circle cx="48" cy="40" r="6.5" fill="none" strokeWidth="2" />
      <circle cx="10" cy="26" r="5" fill="none" strokeWidth="1.6" strokeDasharray="2 2" />
      <circle cx="54" cy="24" r="5.5" fill="none" strokeWidth="1.6" strokeDasharray="2 2" />
      <circle cx="32" cy="8" r="4" fill="none" strokeWidth="1.8" opacity=".7" />
    </>
  ),
  amp: (
    <>
      <rect x="14" y="12" width="36" height="40" rx="2" fill="none" strokeWidth="2.5" />
      <path d="M18 17 L46 17" strokeWidth="1.5" opacity=".6" />
      <circle cx="22" cy="14.5" r="1" fill="currentColor" stroke="none" opacity=".8" />
      <circle cx="26" cy="14.5" r="1" fill="currentColor" stroke="none" opacity=".8" />
      <circle cx="30" cy="14.5" r="1" fill="currentColor" stroke="none" opacity=".8" />
      <circle cx="32" cy="33" r="11" fill="none" strokeWidth="2" />
      <circle cx="32" cy="33" r="4" fill="none" strokeWidth="1.2" opacity=".5" />
    </>
  ),
  bassamp: (
    <>
      <rect x="11" y="10" width="42" height="44" rx="2" fill="none" strokeWidth="2.5" />
      <path d="M16 15 L48 15" strokeWidth="1.5" opacity=".6" />
      <circle cx="32" cy="28" r="9" fill="none" strokeWidth="2" />
      <circle cx="32" cy="43" r="6.5" fill="none" strokeWidth="2" />
    </>
  ),
  guitar: (
    <>
      <path d="M32 50 C24 50 19 44 19 38 C19 32 24 30 26 26 C28 22 26 18 32 18 C38 18 36 22 38 26 C40 30 45 32 45 38 C45 44 40 50 32 50 Z" fill="none" strokeWidth="2.5" />
      <path d="M32 18 L32 6 M29 7 L35 7" strokeWidth="2.5" />
      <circle cx="32" cy="37" r="3" fill="none" strokeWidth="1.5" opacity=".6" />
    </>
  ),
  keys: (
    <>
      <rect x="7" y="22" width="50" height="18" rx="2" fill="none" strokeWidth="2.5" />
      <path d="M14 22 L14 40 M21 22 L21 40 M28 22 L28 40 M35 22 L35 40 M42 22 L42 40 M49 22 L49 40" strokeWidth="1" opacity=".5" />
      <path d="M12 22 L12 30 M17.5 22 L17.5 30 M24.5 22 L24.5 30 M38.5 22 L38.5 30 M45.5 22 L45.5 30" strokeWidth="2.4" />
      <path d="M14 40 L10 56 M50 40 L54 56 M10 56 L18 56 M46 56 L54 56" strokeWidth="2.2" />
    </>
  ),
  piano: (
    <>
      <path d="M14 12 C40 8 54 20 50 36 C46 52 24 56 17 46 C12 39 12 22 14 12 Z" fill="none" strokeWidth="2.5" />
      <path d="M17 16 C36 13 48 22 45 34" fill="none" strokeWidth="1.2" opacity=".5" />
      <rect x="12" y="42" width="14" height="7" rx="1" fill="none" strokeWidth="1.6" opacity=".7" />
    </>
  ),
  mic_stand: (
    <>
      <rect x="27" y="8" width="10" height="16" rx="5" fill="none" strokeWidth="2.5" />
      <path d="M29.5 13 L34.5 13 M29.5 17 L34.5 17" strokeWidth="1" opacity=".5" />
      <path d="M32 24 L32 50" strokeWidth="2.5" />
      <path d="M32 50 L24 59 M32 50 L40 59 M32 50 L32 59" strokeWidth="2.2" />
    </>
  ),
  mic_boom: (
    <>
      <rect x="44" y="12" width="9" height="14" rx="5" fill="none" strokeWidth="2.5" transform="rotate(38 49 19)" />
      <path d="M44 24 L27 33" strokeWidth="2.5" />
      <circle cx="27" cy="33" r="2" fill="currentColor" stroke="none" />
      <path d="M27 35 L27 50" strokeWidth="2.5" />
      <path d="M27 50 L19 59 M27 50 L35 59 M27 50 L27 59" strokeWidth="2.2" />
    </>
  ),
  di: (
    <>
      <rect x="18" y="22" width="28" height="20" rx="3" fill="none" strokeWidth="2.5" />
      <path d="M18 28 L46 22 M18 42 L46 42" strokeWidth="1" opacity=".4" />
      <circle cx="25" cy="32" r="2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="32" r="2" fill="none" strokeWidth="1.6" />
      <circle cx="39" cy="32" r="2" fill="none" strokeWidth="1.6" />
    </>
  ),
  wedge: (
    <>
      <path d="M13 48 L23 20 L41 20 L51 48 Z" fill="none" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 40 L46 40 M20.5 33 L43.5 33 M22 26 L42 26" strokeWidth="1.2" opacity=".5" />
      <path d="M13 48 L51 48" strokeWidth="2.5" />
    </>
  ),
  sidefill: (
    <>
      <rect x="18" y="8" width="28" height="48" rx="2" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="22" r="7" fill="none" strokeWidth="2" />
      <circle cx="32" cy="22" r="2.5" fill="none" strokeWidth="1.2" opacity=".6" />
      <circle cx="32" cy="42" r="9" fill="none" strokeWidth="2" />
      <path d="M25 52 L39 52" strokeWidth="1.5" opacity=".5" />
    </>
  ),
  drumfill: (
    <>
      <rect x="20" y="12" width="24" height="44" rx="2" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="24" r="6" fill="none" strokeWidth="2" />
      <circle cx="32" cy="42" r="8.5" fill="none" strokeWidth="2" />
      <circle cx="32" cy="42" r="3" fill="none" strokeWidth="1.2" opacity=".6" />
    </>
  ),
  cdj: (
    <>
      <rect x="8" y="16" width="48" height="32" rx="2" fill="none" strokeWidth="2.5" />
      <circle cx="22" cy="35" r="7" fill="none" strokeWidth="2" />
      <circle cx="22" cy="35" r="2" fill="currentColor" stroke="none" opacity=".7" />
      <circle cx="42" cy="35" r="7" fill="none" strokeWidth="2" />
      <circle cx="42" cy="35" r="2" fill="currentColor" stroke="none" opacity=".7" />
      <rect x="14" y="20" width="14" height="5" rx="1" fill="none" strokeWidth="1.4" opacity=".7" />
      <rect x="36" y="20" width="14" height="5" rx="1" fill="none" strokeWidth="1.4" opacity=".7" />
    </>
  ),
  djm: (
    <>
      <rect x="11" y="14" width="42" height="36" rx="2" fill="none" strokeWidth="2.5" />
      <circle cx="19" cy="22" r="2.5" fill="none" strokeWidth="1.6" />
      <circle cx="32" cy="22" r="2.5" fill="none" strokeWidth="1.6" />
      <circle cx="45" cy="22" r="2.5" fill="none" strokeWidth="1.6" />
      <path d="M19 28 L19 46 M32 28 L32 46 M45 28 L45 46" strokeWidth="1.2" opacity=".5" />
      <rect x="17" y="36" width="4" height="2.6" fill="currentColor" stroke="none" />
      <rect x="30" y="32" width="4" height="2.6" fill="currentColor" stroke="none" />
      <rect x="43" y="40" width="4" height="2.6" fill="currentColor" stroke="none" />
    </>
  ),
  laptop: (
    <>
      <rect x="19" y="12" width="26" height="18" rx="1.5" fill="none" strokeWidth="2.5" />
      <rect x="23" y="16" width="18" height="3" fill="none" strokeWidth="1" opacity=".5" />
      <path d="M14 34 L50 34 L46 40 L18 40 Z" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 40 L18 54 M42 40 L46 54 M18 54 L26 54 M38 54 L46 54" strokeWidth="2" />
    </>
  ),
  riser: (
    <>
      <rect x="8" y="14" width="48" height="36" rx="2" fill="none" strokeWidth="2.5" />
      <rect x="12" y="18" width="40" height="28" rx="1" fill="none" strokeWidth="1.2" strokeDasharray="4 3" opacity=".55" />
      <path d="M8 14 L12 18 M56 14 L52 18 M8 50 L12 46 M56 50 L52 46" strokeWidth="1.4" opacity=".55" />
    </>
  ),
  stool: (
    <>
      <circle cx="32" cy="32" r="11" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="4" fill="none" strokeWidth="1.2" opacity=".5" />
    </>
  ),
  stool_bar: (
    <>
      <circle cx="32" cy="28" r="10" fill="none" strokeWidth="2.5" />
      <path d="M32 38 L32 48 M24 54 L40 54 M27 43 L37 43" strokeWidth="2" />
    </>
  ),
  fan: (
    <>
      <circle cx="32" cy="30" r="16" fill="none" strokeWidth="2.5" />
      <path d="M32 30 C36 24 40 22 44 24 C43 29 38 31 32 30 C30 36 27 40 23 40 C22 35 26 31 32 30 C28 27 26 22 29 18 C33 20 34 25 32 30 Z" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M32 46 L32 54 M26 58 L38 58" strokeWidth="2" />
    </>
  ),
  foh: (
    <>
      <rect x="8" y="20" width="48" height="26" rx="2" fill="none" strokeWidth="2.5" />
      <path d="M16 20 L16 46 M24 20 L24 46 M32 20 L32 46 M40 20 L40 46 M48 20 L48 46" strokeWidth="1" opacity=".4" />
      <rect x="14.6" y="28" width="2.8" height="2" fill="currentColor" stroke="none" />
      <rect x="22.6" y="34" width="2.8" height="2" fill="currentColor" stroke="none" />
      <rect x="30.6" y="26" width="2.8" height="2" fill="currentColor" stroke="none" />
      <rect x="38.6" y="38" width="2.8" height="2" fill="currentColor" stroke="none" />
      <rect x="46.6" y="30" width="2.8" height="2" fill="currentColor" stroke="none" />
    </>
  ),
  power: (
    <>
      <rect x="20" y="20" width="24" height="24" rx="3" fill="none" strokeWidth="2.5" />
      <path d="M34 25 L28 33 L33 33 L30 41" fill="none" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M26 48 L38 48" strokeWidth="2" opacity=".6" />
    </>
  ),
  person: (
    <>
      <circle cx="32" cy="18" r="7" fill="none" strokeWidth="2.5" />
      <path d="M32 25 L32 42 M23 33 L42 33 M32 42 L26 54 M32 42 L38 54" strokeWidth="2.5" />
    </>
  ),
  panel: (
    <>
      <rect x="14" y="8" width="36" height="48" rx="2" fill="none" strokeWidth="2.5" />
      <path d="M14 20 C20 16 26 24 32 20 C38 16 44 24 50 20 M14 32 C20 28 26 36 32 32 C38 28 44 36 50 32 M14 44 C20 40 26 48 32 44 C38 40 44 48 50 44" fill="none" strokeWidth="1.3" opacity=".55" />
    </>
  ),
  // ---- orchestra ----
  violin: (
    <>
      <path d="M32 46 C27 46 24 42 25 38 C26 35 28 34 28 32 C28 30 26 29 25 26 C24 22 27 18 32 18 C37 18 40 22 39 26 C38 29 36 30 36 32 C36 34 38 35 39 38 C40 42 37 46 32 46 Z" fill="none" strokeWidth="2.2" />
      <path d="M32 18 L32 8 M30 8 C30 6 34 6 34 8" strokeWidth="2" />
      <path d="M32 28 L32 42" strokeWidth="1" opacity=".5" />
      <path d="M28 36 C29 34 29 32 28 30 M36 36 C35 34 35 32 36 30" strokeWidth="1" opacity=".5" />
    </>
  ),
  cello: (
    <>
      <path d="M32 48 C25 48 21 43 22 37 C23 33 26 32 26 29 C26 26 23 25 22 21 C21 15 25 11 32 11 C39 11 43 15 42 21 C41 25 38 26 38 29 C38 32 41 33 42 37 C43 43 39 48 32 48 Z" fill="none" strokeWidth="2.2" />
      <path d="M32 11 L32 4 M29 4 C29 2 35 2 35 4" strokeWidth="2" />
      <path d="M32 24 L32 42" strokeWidth="1" opacity=".5" />
      <path d="M32 48 L32 60" strokeWidth="2" />
    </>
  ),
  doublebass: (
    <>
      <path d="M32 52 C23 52 18 46 20 38 C21 33 25 31 25 27 C25 23 21 21 21 16 C21 9 26 5 32 5 C38 5 43 9 43 16 C43 21 39 23 39 27 C39 31 43 33 44 38 C46 46 41 52 32 52 Z" fill="none" strokeWidth="2.2" />
      <path d="M32 5 L32 2" strokeWidth="2" />
      <path d="M32 20 L32 44" strokeWidth="1" opacity=".5" />
      <path d="M32 52 L32 62" strokeWidth="2" />
      <path d="M26 34 C27 31 27 29 26 27 M38 34 C37 31 37 29 38 27" strokeWidth="1" opacity=".5" />
    </>
  ),
  flute: (
    <>
      <path d="M10 30 L54 30" strokeWidth="3" />
      <circle cx="18" cy="30" r="2" fill="none" strokeWidth="1.4" />
      <circle cx="26" cy="30" r="2" fill="none" strokeWidth="1.4" />
      <circle cx="34" cy="30" r="2" fill="none" strokeWidth="1.4" />
      <circle cx="42" cy="30" r="2" fill="none" strokeWidth="1.4" />
      <path d="M10 30 L10 26 M54 30 L54 34" strokeWidth="2" />
    </>
  ),
  clarinet: (
    <>
      <path d="M20 14 L40 44" strokeWidth="3" />
      <path d="M40 44 L45 52 M40 44 L34 50" strokeWidth="2.5" />
      <path d="M24 20 L26 18 M29 26 L31 24 M34 32 L36 30" strokeWidth="1.6" />
      <circle cx="20" cy="14" r="2" fill="none" strokeWidth="1.6" />
    </>
  ),
  sax: (
    <>
      <path d="M26 8 C22 8 20 11 20 15 L20 36 C20 44 26 50 34 50 C42 50 46 45 46 38" fill="none" strokeWidth="3" />
      <path d="M46 38 L52 30 M46 38 L40 30" strokeWidth="2.5" />
      <circle cx="27" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="27" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="27" cy="34" r="1.6" fill="currentColor" stroke="none" />
      <path d="M26 8 L34 8" strokeWidth="2.5" />
    </>
  ),
  trumpet: (
    <>
      <path d="M12 26 L40 26 L52 20 M40 38 L52 44 L40 38 L12 38" fill="none" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 20 L52 44" strokeWidth="2.5" />
      <path d="M22 26 L22 20 M30 26 L30 20 M38 26 L38 20" strokeWidth="2" />
      <path d="M12 26 L12 38" strokeWidth="2.5" />
    </>
  ),
  trombone: (
    <>
      <path d="M10 24 L44 24 M10 32 L44 32" strokeWidth="2.5" />
      <path d="M44 24 L52 18 M44 32 L52 38 M52 18 L52 38" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 24 L10 32 M16 24 L16 40 M16 40 L34 40 M34 40 L34 32" strokeWidth="2" fill="none" />
    </>
  ),
  horn: (
    <>
      <circle cx="30" cy="32" r="16" fill="none" strokeWidth="2.5" />
      <circle cx="30" cy="32" r="9" fill="none" strokeWidth="1.5" opacity=".5" />
      <path d="M42 22 L54 12 M42 42 L54 52 M54 12 L54 52" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </>
  ),
  tuba: (
    <>
      <circle cx="28" cy="36" r="16" fill="none" strokeWidth="2.5" />
      <path d="M28 20 C28 10 34 6 40 6 L48 6" fill="none" strokeWidth="2.5" />
      <ellipse cx="52" cy="6" rx="8" ry="4" fill="none" strokeWidth="2.5" />
      <path d="M34 30 L34 36 M28 28 L28 36 M22 30 L22 36" strokeWidth="1.6" opacity=".6" />
    </>
  ),
  timpani: (
    <>
      <circle cx="32" cy="28" r="20" fill="none" strokeWidth="2.5" />
      <circle cx="32" cy="28" r="13" fill="none" strokeWidth="1.5" opacity=".5" />
      <circle cx="32" cy="28" r="4" fill="none" strokeWidth="1.5" opacity=".6" />
      <path d="M32 48 L32 56 M20 44 L16 54 M44 48 L48 54" strokeWidth="2" />
      <path d="M18 14 L14 8 M46 14 L50 8" strokeWidth="1.6" opacity=".6" />
    </>
  ),
  congas: (
    <>
      <circle cx="22" cy="30" r="13" fill="none" strokeWidth="2.5" />
      <circle cx="22" cy="30" r="7" fill="none" strokeWidth="1.5" opacity=".5" />
      <circle cx="44" cy="34" r="11" fill="none" strokeWidth="2.5" />
      <circle cx="44" cy="34" r="5.5" fill="none" strokeWidth="1.5" opacity=".5" />
      <path d="M22 43 L22 52 M44 45 L44 54" strokeWidth="2" />
    </>
  ),
  harp: (
    <>
      <path d="M14 54 C14 30 30 12 52 10 C44 26 36 42 34 54 Z" fill="none" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M19 48 L46 15 M23 51 L48 19 M27 53 L50 23" strokeWidth="1" opacity=".5" />
      <path d="M14 54 L36 54" strokeWidth="2.5" />
    </>
  ),
}

const ch = (instrument: { ru: string; en: string }, mic: string, stand: 'boom' | 'short' | 'straight' | 'clip' | 'none' = 'boom', phantom = false) => ({
  instrument,
  mic,
  stand,
  phantom,
})

export const CATALOG: CatalogItem[] = [
  // ---- drums ----
  {
    id: 'drumkit', name: { ru: 'Барабанная установка', en: 'Drum kit' }, w: 150, h: 150, category: 'drums',
    channels: [
      ch({ ru: 'Бочка', en: 'Kick' }, 'Shure Beta 52A', 'short'),
      ch({ ru: 'Малый', en: 'Snare' }, 'Shure SM57', 'clip'),
      ch({ ru: 'Хай-хэт', en: 'Hi-hat' }, 'AKG C451', 'short', true),
      ch({ ru: 'Том 1', en: 'Tom 1' }, 'Sennheiser e604', 'clip'),
      ch({ ru: 'Том 2', en: 'Tom 2' }, 'Sennheiser e604', 'clip'),
      ch({ ru: 'Напольный том', en: 'Floor tom' }, 'Sennheiser e604', 'clip'),
      ch({ ru: 'Оверхэд L', en: 'OH L' }, 'AKG C414', 'boom', true),
      ch({ ru: 'Оверхэд R', en: 'OH R' }, 'AKG C414', 'boom', true),
    ],
  },
  { id: 'kick', name: { ru: 'Бочка', en: 'Kick drum' }, w: 72, h: 72, category: 'drums', channels: [ch({ ru: 'Бочка', en: 'Kick' }, 'Shure Beta 52A', 'short')] },
  { id: 'snare', name: { ru: 'Малый барабан', en: 'Snare' }, w: 52, h: 52, category: 'drums', channels: [ch({ ru: 'Малый', en: 'Snare' }, 'Shure SM57', 'clip')] },
  { id: 'tom', name: { ru: 'Том', en: 'Tom' }, w: 48, h: 48, category: 'drums', channels: [ch({ ru: 'Том', en: 'Tom' }, 'Sennheiser e604', 'clip')] },
  { id: 'cymbal', name: { ru: 'Тарелка на стойке', en: 'Cymbal + stand' }, w: 56, h: 64, category: 'drums', channels: [] },
  { id: 'hihat', name: { ru: 'Хай-хэт', en: 'Hi-hat' }, w: 52, h: 60, category: 'drums', channels: [ch({ ru: 'Хай-хэт', en: 'Hi-hat' }, 'AKG C451', 'short', true)] },
  // ---- backline ----
  { id: 'amp', name: { ru: 'Гитарный комбо', en: 'Guitar amp' }, w: 64, h: 64, category: 'backline', channels: [ch({ ru: 'Гитара', en: 'Guitar' }, 'Sennheiser e906', 'short')] },
  { id: 'bassamp', name: { ru: 'Басовый кабинет', en: 'Bass amp' }, w: 72, h: 72, category: 'backline', channels: [ch({ ru: 'Бас (с кабинета)', en: 'Bass (amp)' }, 'Shure Beta 52A', 'short')] },
  { id: 'guitar', name: { ru: 'Гитара на стойке', en: 'Guitar on stand' }, w: 52, h: 60, category: 'backline', channels: [] },
  { id: 'keys', name: { ru: 'Клавиши', en: 'Keyboard' }, w: 96, h: 64, category: 'backline', channels: [ch({ ru: 'Клавиши L', en: 'Keys L' }, 'DI активный', 'none', true), ch({ ru: 'Клавиши R', en: 'Keys R' }, 'DI активный', 'none', true)] },
  { id: 'piano', name: { ru: 'Рояль', en: 'Grand piano' }, w: 100, h: 96, category: 'backline', channels: [ch({ ru: 'Рояль L', en: 'Piano L' }, 'AKG C414', 'boom', true), ch({ ru: 'Рояль R', en: 'Piano R' }, 'AKG C414', 'boom', true)] },
  { id: 'di', name: { ru: 'DI-бокс', en: 'DI box' }, w: 40, h: 36, category: 'backline', channels: [ch({ ru: 'DI', en: 'DI' }, 'DI активный', 'none', true)] },
  { id: 'laptop', name: { ru: 'Ноутбук / плейбек', en: 'Laptop / playback' }, w: 64, h: 64, category: 'backline', channels: [ch({ ru: 'Плейбек L', en: 'Playback L' }, 'DI активный', 'none', true), ch({ ru: 'Плейбек R', en: 'Playback R' }, 'DI активный', 'none', true)] },
  // ---- mics ----
  { id: 'mic_stand', name: { ru: 'Вокал (прямая стойка)', en: 'Vocal (straight stand)' }, w: 44, h: 64, category: 'mics', channels: [ch({ ru: 'Вокал', en: 'Vocal' }, 'Shure SM58', 'straight')] },
  { id: 'mic_boom', name: { ru: 'Вокал (журавль)', en: 'Vocal (boom)' }, w: 56, h: 64, category: 'mics', channels: [ch({ ru: 'Вокал', en: 'Vocal' }, 'Shure SM58', 'boom')] },
  // ---- orchestra ----
  { id: 'violin', name: { ru: 'Скрипка', en: 'Violin' }, w: 48, h: 56, category: 'orchestra', channels: [ch({ ru: 'Скрипка', en: 'Violin' }, 'DPA 4099', 'clip', true)] },
  { id: 'cello', name: { ru: 'Виолончель', en: 'Cello' }, w: 56, h: 64, category: 'orchestra', channels: [ch({ ru: 'Виолончель', en: 'Cello' }, 'DPA 4099', 'clip', true)] },
  { id: 'doublebass', name: { ru: 'Контрабас', en: 'Double bass' }, w: 60, h: 72, category: 'orchestra', channels: [ch({ ru: 'Контрабас', en: 'Double bass' }, 'DPA 4099', 'clip', true)] },
  { id: 'flute', name: { ru: 'Флейта', en: 'Flute' }, w: 56, h: 44, category: 'orchestra', channels: [ch({ ru: 'Флейта', en: 'Flute' }, 'DPA 4099', 'clip', true)] },
  { id: 'clarinet', name: { ru: 'Кларнет / гобой', en: 'Clarinet / oboe' }, w: 52, h: 52, category: 'orchestra', channels: [ch({ ru: 'Духовые', en: 'Woodwind' }, 'DPA 4099', 'clip', true)] },
  { id: 'sax', name: { ru: 'Саксофон', en: 'Saxophone' }, w: 56, h: 56, category: 'orchestra', channels: [ch({ ru: 'Саксофон', en: 'Sax' }, 'Sennheiser e604', 'clip')] },
  { id: 'trumpet', name: { ru: 'Труба', en: 'Trumpet' }, w: 56, h: 52, category: 'orchestra', channels: [ch({ ru: 'Труба', en: 'Trumpet' }, 'AKG C414', 'boom', true)] },
  { id: 'trombone', name: { ru: 'Тромбон', en: 'Trombone' }, w: 60, h: 52, category: 'orchestra', channels: [ch({ ru: 'Тромбон', en: 'Trombone' }, 'AKG C414', 'boom', true)] },
  { id: 'horn', name: { ru: 'Валторна', en: 'French horn' }, w: 56, h: 56, category: 'orchestra', channels: [ch({ ru: 'Валторна', en: 'Horn' }, 'AKG C414', 'boom', true)] },
  { id: 'tuba', name: { ru: 'Туба', en: 'Tuba' }, w: 60, h: 56, category: 'orchestra', channels: [ch({ ru: 'Туба', en: 'Tuba' }, 'Shure Beta 52A', 'short')] },
  { id: 'timpani', name: { ru: 'Литавры', en: 'Timpani' }, w: 72, h: 68, category: 'orchestra', channels: [ch({ ru: 'Литавры', en: 'Timpani' }, 'AKG C414', 'boom', true)] },
  { id: 'congas', name: { ru: 'Конги / перкуссия', en: 'Congas / percussion' }, w: 76, h: 60, category: 'orchestra', channels: [ch({ ru: 'Конга L', en: 'Conga L' }, 'Sennheiser e604', 'clip'), ch({ ru: 'Конга R', en: 'Conga R' }, 'Sennheiser e604', 'clip')] },
  { id: 'harp', name: { ru: 'Арфа', en: 'Harp' }, w: 64, h: 64, category: 'orchestra', channels: [ch({ ru: 'Арфа', en: 'Harp' }, 'AKG C414', 'boom', true)] },
  // ---- monitors ----
  { id: 'wedge', name: { ru: 'Монитор точечный', en: 'Wedge monitor' }, w: 60, h: 52, category: 'monitors', isOutput: true, channels: [] },
  { id: 'sidefill', name: { ru: 'Сайдфилл', en: 'Sidefill' }, w: 56, h: 80, category: 'monitors', isOutput: true, channels: [] },
  { id: 'drumfill', name: { ru: 'Драмфилл', en: 'Drum fill' }, w: 56, h: 76, category: 'monitors', isOutput: true, channels: [] },
  // ---- dj ----
  { id: 'cdj', name: { ru: 'CDJ / вертушки', en: 'CDJ / turntables' }, w: 88, h: 56, category: 'dj', channels: [] },
  { id: 'djm', name: { ru: 'DJ-пульт', en: 'DJ mixer' }, w: 80, h: 64, category: 'dj', channels: [ch({ ru: 'DJ L', en: 'DJ L' }, 'DI активный', 'none', true), ch({ ru: 'DJ R', en: 'DJ R' }, 'DI активный', 'none', true)] },
  // ---- stage ----
  { id: 'riser', name: { ru: 'Подиум', en: 'Riser' }, w: 140, h: 110, category: 'stage', channels: [] },
  { id: 'stool', name: { ru: 'Табурет', en: 'Stool' }, w: 36, h: 36, category: 'stage', channels: [] },
  { id: 'stool_bar', name: { ru: 'Барный стул', en: 'Bar stool' }, w: 40, h: 48, category: 'stage', channels: [] },
  { id: 'fan', name: { ru: 'Вентилятор', en: 'Fan' }, w: 52, h: 52, category: 'stage', channels: [] },
  { id: 'foh', name: { ru: 'Пульт (FOH/мон.)', en: 'Console (FOH/mon)' }, w: 84, h: 56, category: 'stage', channels: [] },
  { id: 'power', name: { ru: 'Питание 220В', en: 'Power 220V' }, w: 36, h: 36, category: 'stage', channels: [] },
  { id: 'person', name: { ru: 'Музыкант', en: 'Musician' }, w: 48, h: 56, category: 'stage', channels: [] },
  { id: 'panel', name: { ru: 'Акустическая ширма', en: 'Acoustic panel' }, w: 76, h: 90, category: 'stage', channels: [] },
]

export const catalogById = (id: string) => CATALOG.find((c) => c.id === id)

export const CATEGORY_LABELS: Record<CatalogItem['category'], { ru: string; en: string }> = {
  drums: { ru: 'Барабаны', en: 'Drums' },
  backline: { ru: 'Бэклайн', en: 'Backline' },
  mics: { ru: 'Микрофоны', en: 'Microphones' },
  monitors: { ru: 'Мониторы', en: 'Monitors' },
  dj: { ru: 'DJ', en: 'DJ' },
  orchestra: { ru: 'Оркестр', en: 'Orchestra' },
  stage: { ru: 'Сцена', en: 'Stage' },
}
