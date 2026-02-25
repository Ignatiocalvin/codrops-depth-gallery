import STILL_LIFE01 from '@/assets/still-life/still-life-01.webp'
import STILL_LIFE02 from '@/assets/still-life/still-life-02.webp'
import STILL_LIFE03 from '@/assets/still-life/still-life-03.webp'
import STILL_LIFE04 from '@/assets/still-life/still-life-04.webp'
import STILL_LIFE05 from '@/assets/still-life/still-life-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#f2e9d6',
    textureSrc: STILL_LIFE01,
    position: { x: -1, y: 0 },
    gradient: { top: '#f2e9d6', mid: '#ffffff', bottom: '#b3b799' },
    accentColor: '#fec458',
    label: {
      serial: '01',
      title: 'amber petal study',
      subtitle: 'macro petals in amber and cream',
      meta: 'still-life archive / issue 01',
      color: '#000000',
    },
  },
  {
    fallbackColor: '#ded8d8',
    textureSrc: STILL_LIFE02,
    position: { x: 0.9, y: 0 },
    gradient: { top: '#ded8d8', mid: '#ffffff', bottom: '#f9ece0' },
    accentColor: '#a84987',
    label: {
      serial: '02',
      title: 'violet bloom on ivory',
      subtitle: 'pressed violet tones on a pale delicate background',
      meta: 'catalog detail / issue 02',
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
      serial: '03',
      title: 'ultraviolet drift',
      subtitle: 'deep magenta petals on a soft dusk gradient',
      meta: 'story sequence / issue 03',
    },
  },
  {
    fallbackColor: '#84c4f9',
    textureSrc: STILL_LIFE04,
    position: { x: 1.1, y: 0 },
    gradient: { top: '#00a2ff', mid: '#84c4f9', bottom: '#b5f2fe' },
    accentColor: '#e58993',
    label: {
      serial: '04',
      title: 'glass blue vessel',
      subtitle: 'cobalt blooms suspended in glass with floral accents',
      meta: 'campaign insert / issue 04',
    },
  },
  {
    fallbackColor: '#63714a',
    textureSrc: STILL_LIFE05,
    position: { x: -0.9, y: 0 },
    gradient: { top: '#6a7f5b', mid: '#63714a', bottom: '#8aa17e' },
    accentColor: '#f8bc53',
    label: {
      serial: '05',
      title: 'botanical afterlight',
      subtitle: 'muted petals fading into botanical shadows',
      meta: 'lookbook close / issue 05',
    },
  },
]

export { galleryPlaneData }
