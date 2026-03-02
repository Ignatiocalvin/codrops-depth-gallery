import STILL_LIFE01 from '@/assets/still-life/still-life-01.webp'
import STILL_LIFE02 from '@/assets/still-life/still-life-02.webp'
import STILL_LIFE03 from '@/assets/still-life/still-life-03.webp'
import STILL_LIFE04 from '@/assets/still-life/still-life-04.webp'
import STILL_LIFE05 from '@/assets/still-life/still-life-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#f2e9d6',
    textureSrc: STILL_LIFE01,
    position: { x: 0.9, y: 0 },
    gradient: { top: '#f2e9d6', mid: '#ffffff', bottom: '#b3b799' },
    accentColor: '#fec458',
    label: {
      word: 'golden',
      line: 'single stem',
      pms: 'PMS Black 6 C',
      color: '#000000',
    },
  },
  {
    fallbackColor: '#ded8d8',
    textureSrc: STILL_LIFE02,
    position: { x: -1, y: 0 },
    gradient: { top: '#ded8d8', mid: '#ffffff', bottom: '#f9ece0' },
    accentColor: '#a84987',
    label: {
      word: 'violet',
      line: 'pressed bloom',
      pms: 'PMS 7585 C',
      color: '#000000',
    },
  },

  {
    fallbackColor: '#5f5a8e',
    textureSrc: STILL_LIFE03,
    position: { x: -0.9, y: 0 },
    gradient: { top: '#62679b', mid: '#5f5a8e', bottom: '#9477ac' },
    accentColor: '#000000',
    label: {
      word: 'afterglow',
      line: 'double exposure',
      pms: 'PMS 468 C',
      color: '#f4f4f4',
    },
  },
  {
    fallbackColor: '#84c4f9',
    textureSrc: STILL_LIFE04,
    position: { x: 1.1, y: 0 },
    gradient: { top: '#00a2ff', mid: '#84c4f9', bottom: '#b5f2fe' },
    accentColor: '#e58993',
    label: {
      word: 'cobalt',
      line: 'glass infusion',
      pms: 'PMS 1795 C',
      color: '#f4f4f4',
    },
  },
  {
    fallbackColor: '#63714a',
    textureSrc: STILL_LIFE05,
    position: { x: -0.9, y: 0 },
    gradient: { top: '#6a7f5b', mid: '#63714a', bottom: '#8aa17e' },
    accentColor: '#f8bc53',
    label: {
      word: 'meadow',
      line: 'wind study',
      pms: 'PMS 7409 C',
      color: '#f4f4f4',
    },
  },
]

export { galleryPlaneData }
