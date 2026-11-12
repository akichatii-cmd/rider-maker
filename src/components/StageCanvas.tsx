import { useCallback, useEffect, useRef, useState } from 'react'
import PlotSVG, { plotSize } from './PlotSVG'
import { catalogById } from '../lib/catalog'
import { useI18n } from '../lib/i18n'
import type { ProjectStore } from '../hooks/useProject'

const SNAP = 4

export default function StageCanvas({ store }: { store: ProjectStore }) {
  const { t } = useI18n()
  const { project, addElement, updateElement, removeElement, moveElementOrder } = store
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null)

  const selected = project.elements.find((e) => e.id === selectedId) || null
  const selectedCat = selected ? catalogById(selected.type) : null

  // convert client coords → plot coords via the live CTM
  const toPlot = useCallback((clientX: number, clientY: number) => {
    const svg = wrapRef.current?.querySelector('svg') as SVGSVGElement | null
    if (!svg) return { x: 0, y: 0 }
    const pt = new DOMPoint(clientX, clientY)
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const p = pt.matrixTransform(ctm.inverse())
    return { x: p.x, y: p.y }
  }, [])

  const onElementPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setSelectedId(id)
    const el = store.project.elements.find((x) => x.id === id)
    if (!el) return
    const p = toPlot(e.clientX, e.clientY)
    dragRef.current = { id, dx: p.x - el.x, dy: p.y - el.y }
  }, [store.project.elements, toPlot])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return
    const p = toPlot(e.clientX, e.clientY)
    const { w, h } = plotSize(project.stageW, project.stageD)
    const x = Math.round(Math.min(w, Math.max(0, p.x - drag.dx)) / SNAP) * SNAP
    const y = Math.round(Math.min(h, Math.max(0, p.y - drag.dy)) / SNAP) * SNAP
    updateElement(drag.id, { x, y })
  }, [project.stageW, project.stageD, toPlot, updateElement])

  const onPointerUp = useCallback(() => { dragRef.current = null }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('application/x-rm-element')
    if (!type || !catalogById(type)) return
    const p = toPlot(e.clientX, e.clientY)
    const { w, h } = plotSize(project.stageW, project.stageD)
    const x = Math.round(Math.min(w, Math.max(0, p.x)) / SNAP) * SNAP
    const y = Math.round(Math.min(h, Math.max(0, p.y)) / SNAP) * SNAP
    addElement(type, x, y)
  }, [addElement, project.stageW, project.stageD, toPlot])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (!selectedId) return
      if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
        const el = store.project.elements.find((x) => x.id === selectedId)
        if (el) updateElement(selectedId, { rotation: (el.rotation + 45) % 360 })
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        removeElement(selectedId)
        setSelectedId(null)
      }
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, store.project.elements, updateElement, removeElement])

  const rotNorm = ((selected?.rotation ?? 0) % 360 + 360) % 360

  return (
    <div className="flex h-full flex-col">
      {selected && selectedCat && (
        <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs">
          <span className="lbl text-muted-foreground">{t('selected')}</span>
          <input
            className="h-7 w-32 rounded border border-input bg-background px-2 text-xs outline-none focus:border-primary"
            value={selected.label}
            placeholder={selectedCat.name.ru}
            onChange={(e) => updateElement(selected.id, { label: e.target.value })}
          />
          <button
            className="h-7 rounded border border-input px-2 hover:border-primary hover:text-primary"
            title={t('rotate')}
            onClick={() => updateElement(selected.id, { rotation: (rotNorm + 45) % 360 })}
          >
            ⟳ 45°
          </button>
          <label className="flex items-center gap-2">
            <span className="lbl text-muted-foreground">{t('rotateFree')}</span>
            <input
              type="range" min={0} max={359} value={rotNorm}
              className="w-28 accent-primary"
              onChange={(e) => updateElement(selected.id, { rotation: Number(e.target.value) })}
            />
            <input
              type="number" min={0} max={359} value={rotNorm}
              className="h-7 w-16 rounded border border-input bg-background px-1.5 text-xs outline-none focus:border-primary"
              onChange={(e) => {
                const v = Math.max(0, Math.min(359, Number(e.target.value) || 0))
                updateElement(selected.id, { rotation: v })
              }}
            />
            <span className="text-muted-foreground">°</span>
          </label>
          <button
            className="h-7 rounded border border-input px-2 hover:border-primary" title={t('up')}
            onClick={() => moveElementOrder(selected.id, -1)}
          >←</button>
          <button
            className="h-7 rounded border border-input px-2 hover:border-primary" title={t('down')}
            onClick={() => moveElementOrder(selected.id, 1)}
          >→</button>
          <button
            className="h-7 rounded border border-red-900/60 px-2 text-red-400 hover:bg-red-950/40"
            onClick={() => { removeElement(selected.id); setSelectedId(null) }}
          >
            {t('del')}
          </button>
        </div>
      )}

      <div
        ref={wrapRef}
        id="plot-editor"
        className="min-h-[420px] flex-1 select-none overflow-hidden rounded-lg border border-border bg-[#0f1216]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <PlotSVG
          elements={project.elements}
          stageW={project.stageW}
          stageD={project.stageD}
          selectedId={selectedId}
          onElementPointerDown={onElementPointerDown}
          onBackgroundPointerDown={() => setSelectedId(null)}
          audienceLabel={t('audience')}
        />
      </div>
    </div>
  )
}
