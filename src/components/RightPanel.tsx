import { useState } from 'react'
import { useI18n } from '../lib/i18n'
import type { ProjectStore } from '../hooks/useProject'
import type { ChannelTemplate } from '../lib/types'

const STANDS: ChannelTemplate['stand'][] = ['boom', 'short', 'straight', 'clip', 'none']
const STAND_RU: Record<string, string> = {
  boom: 'журавль', short: 'низкая', straight: 'прямая', clip: 'клипса', none: '—',
}

type Tab = 'input' | 'outputs' | 'audit'

export default function RightPanel({ store }: { store: ProjectStore }) {
  const { t, lang } = useI18n()
  const {
    inputRows, mixes, audit, consoleProfile,
    setOverride, updateManualRow, removeManualRow, addManualRows,
    updateMix, removeMixManual, setVenueQty,
  } = store
  const [tab, setTab] = useState<Tab>('input')

  const overConsole = inputRows.length > consoleProfile.inputs

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-border">
        {(['input', 'outputs', 'audit'] as Tab[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex-1 px-2 py-2 text-xs font-medium ${
              tab === k ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {k === 'input' ? t('inputList') : k === 'outputs' ? t('outputs') : t('audit')}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'input' && (
          <div>
            <div className={`flex items-center justify-between px-3 py-1.5 text-[11px] ${overConsole ? 'text-red-400' : 'text-muted-foreground'}`}>
              <span>
                {inputRows.length} {t('channelsTotal')} · {consoleProfile.name} ({consoleProfile.inputs})
              </span>
              {overConsole && <span className="font-medium">{t('overConsole')}</span>}
              <button
                className="rounded border border-input px-1.5 py-0.5 text-[11px] hover:border-primary hover:text-primary"
                onClick={() => addManualRows([{ instrument: '', mic: '', stand: 'boom', phantom: false, note: '' }])}
              >+</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-2 py-1">{t('ch')}</th>
                  <th className="px-1 py-1">{t('instrument')}</th>
                  <th className="px-1 py-1">{t('micDi')}</th>
                  <th className="px-1 py-1">{t('stand')}</th>
                  <th className="px-1 py-1">{t('phantom')}</th>
                  <th className="px-1 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {inputRows.map((r) => (
                  <tr key={r.key} className="border-b border-border/50 align-middle">
                    <td className="px-2 py-1 font-mono text-muted-foreground">{r.ch}</td>
                    <td className="px-1 py-1">
                      {r.manual ? (
                        <input
                          className="w-full min-w-20 rounded border border-transparent bg-transparent px-1 py-0.5 text-xs hover:border-input focus:border-primary focus:outline-none"
                          value={r.instrument.ru}
                          onChange={(e) => updateManualRow(r.key.slice(7), { instrument: e.target.value })}
                        />
                      ) : (
                        <span>{r.instrument[lang]}</span>
                      )}
                      {r.manual && (
                        <span className="ml-1 rounded bg-primary/15 px-1 text-[9px] text-primary">{t('manualTag')}</span>
                      )}
                    </td>
                    <td className="px-1 py-1">
                      <input
                        className="w-full min-w-20 rounded border border-transparent bg-transparent px-1 py-0.5 text-xs hover:border-input focus:border-primary focus:outline-none"
                        value={r.mic}
                        list="rm-mic-list"
                        onChange={(e) =>
                          r.manual
                            ? updateManualRow(r.key.slice(7), { mic: e.target.value })
                            : setOverride(r.key, { mic: e.target.value })
                        }
                      />
                    </td>
                    <td className="px-1 py-1">
                      <select
                        className="rounded border border-transparent bg-transparent px-0.5 py-0.5 text-xs hover:border-input focus:border-primary focus:outline-none"
                        value={r.stand}
                        onChange={(e) =>
                          r.manual
                            ? updateManualRow(r.key.slice(7), { stand: e.target.value as ChannelTemplate['stand'] })
                            : setOverride(r.key, { stand: e.target.value as ChannelTemplate['stand'] })
                        }
                      >
                        {STANDS.map((s) => <option key={s} value={s}>{STAND_RU[s]}</option>)}
                      </select>
                    </td>
                    <td className="px-1 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={r.phantom}
                        onChange={(e) =>
                          r.manual
                            ? updateManualRow(r.key.slice(7), { phantom: e.target.checked })
                            : setOverride(r.key, { phantom: e.target.checked })
                        }
                      />
                    </td>
                    <td className="px-1 py-1 text-center">
                      {r.manual && (
                        <button
                          className="text-muted-foreground hover:text-red-400"
                          onClick={() => removeManualRow(r.key.slice(7))}
                        >✕</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {inputRows.length === 0 && (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">{t('emptyList')}</div>
            )}
            <datalist id="rm-mic-list">
              {store.project.venue.filter((v) => v.category === 'mic' || v.category === 'di').map((v) => (
                <option key={v.id} value={v.name} />
              ))}
            </datalist>
          </div>
        )}

        {tab === 'outputs' && (
          <div>
            <div className="px-3 py-1.5 text-[11px] text-muted-foreground">
              {mixes.length} {t('mix')} · {consoleProfile.name} ({consoleProfile.outputs} out)
            </div>
            {mixes.length === 0 && (
              <div className="px-3 py-2 text-[11px] text-muted-foreground">{t('mixAutoHint')}</div>
            )}
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-2 py-1">{t('mix')}</th>
                  <th className="px-1 py-1">{t('forWhom')}</th>
                  <th className="px-1 py-1">{t('wedgeType')}</th>
                  <th className="px-1 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {mixes.map((m) => (
                  <tr key={m.id} className="border-b border-border/50">
                    <td className="px-2 py-1 font-mono">{m.name}</td>
                    <td className="px-1 py-1">
                      {m.manual ? (
                        <input
                          className="w-full min-w-20 rounded border border-transparent bg-transparent px-1 py-0.5 text-xs hover:border-input focus:border-primary focus:outline-none"
                          value={m.forWhom}
                          onChange={(e) => updateMix(m.id, { forWhom: e.target.value })}
                        />
                      ) : (
                        <span>{m.forWhom}</span>
                      )}
                      {m.manual && (
                        <span className="ml-1 rounded bg-primary/15 px-1 text-[9px] text-primary">{t('manualTag')}</span>
                      )}
                    </td>
                    <td className="px-1 py-1 text-muted-foreground">{m.wedge}</td>
                    <td className="px-1 py-1 text-center">
                      {m.manual && (
                        <button className="text-muted-foreground hover:text-red-400"
                          onClick={() => removeMixManual(m.id)}>✕</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'audit' && (
          <div>
            <div className="px-3 py-1.5 text-[11px] text-muted-foreground">{t('auditHint')}</div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-2 py-1">{t('itemCol')}</th>
                  <th className="px-1 py-1 text-center">{t('need')}</th>
                  <th className="px-1 py-1 text-center">{t('have')}</th>
                  <th className="px-1 py-1 text-center">{t('diff')}</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((a) => {
                  const d = a.have - a.need
                  return (
                    <tr key={a.id} className="border-b border-border/50">
                      <td className="px-2 py-1">{a.name}</td>
                      <td className="px-1 py-1 text-center font-mono">{a.need}</td>
                      <td className="px-1 py-1 text-center">
                        {a.id.startsWith('audit-') ? (
                          <span className="font-mono">{a.have}</span>
                        ) : (
                          <input
                            type="number" min={0}
                            className="w-14 rounded border border-transparent bg-transparent px-1 py-0.5 text-center font-mono text-xs hover:border-input focus:border-primary focus:outline-none"
                            value={a.have}
                            onChange={(e) => setVenueQty(a.id, Number(e.target.value) || 0)}
                          />
                        )}
                      </td>
                      <td className={`px-1 py-1 text-center font-mono ${d < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {d < 0 ? `${d} ${t('short')}` : t('ok')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
