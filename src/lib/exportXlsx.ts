import type { InputRow, MonitorMix } from './types'
import type { AuditLine } from './audit'

const STAND_LABEL: Record<string, string> = {
  boom: 'журавль',
  short: 'низкая',
  straight: 'прямая',
  clip: 'клипса',
  none: '—',
}

export async function exportXlsx(
  artist: string,
  inputRows: InputRow[],
  mixes: MonitorMix[],
  audit: AuditLine[],
) {
  const XLSX = await import('xlsx')
  const wb = XLSX.utils.book_new()

  const inputData = [
    ['Канал', 'Инструмент', 'Микрофон / DI', 'Стойка', '48В', 'Примечание'],
    ...inputRows.map((r) => [
      r.ch,
      r.instrument.ru,
      r.mic,
      STAND_LABEL[r.stand] ?? r.stand,
      r.phantom ? 'да' : '',
      r.note,
    ]),
  ]
  const wsInput = XLSX.utils.aoa_to_sheet(inputData)
  wsInput['!cols'] = [{ wch: 7 }, { wch: 24 }, { wch: 22 }, { wch: 12 }, { wch: 6 }, { wch: 30 }]
  XLSX.utils.book_append_sheet(wb, wsInput, 'Input-лист')

  const mixData = [
    ['Микс', 'Для кого', 'Тип', 'Примечание'],
    ...mixes.map((m) => [m.name, m.forWhom, m.wedge, m.note]),
  ]
  const wsMix = XLSX.utils.aoa_to_sheet(mixData)
  wsMix['!cols'] = [{ wch: 10 }, { wch: 24 }, { wch: 22 }, { wch: 30 }]
  XLSX.utils.book_append_sheet(wb, wsMix, 'Миксы')

  const auditData = [
    ['Позиция', 'Нужно', 'Есть', 'Разница'],
    ...audit.map((a) => [a.name, a.need, a.have, a.have - a.need]),
  ]
  const wsAudit = XLSX.utils.aoa_to_sheet(auditData)
  wsAudit['!cols'] = [{ wch: 28 }, { wch: 8 }, { wch: 8 }, { wch: 8 }]
  XLSX.utils.book_append_sheet(wb, wsAudit, 'Сверка')

  const safe = (artist || 'rider').replace(/[\\/:*?"<>|]/g, '_')
  XLSX.writeFile(wb, `${safe}-input-list.xlsx`)
}
