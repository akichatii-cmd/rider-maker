import { useState } from 'react'
import { useI18n } from '../lib/i18n'
import { shareUrl } from '../lib/share'
import { exportXlsx } from '../lib/exportXlsx'
import { CONSOLES } from '../lib/venue'
import ImportDialog from './ImportDialog'
import type { ProjectStore } from '../hooks/useProject'

export default function Header({ store }: { store: ProjectStore }) {
  const { t, lang, setLang } = useI18n()
  const { project, patch, reset, inputRows, mixes, audit } = store
  const [importOpen, setImportOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyShare = async () => {
    const url = shareUrl(project)
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  const exportPng = () => {
    const svg = document.querySelector('#plot-editor svg') as SVGSVGElement | null
    if (!svg) return
    const xml = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    const vb = svg.viewBox.baseVal
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = vb.width * 2
      canvas.height = vb.height * 2
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#0f1216'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const a = document.createElement('a')
      a.download = `${project.artist || 'stage'}-plot.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml)
  }

  const btn = 'rounded-lg border border-input px-2.5 py-1.5 text-xs hover:border-primary hover:text-primary whitespace-nowrap'

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-3 py-2">
      <div className="mr-1 flex items-baseline gap-2">
        <span className="text-sm font-bold tracking-tight text-primary">{t('appName')}</span>
        <span className="hidden text-[10px] text-muted-foreground sm:inline">{t('tagline')}</span>
      </div>

      <input
        className="h-8 w-40 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:border-primary"
        placeholder={t('artistPh')} title={t('artist')}
        value={project.artist}
        onChange={(e) => patch({ artist: e.target.value })}
      />
      <input
        type="date"
        className="h-8 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:border-primary"
        title={t('date')}
        value={project.date}
        onChange={(e) => patch({ date: e.target.value })}
      />
      <input
        className="h-8 w-36 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:border-primary"
        placeholder={t('contactPh')} title={t('contact')}
        value={project.contact}
        onChange={(e) => patch({ contact: e.target.value })}
      />
      <select
        className="h-8 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:border-primary"
        title={t('console')}
        value={project.consoleId}
        onChange={(e) => patch({ consoleId: e.target.value })}
      >
        {CONSOLES.map((c) => (
          <option key={c.id} value={c.id}>{c.name} ({c.inputs}/{c.outputs})</option>
        ))}
      </select>

      <label className="flex items-center gap-1 text-[11px] text-muted-foreground" title={t('stageSize')}>
        <input
          type="number" min={4} max={30}
          className="h-8 w-14 rounded-lg border border-input bg-background px-1.5 text-xs outline-none focus:border-primary"
          value={project.stageW}
          onChange={(e) => patch({ stageW: Math.max(4, Number(e.target.value) || 10) })}
        />
        ×
        <input
          type="number" min={3} max={20}
          className="h-8 w-14 rounded-lg border border-input bg-background px-1.5 text-xs outline-none focus:border-primary"
          value={project.stageD}
          onChange={(e) => patch({ stageD: Math.max(3, Number(e.target.value) || 7) })}
        />
        м
      </label>

      <div className="flex-1" />

      <button className={btn} onClick={() => setImportOpen(true)}>{t('importRider')}</button>
      <button className={`${btn} ${copied ? 'border-emerald-600 text-emerald-400' : ''}`} onClick={copyShare}>
        {copied ? `✓ ${t('shareCopied')}` : t('shareLink')}
      </button>
      <button className={btn} onClick={exportPng}>{t('exportPng')}</button>
      <button className={btn} onClick={() => void exportXlsx(project.artist, inputRows, mixes, audit)}>
        {t('exportXlsx')}
      </button>
      <button className={btn} onClick={() => window.print()}>{t('exportPdf')}</button>
      <button
        className={btn}
        onClick={() => { if (window.confirm(t('newProjectConfirm'))) reset() }}
      >
        {t('newProject')}
      </button>
      <button
        className={btn}
        onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      >
        {lang === 'ru' ? 'EN' : 'RU'}
      </button>

      <ImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onApply={(parsed) => {
          store.addManualRows(parsed.channels)
          store.addManualMixes(parsed.mixes)
        }}
      />
    </header>
  )
}
