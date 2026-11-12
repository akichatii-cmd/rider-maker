export interface TemplateItem {
  type: string
  x: number
  y: number
  rotation?: number
  label?: string
}

export interface Template {
  id: string
  name: { ru: string; en: string }
  items: TemplateItem[]
}

// Координаты заданы под сцену 640×448 px (10×7 м); при другом размере масштабируются
export const TEMPLATES: Template[] = [
  {
    id: 'rock4',
    name: { ru: 'Рок-квартет', en: 'Rock 4-piece' },
    items: [
      { type: 'drumkit', x: 320, y: 120, label: 'Барабаны' },
      { type: 'amp', x: 140, y: 140, label: 'Гитара 1' },
      { type: 'amp', x: 500, y: 140, label: 'Гитара 2' },
      { type: 'bassamp', x: 470, y: 90, label: 'Бас' },
      { type: 'mic_boom', x: 240, y: 330, label: 'Вокал 1' },
      { type: 'mic_boom', x: 400, y: 330, label: 'Вокал 2' },
      { type: 'di', x: 500, y: 200, label: 'Бас DI' },
      { type: 'wedge', x: 250, y: 280, label: 'Mix 1' },
      { type: 'wedge', x: 390, y: 280, label: 'Mix 2' },
      { type: 'wedge', x: 320, y: 190, rotation: 180, label: 'Mix 3' },
    ],
  },
  {
    id: 'acoustic3',
    name: { ru: 'Акустическое трио', en: 'Acoustic trio' },
    items: [
      { type: 'mic_boom', x: 220, y: 300, label: 'Вокал' },
      { type: 'mic_stand', x: 320, y: 260, label: 'Гитара' },
      { type: 'di', x: 340, y: 300, label: 'Гитара DI' },
      { type: 'keys', x: 460, y: 150, label: 'Клавиши' },
      { type: 'di', x: 500, y: 230, label: 'Keys DI L' },
      { type: 'di', x: 540, y: 230, label: 'Keys DI R' },
      { type: 'wedge', x: 220, y: 250, label: 'Mix 1' },
      { type: 'wedge', x: 330, y: 220, label: 'Mix 2' },
      { type: 'wedge', x: 460, y: 240, label: 'Mix 3' },
    ],
  },
  {
    id: 'cover5',
    name: { ru: 'Кавер-бэнд 5 чел', en: 'Cover band 5' },
    items: [
      { type: 'drumkit', x: 320, y: 110, label: 'Барабаны' },
      { type: 'amp', x: 120, y: 150, label: 'Гитара' },
      { type: 'bassamp', x: 520, y: 110, label: 'Бас' },
      { type: 'keys', x: 480, y: 200, label: 'Клавиши' },
      { type: 'mic_boom', x: 160, y: 320, label: 'Вокал 1' },
      { type: 'mic_boom', x: 320, y: 330, label: 'Вокал 2' },
      { type: 'mic_boom', x: 480, y: 320, label: 'Вокал 3' },
      { type: 'di', x: 540, y: 200, label: 'Бас DI' },
      { type: 'di', x: 440, y: 250, label: 'Keys DI' },
      { type: 'wedge', x: 160, y: 270, label: 'Mix 1' },
      { type: 'wedge', x: 320, y: 280, label: 'Mix 2' },
      { type: 'wedge', x: 480, y: 270, label: 'Mix 3' },
      { type: 'wedge', x: 320, y: 180, rotation: 180, label: 'Mix 4' },
    ],
  },
  {
    id: 'djset',
    name: { ru: 'DJ-сет', en: 'DJ set' },
    items: [
      { type: 'cdj', x: 260, y: 150, label: 'CDJ 1' },
      { type: 'djm', x: 320, y: 150, label: 'Микшер' },
      { type: 'cdj', x: 380, y: 150, label: 'CDJ 2' },
      { type: 'mic_boom', x: 320, y: 300, label: 'MC' },
      { type: 'wedge', x: 250, y: 230, rotation: 315, label: 'DJ мон L' },
      { type: 'wedge', x: 390, y: 230, rotation: 45, label: 'DJ мон R' },
    ],
  },
]
