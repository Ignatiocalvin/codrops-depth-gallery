import STILL_LIFE01 from '@/assets/still-life/still-life-01.webp'
import STILL_LIFE02 from '@/assets/still-life/still-life-02.webp'
import STILL_LIFE03 from '@/assets/still-life/still-life-03.webp'
import STILL_LIFE04 from '@/assets/still-life/still-life-04.webp'
import STILL_LIFE05 from '@/assets/still-life/still-life-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#f2e9d6',
    textureSrc: STILL_LIFE01,
    position: { x: -1.6, y: 0 },
    gradient: { top: '#f2e9d6', mid: '#ffffff', bottom: '#b3b799' },
    accentColor: '#fec458',
  },
  {
    fallbackColor: '#ded8d8',
    textureSrc: STILL_LIFE02,
    position: { x: 1.2, y: 0 },
    gradient: { top: '#ded8d8', mid: '#ffffff', bottom: '#f9ece0' },
    accentColor: '#a84987',
  },
  {
    fallbackColor: '#5f5a8e',
    textureSrc: STILL_LIFE03,
    position: { x: -0.9, y: 0 },
    gradient: { top: '#62679b', mid: '#5f5a8e', bottom: '#9477ac' },
    accentColor: '#000000',
  },
  {
    fallbackColor: '#84c4f9',
    textureSrc: STILL_LIFE04,
    position: { x: 1.8, y: 0 },
    gradient: { top: '#00a2ff', mid: '#84c4f9', bottom: '#b5f2fe' },
    accentColor: '#E58993',
  },
  {
    fallbackColor: '#63714a',
    textureSrc: STILL_LIFE05,
    position: { x: -1.3, y: 0 },
    gradient: { top: '#6a7f5b', mid: '#63714a', bottom: '#8aa17e' },
    accentColor: '#F8BC53',
  },
]

export { galleryPlaneData }
