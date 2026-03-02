import STILL_LIFE01 from '@/assets/still-life/still-life-01.webp'
import STILL_LIFE02 from '@/assets/still-life/still-life-02.webp'
import STILL_LIFE03 from '@/assets/still-life/still-life-03.webp'
import STILL_LIFE04 from '@/assets/still-life/still-life-04.webp'
import STILL_LIFE05 from '@/assets/still-life/still-life-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#FECA4F',
    accentColor: '#FECA4F',
    textureSrc: STILL_LIFE01,
    position: { x: -0.9, y: 0 },
    bgColor: '#fffaf0',
    blob1Color: '#ffdf94',
    blob2Color: '#FCE7C4',
    label: {
      word: 'golden',
      line: 'single stem',
      pms: 'PMS Black 6 C',
      color: '#2e2e2e',
    },
  },
  {
    fallbackColor: '#80455A',
    accentColor: '#80455A',
    textureSrc: STILL_LIFE02,
    position: { x: 1, y: 0 },
    bgColor: '#fffaf0',
    blob1Color: '#d29a41',
    blob2Color: '#bb96af',
    label: {
      word: 'violet',
      line: 'pressed bloom',
      pms: 'PMS 7585 C',
      color: '#2e2e2e',
    },
  },
  {
    fallbackColor: '#FA7B71',
    accentColor: '#FA7B71',
    textureSrc: STILL_LIFE03,
    position: { x: -0.9, y: 0 },
    bgColor: '#5f81ab',
    blob1Color: '#f88b8d',
    blob2Color: '#cfbbdd',
    label: {
      word: 'afterglow',
      line: 'double exposure',
      pms: 'PMS 468 C',
      color: '#f4f4f4',
    },
  },
  {
    fallbackColor: '#3C72C6',
    accentColor: '#3C72C6',
    textureSrc: STILL_LIFE04,
    position: { x: 1.1, y: 0 },
    bgColor: '#5B9BC2',
    blob1Color: '#ffaa00',
    blob2Color: '#00e1ff',
    label: {
      word: 'cobalt',
      line: 'glass infusion',
      pms: 'PMS 1795 C',
      color: '#f4f4f4',
    },
  },
  {
    fallbackColor: '#FDD895',
    accentColor: '#FDD895',
    textureSrc: STILL_LIFE05,
    position: { x: -0.9, y: 0 },
    bgColor: '#7D936E',
    blob1Color: '#FDD895',
    blob2Color: '#A5B599',
    label: {
      word: 'meadow',
      line: 'wind study',
      pms: 'PMS 7409 C',
      color: '#f4f4f4',
    },
  },
]

export { galleryPlaneData }
