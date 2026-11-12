import { useState } from 'react'
import { parseRiderText, type ParsedRider } from '../lib/importRider'
import { useI18n } from '../lib/i18n'

interface Props {
  open: boolean
  onClose: () => void
  onApply: (parsed: ParsedRider) => void
}

const STAND_RU: Record<string, string> = {
  boom: 'журавль', short: 'низкая', straight: 'прямая', clip: 'клипса', none: '—',
}

export default function ImportDialog({ open, onClose, onApply }: Props) {
  const { t } = useI18n()
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState<ParsedRider | null>(null)

  if (!open) return null

  const doParse = () => setParsed(parseRiderText(text))
  const apply = () => {
    if (parsed && (parsed.channels.length || parsed.mixes.length)) onApply(parsed)
    setText('')
    setParsed(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl border border-border bg-card p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 text-sm font-semibold">{t('importTitle')}</div>
        <div className="mb-3 text-xs text-muted-foreground">{t('importHint')}</div>

        <textarea
          className="h-40 w-full resize-y rounded-lg border border-input bg-background p-2 font-mono text-xs outline-none focus:border-primary"
          placeholder={t('importPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-3 flex gap-2">
          <button
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-black hover:opacity-90"
            onClick={doParse}
          >
            {t('importParse')}
          </button>
          <div className="flex-1" />
          <button className="rounded-lg border border-input px-3 py-1.5 text-xs hover:border-primary" onClick={onClose}>
            {t('cancel')}
          </button>
          {parsed && (parsed.channels.length > 0 || parsed.mixes.length > 0) && (
            <button
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              onClick={apply}
            >
              {t('importApply')}
            </button>
          )}
        </div>

        {parsed && (
          <div className="mt-3 min-h-0 flex-1 overflow-y-auto rounded-lg border border-border">
            {parsed.channels.length === 0 && parsed.mixes.length === 0 ? (
              <div className="p-3 text-xs text-muted-foreground">{t('importNothing')}</div>
            ) : (
              <>
                {parsed.channels.length > 0 && (
                  <>
                    <div className="border-b border-border bg-background/60 px-3 py-1.5 text-[11px] font-medium">
                      {t('importFound')}: {parsed.channels.length}
                    </div>
                    <table className="w-full text-xs">
                      <tbody>
                        {parsed.channels.map((c, i) => (
                          <tr key={i} className="border-b border-border/40">
                            <td className="px-2 py-1 font-mono text-primary">{c.ch ?? '—'}</td>
                            <td className="px-2 py-1">{c.instrument}</td>
                            <td className="px-2 py-1 text-muted-foreground">{c.mic || '?'}</td>
                            <td className="px-2 py-1 text-muted-foreground">{STAND_RU[c.stand]}</td>
                            <td className="px-2 py-1 text-muted-foreground">{c.phantom ? '48В' : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                {parsed.mixes.length > 0 && (
                  <>
                    <div className="border-y border-border bg-background/60 px-3 py-1.5 text-[11px] font-medium">
                      {t('importFoundMixes')}: {parsed.mixes.length}
                    </div>
                    <table className="w-full text-xs">
                      <tbody>
                        {parsed.mixes.map((m, i) => (
                          <tr key={i} className="border-b border-border/40">
                            <td className="px-2 py-1 font-mono text-primary">{m.name}</td>
                            <td className="px-2 py-1">{m.forWhom}</td>
                            <td className="px-2 py-1 text-muted-foreground">{m.wedge}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
