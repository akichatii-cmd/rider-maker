import { createContext, useContext } from 'react'

export type Lang = 'ru' | 'en'

export const dict = {
  appName: { ru: 'РайдерМейкер', en: 'RiderMaker' },
  tagline: { ru: 'стейдж-плот и input-лист', en: 'stage plot & input list' },
  artist: { ru: 'Артист / коллектив', en: 'Artist / band' },
  artistPh: { ru: 'Название группы', en: 'Band name' },
  date: { ru: 'Дата', en: 'Date' },
  contact: { ru: 'Контакт', en: 'Contact' },
  contactPh: { ru: 'Техник, телефон', en: 'Engineer, phone' },
  stageSize: { ru: 'Сцена, м', en: 'Stage size, m' },
  width: { ru: 'Ширина', en: 'Width' },
  depth: { ru: 'Глубина', en: 'Depth' },
  palette: { ru: 'Элементы', en: 'Elements' },
  paletteHint: { ru: 'Перетащите на сцену', en: 'Drag onto the stage' },
  templates: { ru: 'Шаблоны составов', en: 'Lineup templates' },
  templatesHint: { ru: 'Типовые составы площадки', en: 'Venue house setups' },
  templateConfirm: { ru: 'Заменить текущую сцену шаблоном?', en: 'Replace current stage with template?' },
  inputList: { ru: 'Input-лист', en: 'Input list' },
  outputs: { ru: 'Мониторы', en: 'Monitors' },
  audit: { ru: 'Сверка', en: 'Audit' },
  ch: { ru: 'Канал', en: 'Ch' },
  instrument: { ru: 'Инструмент', en: 'Instrument' },
  micDi: { ru: 'Микрофон / DI', en: 'Mic / DI' },
  stand: { ru: 'Стойка', en: 'Stand' },
  phantom: { ru: '48В', en: '48V' },
  note: { ru: 'Примечание', en: 'Note' },
  emptyList: { ru: 'Добавьте элементы на сцену', en: 'Add elements to the stage' },
  console: { ru: 'Пульт', en: 'Console' },
  mix: { ru: 'Микс', en: 'Mix' },
  forWhom: { ru: 'Для кого', en: 'For whom' },
  wedgeType: { ru: 'Тип', en: 'Type' },
  mixAutoHint: { ru: 'Миксы собираются из мониторных элементов на сцене', en: 'Mixes are built from monitor elements on stage' },
  need: { ru: 'Нужно', en: 'Need' },
  have: { ru: 'Есть', en: 'Have' },
  ok: { ru: 'хватает', en: 'ok' },
  short: { ru: 'не хватает', en: 'short' },
  auditHint: { ru: 'Сверка потребности с парком площадки', en: 'Rider needs vs venue stock' },
  notes: { ru: 'Примечания', en: 'Notes' },
  notesPh: { ru: 'Патч, доп. пожелания, контакты...', en: 'Patch, extra wishes, contacts...' },
  exportPdf: { ru: 'PDF', en: 'PDF' },
  exportPng: { ru: 'PNG', en: 'PNG' },
  newProject: { ru: 'Новый', en: 'New' },
  newProjectConfirm: { ru: 'Начать новый проект? Текущий будет очищен.', en: 'Start a new project? Current one will be cleared.' },
  rotate: { ru: 'Повернуть 45°', en: 'Rotate 45°' },
  rotateFree: { ru: 'Угол', en: 'Angle' },
  del: { ru: 'Удалить', en: 'Delete' },
  selected: { ru: 'Выбрано', en: 'Selected' },
  channelsTotal: { ru: 'каналов', en: 'channels' },
  overConsole: { ru: 'Превышение каналов пульта!', en: 'Console channel count exceeded!' },
  riderTitle: { ru: 'ТЕХНИЧЕСКИЙ РАЙДЕР', en: 'TECHNICAL RIDER' },
  stagePlotTitle: { ru: 'Стейдж-плот', en: 'Stage plot' },
  outputsTitle: { ru: 'Мониторные миксы', en: 'Monitor mixes' },
  savedLocal: { ru: 'Сохранено локально', en: 'Saved locally' },
  up: { ru: 'Выше', en: 'Up' },
  down: { ru: 'Ниже', en: 'Down' },
  importRider: { ru: 'Импорт', en: 'Import' },
  importTitle: { ru: 'Импорт райдера группы', en: 'Import band rider' },
  importHint: { ru: 'Вставьте текст input-листа или мониторных миксов — распознаем каналы, микрофоны и миксы', en: 'Paste input list or monitor mixes text — we detect channels, mics and mixes' },
  importPlaceholder: { ru: '1 | Kick | Beta 52A\n2 | Snare | SM57\n...\nMix 1 | Вокал | wedge', en: '1 | Kick | Beta 52A\n2 | Snare | SM57\n...\nMix 1 | Vocals | wedge' },
  importParse: { ru: 'Распознать', en: 'Parse' },
  importFound: { ru: 'Найдено каналов', en: 'Channels found' },
  importFoundMixes: { ru: 'Найдено миксов', en: 'Mixes found' },
  importNothing: { ru: 'Ничего не распознано — проверьте формат', en: 'Nothing recognized — check the format' },
  importApply: { ru: 'Добавить в райдер', en: 'Add to rider' },
  cancel: { ru: 'Отмена', en: 'Cancel' },
  shareLink: { ru: 'Ссылка', en: 'Share' },
  shareCopied: { ru: 'Ссылка скопирована', en: 'Link copied' },
  exportXlsx: { ru: 'XLSX', en: 'XLSX' },
  sheetInput: { ru: 'Input-лист', en: 'Input list' },
  sheetMixes: { ru: 'Миксы', en: 'Mixes' },
  sheetAudit: { ru: 'Сверка', en: 'Audit' },
  diff: { ru: 'Разница', en: 'Diff' },
  manualTag: { ru: 'импорт', en: 'import' },
  itemCol: { ru: 'Позиция', en: 'Item' },
  audience: { ru: 'ЗРИТЕЛИ', en: 'AUDIENCE' },
} as const

export type DictKey = keyof typeof dict

export interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: DictKey) => string
}

export const I18nContext = createContext<I18n>({
  lang: 'ru',
  setLang: () => {},
  t: (k) => dict[k].ru,
})

export const useI18n = () => useContext(I18nContext)

export function translate(lang: Lang, k: DictKey): string {
  return dict[k][lang]
}
