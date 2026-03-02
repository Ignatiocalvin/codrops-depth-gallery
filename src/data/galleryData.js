import FLOWER01 from '@/assets/flower-01.webp'
import FLOWER02 from '@/assets/flower-02.webp'
import FLOWER03 from '@/assets/flower-03.webp'
import FLOWER04 from '@/assets/flower-04.webp'
import FLOWER05 from '@/assets/flower-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#FECA4F',
    accentColor: '#FECA4F',
    textureSrc: FLOWER01,
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
    textureSrc: FLOWER02,
    position: { x: 0.8, y: 0 },
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
    textureSrc: FLOWER03,
    position: { x: -0.7, y: 0 },
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
    textureSrc: FLOWER04,
    position: { x: 1, y: 0 },
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
    textureSrc: FLOWER05,
    position: { x: -0.7, y: 0 },
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
