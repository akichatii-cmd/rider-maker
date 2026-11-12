import { useState } from 'react'
import { CATALOG, CATEGORY_LABELS, ICONS, catalogById } from '../lib/catalog'
import { TEMPLATES } from '../lib/templates'
import { useI18n } from '../lib/i18n'
import type { ProjectStore } from '../hooks/useProject'
import type { CatalogItem } from '../lib/types'

const CATEGORY_ORDER: CatalogItem['category'][] = [
  'drums', 'backline', 'mics', 'orchestra', 'monitors', 'dj', 'stage',
]

export default function Palette({ store }: { store: ProjectStore }) {
  const { t, lang } = useI18n()
  const { addElement, applyTemplate, project } = store
  const [open, setOpen] = useState<Record<string, boolean>>({
    drums: true, backline: true, mics: true, monitors: true,
    orchestra: false, dj: false, stage: false,
  })

  const addAtCenter = (type: string) => {
    addElement(type, Math.round((project.stageW * 64) / 2), Math.round((project.stageD * 64) / 2))
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <div>
        <div className="lbl mb-1 text-muted-foreground">{t('templates')}</div>
        <div className="grid grid-cols-2 gap-1.5">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              className="rounded border border-input bg-background px-2 py-1.5 text-left text-xs hover:border-primary hover:text-primary"
              title={t('templatesHint')}
              onClick={() => {
                if (project.elements.length === 0 || window.confirm(t('templateConfirm'))) {
                  applyTemplate(tpl)
                }
              }}
            >
              {tpl.name[lang]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="lbl mb-1 text-muted-foreground">{t('palette')}</div>
        <div className="mb-2 text-[11px] text-muted-foreground">{t('paletteHint')}</div>
        {CATEGORY_ORDER.map((cat) => {
          const items = CATALOG.filter((c) => c.category === cat)
          const isOpen = open[cat]
          return (
            <div key={cat} className="mb-1 rounded border border-border">
              <button
                className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium hover:text-primary"
                onClick={() => setOpen((o) => ({ ...o, [cat]: !o[cat] }))}
              >
                <span>{CATEGORY_LABELS[cat][lang]}</span>
                <span className="text-muted-foreground">{isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <div className="grid grid-cols-3 gap-1 border-t border-border p-1.5">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/x-rm-element', item.id)
                        e.dataTransfer.effectAllowed = 'copy'
                      }}
                      onClick={() => addAtCenter(item.id)}
                      className="flex flex-col items-center gap-1 rounded border border-transparent p-1.5 hover:border-primary hover:bg-card"
                      title={item.name[lang]}
                    >
                      <svg viewBox="0 0 64 64" className="h-9 w-9 text-foreground/80"
                        stroke="currentColor" fill="none" strokeLinecap="round">
                        {ICONS[item.id]}
                      </svg>
                      <span className="w-full truncate text-center text-[10px] leading-tight text-muted-foreground">
                        {item.name[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { catalogById }
