import { catalogById, ICONS } from '../lib/catalog'
import type { PlacedElement } from '../lib/types'

export const PX_PER_M = 64

export function plotSize(stageW: number, stageD: number) {
  return { w: stageW * PX_PER_M, h: stageD * PX_PER_M }
}

const COLORS = {
  dark: {
    stage: '#14171c', grid: '#23272f', gridBold: '#2e333d', border: '#3a404c',
    ruler: '#6b7280', item: '#e5e7eb', label: '#9ca3af', sel: '#fb923c', audience: '#565d68',
  },
  print: {
    stage: '#ffffff', grid: '#e3e3e3', gridBold: '#c9c9c9', border: '#444444',
    item: '#111111', label: '#333333', sel: '#111111', audience: '#555555', ruler: '#777777',
  },
}

interface PlotSVGProps {
  elements: PlacedElement[]
  stageW: number // meters
  stageD: number
  forPrint?: boolean
  selectedId?: string | null
  onElementPointerDown?: (e: React.PointerEvent, id: string) => void
  onBackgroundPointerDown?: (e: React.PointerEvent) => void
  audienceLabel?: string
}

export default function PlotSVG({
  elements, stageW, stageD, forPrint = false, selectedId = null,
  onElementPointerDown, onBackgroundPointerDown, audienceLabel = 'ЗРИТЕЛИ',
}: PlotSVGProps) {
  const { w, h } = plotSize(stageW, stageD)
  const C = forPrint ? { ...COLORS.dark, ...COLORS.print } : COLORS.dark

  const gridLines = []
  for (let x = 0; x <= w; x += PX_PER_M / 2) {
    gridLines.push(
      <line key={`gx${x}`} x1={x} y1={0} x2={x} y2={h}
        stroke={x % PX_PER_M === 0 ? C.gridBold : C.grid} strokeWidth={x % PX_PER_M === 0 ? 1 : 0.5} />,
    )
  }
  for (let y = 0; y <= h; y += PX_PER_M / 2) {
    gridLines.push(
      <line key={`gy${y}`} x1={0} y1={y} x2={w} y2={y}
        stroke={y % PX_PER_M === 0 ? C.gridBold : C.grid} strokeWidth={y % PX_PER_M === 0 ? 1 : 0.5} />,
    )
  }

  const rulers = []
  for (let m = 0; m <= stageW; m++) {
    rulers.push(
      <text key={`rt${m}`} x={m * PX_PER_M} y={-8} textAnchor="middle" fontSize={10}
        fill={C.ruler} fontFamily="'IBM Plex Mono', monospace">{m}</text>,
    )
  }
  for (let m = 0; m <= stageD; m++) {
    rulers.push(
      <text key={`rl${m}`} x={-8} y={m * PX_PER_M + 3} textAnchor="end" fontSize={10}
        fill={C.ruler} fontFamily="'IBM Plex Mono', monospace">{m}</text>,
    )
  }

  // risers and stage furniture go under everything else
  const sorted = [...elements].sort((a, b) => {
    const ra = catalogById(a.type)?.category === 'stage' ? 0 : 1
    const rb = catalogById(b.type)?.category === 'stage' ? 0 : 1
    return ra - rb
  })

  return (
    <svg
      className="plot-svg"
      viewBox={`-28 -20 ${w + 56} ${h + 76}`}
      width="100%"
      role="img"
      aria-label="stage plot"
      onPointerDown={onBackgroundPointerDown}
      style={{ display: 'block', touchAction: 'none' }}
    >
      <rect x={0} y={0} width={w} height={h} fill={C.stage} stroke={C.border} strokeWidth={2} />
      {gridLines}
      {rulers}
      <text x={w / 2} y={h + 40} textAnchor="middle" fontSize={15} letterSpacing={8}
        fill={C.audience} fontFamily="'IBM Plex Mono', monospace">{audienceLabel}</text>

      {sorted.map((el) => {
        const cat = catalogById(el.type)
        if (!cat) return null
        const icon = ICONS[el.type]
        const isSel = el.id === selectedId
        return (
          <g key={el.id} transform={`translate(${el.x} ${el.y})`}>
            <g transform={`rotate(${el.rotation})`}>
              {/* transparent hit area — strokes alone don't catch pointer events */}
              <rect
                x={-cat.w / 2 - 4} y={-cat.h / 2 - 4} width={cat.w + 8} height={cat.h + 8}
                fill="transparent"
                onPointerDown={onElementPointerDown ? (e) => onElementPointerDown(e, el.id) : undefined}
                style={{ cursor: onElementPointerDown ? 'move' : 'default' }}
              />
              <g color={C.item} stroke="currentColor" fill="none" strokeLinecap="round"
                pointerEvents="none"
                transform={`translate(${-cat.w / 2} ${-cat.h / 2}) scale(${cat.w / 64} ${cat.h / 64})`}>
                <g transform="scale(1)">{icon}</g>
              </g>
            </g>
            {(el.label || !forPrint) && (
              <text
                x={0} y={cat.h / 2 + 14} textAnchor="middle" fontSize={11}
                fill={isSel ? C.sel : C.label} pointerEvents="none"
                fontFamily="'IBM Plex Mono', monospace"
              >
                {el.label || cat.name.ru}
              </text>
            )}
            {isSel && (
              <rect
                x={-cat.w / 2 - 6} y={-cat.h / 2 - 6} width={cat.w + 12} height={cat.h + 12}
                fill="none" stroke={C.sel} strokeWidth={1.5} strokeDasharray="5 4"
                pointerEvents="none"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
