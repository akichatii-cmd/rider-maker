import { useMemo } from 'react'
import Header from '../components/Header'
import Palette from '../components/Palette'
import StageCanvas from '../components/StageCanvas'
import RightPanel from '../components/RightPanel'
import PrintDocument from '../components/PrintDocument'
import { I18nContext, dict, type DictKey } from '../lib/i18n'
import { useProject } from '../hooks/useProject'

export default function Home() {
  const store = useProject()
  const { project, patch } = store

  const i18n = useMemo(
    () => ({
      lang: project.lang,
      setLang: (l: 'ru' | 'en') => patch({ lang: l }),
      t: (k: DictKey) => dict[k][project.lang],
    }),
    [project.lang, patch],
  )

  return (
    <I18nContext.Provider value={i18n}>
      <div className="flex min-h-dvh flex-col bg-background text-foreground lg:h-screen lg:overflow-hidden">
        <Header store={store} />
        <div className="flex flex-1 flex-col gap-2 p-2 lg:min-h-0 lg:flex-row">
          <aside className="w-full shrink-0 rounded-lg border border-border bg-card lg:w-[248px] lg:overflow-y-auto">
            <Palette store={store} />
          </aside>
          <main className="min-w-0 flex-1">
            <StageCanvas store={store} />
          </main>
          <aside className="w-full shrink-0 rounded-lg border border-border bg-card lg:w-[420px] lg:overflow-hidden">
            <RightPanel store={store} />
          </aside>
        </div>
        <div className="px-3 pb-1 text-right text-[10px] text-muted-foreground">
          {i18n.t('savedLocal')}
        </div>
      </div>
      <PrintDocument store={store} />
    </I18nContext.Provider>
  )
}
