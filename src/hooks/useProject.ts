import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  ChannelOverride, InputRow, ManualChannel, MonitorMix, PlacedElement, Project,
} from '../lib/types'
import { CATALOG } from '../lib/catalog'
import { CONSOLES, DEFAULT_VENUE } from '../lib/venue'
import { projectFromHash } from '../lib/share'
import { buildAudit } from '../lib/audit'
import type { Template } from '../lib/templates'

const LS_KEY = 'ridermaker-project'

let uidCounter = 0
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${(uidCounter++).toString(36)}`

function defaultProject(): Project {
  return {
    name: '',
    artist: '',
    date: new Date().toISOString().slice(0, 10),
    contact: '',
    stageW: 10,
    stageD: 7,
    elements: [],
    overrides: {},
    manualRows: [],
    mixes: [],
    consoleId: 'ql5',
    notes: '',
    venue: DEFAULT_VENUE.map((v) => ({ ...v })),
    lang: 'ru',
  }
}

function normalize(p: Project): Project {
  return {
    ...defaultProject(),
    ...p,
    elements: Array.isArray(p.elements) ? p.elements : [],
    overrides: p.overrides || {},
    manualRows: Array.isArray(p.manualRows) ? p.manualRows : [],
    mixes: Array.isArray(p.mixes) ? p.mixes : [],
    venue: Array.isArray(p.venue) && p.venue.length ? p.venue : DEFAULT_VENUE.map((v) => ({ ...v })),
  }
}

function load(): Project {
  // shared link wins over local draft
  const fromHash = projectFromHash(window.location.hash)
  if (fromHash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    return normalize(fromHash)
  }
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return normalize(JSON.parse(raw) as Project)
  } catch { /* corrupted draft — start fresh */ }
  return defaultProject()
}

export function useProject() {
  const [project, setProject] = useState<Project>(load)
  const saveTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(project)) } catch { /* quota */ }
    }, 300)
    return () => window.clearTimeout(saveTimer.current)
  }, [project])

  const patch = useCallback((p: Partial<Project>) => {
    setProject((prev) => ({ ...prev, ...p }))
  }, [])

  // ---------- elements ----------
  const addElement = useCallback((type: string, x: number, y: number) => {
    setProject((prev) => ({
      ...prev,
      elements: [...prev.elements, { id: uid('el'), type, x, y, rotation: 0, label: '' }],
    }))
  }, [])

  const updateElement = useCallback((id: string, p: Partial<PlacedElement>) => {
    setProject((prev) => ({
      ...prev,
      elements: prev.elements.map((e) => (e.id === id ? { ...e, ...p } : e)),
    }))
  }, [])

  const removeElement = useCallback((id: string) => {
    setProject((prev) => ({
      ...prev,
      elements: prev.elements.filter((e) => e.id !== id),
      overrides: Object.fromEntries(
        Object.entries(prev.overrides).filter(([k]) => !k.startsWith(`${id}:`)),
      ),
    }))
  }, [])

  const moveElementOrder = useCallback((id: string, dir: -1 | 1) => {
    setProject((prev) => {
      const idx = prev.elements.findIndex((e) => e.id === id)
      const j = idx + dir
      if (idx < 0 || j < 0 || j >= prev.elements.length) return prev
      const elements = [...prev.elements]
      ;[elements[idx], elements[j]] = [elements[j], elements[idx]]
      return { ...prev, elements }
    })
  }, [])

  const applyTemplate = useCallback((tpl: Template) => {
    setProject((prev) => {
      const sx = (prev.stageW * 64) / 640
      const sy = (prev.stageD * 64) / 448
      const elements: PlacedElement[] = tpl.items.map((it) => ({
        id: uid('el'),
        type: it.type,
        x: Math.round(it.x * sx),
        y: Math.round(it.y * sy),
        rotation: it.rotation ?? 0,
        label: it.label ?? '',
      }))
      return { ...prev, elements, overrides: {} }
    })
  }, [])

  // ---------- channel overrides ----------
  const setOverride = useCallback((key: string, p: ChannelOverride) => {
    setProject((prev) => ({
      ...prev,
      overrides: { ...prev.overrides, [key]: { ...prev.overrides[key], ...p } },
    }))
  }, [])

  // ---------- manual (imported) channels ----------
  const addManualRows = useCallback((rows: Omit<ManualChannel, 'id'>[]) => {
    setProject((prev) => ({
      ...prev,
      manualRows: [...prev.manualRows, ...rows.map((r) => ({ ...r, id: uid('mc') }))],
    }))
  }, [])

  const updateManualRow = useCallback((id: string, p: Partial<ManualChannel>) => {
    setProject((prev) => ({
      ...prev,
      manualRows: prev.manualRows.map((m) => (m.id === id ? { ...m, ...p } : m)),
    }))
  }, [])

  const removeManualRow = useCallback((id: string) => {
    setProject((prev) => ({ ...prev, manualRows: prev.manualRows.filter((m) => m.id !== id) }))
  }, [])

  // ---------- mixes ----------
  const addManualMixes = useCallback((mixes: Omit<MonitorMix, 'id'>[]) => {
    setProject((prev) => ({
      ...prev,
      mixes: [
        ...prev.mixes,
        ...mixes.map((m, i) => ({ ...m, id: `mix-man-${Date.now().toString(36)}-${i}`, manual: true })),
      ],
    }))
  }, [])

  const updateMix = useCallback((id: string, p: Partial<MonitorMix>) => {
    setProject((prev) => ({ ...prev, mixes: prev.mixes.map((m) => (m.id === id ? { ...m, ...p } : m)) }))
  }, [])

  const removeMixManual = useCallback((id: string) => {
    setProject((prev) => ({ ...prev, mixes: prev.mixes.filter((m) => m.id !== id || !m.manual) }))
  }, [])

  // ---------- venue ----------
  const setVenueQty = useCallback((id: string, qty: number) => {
    setProject((prev) => ({
      ...prev,
      venue: prev.venue.map((v) => (v.id === id ? { ...v, qty: Math.max(0, qty) } : v)),
    }))
  }, [])

  const reset = useCallback(() => setProject(defaultProject()), [])

  // ---------- derived ----------
  const inputRows = useMemo<InputRow[]>(() => {
    const rows: InputRow[] = []
    for (const el of project.elements) {
      const cat = CATALOG.find((c) => c.id === el.type)
      if (!cat || cat.isOutput) continue
      cat.channels.forEach((ct, ci) => {
        const ov = project.overrides[`${el.id}:${ci}`] || {}
        rows.push({
          key: `${el.id}:${ci}`,
          ch: rows.length + 1,
          elementId: el.id,
          instrument: el.label ? { ru: el.label, en: el.label } : ct.instrument,
          mic: ov.mic ?? ct.mic,
          stand: ov.stand ?? ct.stand,
          phantom: ov.phantom ?? ct.phantom,
          note: ov.note ?? '',
        })
      })
    }
    for (const m of project.manualRows) {
      rows.push({
        key: `manual:${m.id}`,
        ch: m.ch ?? rows.length + 1,
        elementId: '',
        instrument: { ru: m.instrument, en: m.instrument },
        mic: m.mic,
        stand: m.stand,
        phantom: m.phantom,
        note: m.note,
        manual: true,
      })
    }
    return rows
  }, [project.elements, project.overrides, project.manualRows])

  const mixes = useMemo<MonitorMix[]>(() => {
    const auto: MonitorMix[] = []
    let n = 0
    for (const el of project.elements) {
      const cat = CATALOG.find((c) => c.id === el.type)
      if (!cat || !cat.isOutput) continue
      n += 1
      auto.push({
        id: `mix-auto-${el.id}`,
        name: el.label && /^mix/i.test(el.label) ? el.label.toUpperCase() : `MIX ${n}`,
        forWhom: el.label || cat.name.ru,
        wedge: cat.name.ru,
        note: '',
      })
    }
    return [...auto, ...project.mixes]
  }, [project.elements, project.mixes])

  const audit = useMemo(
    () => buildAudit(project.venue, inputRows, mixes),
    [project.venue, inputRows, mixes],
  )

  const consoleProfile = useMemo(
    () => CONSOLES.find((c) => c.id === project.consoleId) || CONSOLES[0],
    [project.consoleId],
  )

  return {
    project, patch,
    addElement, updateElement, removeElement, moveElementOrder, applyTemplate,
    setOverride,
    addManualRows, updateManualRow, removeManualRow,
    addManualMixes, updateMix, removeMixManual,
    setVenueQty, reset,
    inputRows, mixes, audit, consoleProfile,
  }
}

export type ProjectStore = ReturnType<typeof useProject>
