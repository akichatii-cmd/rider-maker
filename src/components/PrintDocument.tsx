import PlotSVG from './PlotSVG'
import { useI18n } from '../lib/i18n'
import type { ProjectStore } from '../hooks/useProject'

const STAND_RU: Record<string, string> = {
  boom: 'журавль', short: 'низкая', straight: 'прямая', clip: 'клипса', none: '—',
}

/** A4 print document — visible only in @media print (see index.css) */
export default function PrintDocument({ store }: { store: ProjectStore }) {
  const { t } = useI18n()
  const { project, inputRows, mixes } = store

  return (
    <div id="print-root">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid #111', paddingBottom: 6, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>{t('riderTitle')}</div>
          <div style={{ fontSize: 11, color: '#555' }}>{t('appName')}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{project.artist}</div>
          <div>{project.date}{project.contact ? ` · ${project.contact}` : ''}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>
        {t('stagePlotTitle')} — {project.stageW}×{project.stageD} м
      </div>
      <PlotSVG
        elements={project.elements}
        stageW={project.stageW}
        stageD={project.stageD}
        forPrint
        audienceLabel={t('audience')}
      />

      <div style={{ fontSize: 12, fontWeight: 700, margin: '14px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>
        {t('inputList')} ({inputRows.length})
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
        <thead>
          <tr>
            {[t('ch'), t('instrument'), t('micDi'), t('stand'), t('phantom'), t('note')].map((h) => (
              <th key={h} style={{ borderBottom: '1.5px solid #111', textAlign: 'left', padding: '3px 4px', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputRows.map((r) => (
            <tr key={r.key}>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px', fontFamily: "'IBM Plex Mono', monospace" }}>{r.ch}</td>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{r.instrument.ru}</td>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{r.mic}</td>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{STAND_RU[r.stand]}</td>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{r.phantom ? 'да' : ''}</td>
              <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mixes.length > 0 && (
        <>
          <div style={{ fontSize: 12, fontWeight: 700, margin: '14px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>
            {t('outputsTitle')} ({mixes.length})
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr>
                {[t('mix'), t('forWhom'), t('wedgeType'), t('note')].map((h) => (
                  <th key={h} style={{ borderBottom: '1.5px solid #111', textAlign: 'left', padding: '3px 4px', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mixes.map((m) => (
                <tr key={m.id}>
                  <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px', fontFamily: "'IBM Plex Mono', monospace" }}>{m.name}</td>
                  <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{m.forWhom}</td>
                  <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{m.wedge}</td>
                  <td style={{ borderBottom: '0.5px solid #bbb', padding: '2.5px 4px' }}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {project.notes && (
        <>
          <div style={{ fontSize: 12, fontWeight: 700, margin: '14px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{t('notes')}</div>
          <div style={{ fontSize: 11, whiteSpace: 'pre-wrap' }}>{project.notes}</div>
        </>
      )}

      <div style={{ marginTop: 16, borderTop: '1px solid #999', paddingTop: 4, fontSize: 9, color: '#777', display: 'flex', justifyContent: 'space-between' }}>
        <span>{t('appName')} · {new Date().toLocaleDateString('ru-RU')}</span>
        <span>{project.artist}</span>
      </div>
    </div>
  )
}
