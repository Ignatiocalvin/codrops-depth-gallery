import FLOWER01 from '@/assets/flower-01.webp'
import FLOWER02 from '@/assets/flower-02.webp'
import FLOWER03 from '@/assets/flower-03.webp'
import FLOWER04 from '@/assets/flower-04.webp'
import FLOWER05 from '@/assets/flower-05.webp'

const galleryPlaneData = [
  {
    fallbackColor: '#b07d4a',
    accentColor: '#d4a373',
    textureSrc: FLOWER01,
    position: { x: -0.9, y: 0 },
    backgroundColor: '#fff9ed',
    blob1Color: '#f3d5b5',
    blob2Color: '#8b5e34',
    label: {
      word: 'About',
      color: '#3d2b1f',
      specs: [
        { label: 'Scientist', value: 'Machine Learning' },
        { label: 'Engineer', value: 'Cloud & Data' },
        { label: 'Analyst', value: 'Product Insights' },
        { label: 'Developer', value: 'Backend & APIs' }
      ]
    },
  },
  {
    fallbackColor: '#d39e1e',
    accentColor: '#d39e1e',
    textureSrc: FLOWER02, // Assuming this is your second image import
    position: { x: 0.3, y: 0 },
    backgroundColor: '#6a97b8',
    blob1Color: '#fbd31c',
    blob2Color: '#303b42',
    label: {
      word: 'Experience',
      color: '#f4f4f4',
      specs: [
        { label: 'P&G', value: 'Data Engineer | Project Manager' },
        { label: 'Merck', value: 'Data Scientist | Software Developer' },
        { label: 'Deloitte', value: 'Data Engineer | Software Developer' },
        { label: '9fwr', value: 'Analytics Engineer | Consultant' }
      ]
    },
  },
  {
    fallbackColor: '#fa7b71',
    accentColor: '#fa7b71',
    textureSrc: FLOWER03,
    position: { x: -0.7, y: 0 },
    backgroundColor: '#5f81ab',
    blob1Color: '#f88b8d',
    blob2Color: '#cfbbdd',
    label: {
      word: 'Education',
      color: '#f4f4f4',
      specs: [
        { label: 'M.Sc.', value: 'University of Mannheim' },
        { label: 'Exchange', value: 'Seoul National University' },
        { label: 'B.Sc.', value: 'Freie University Berlin' },
        { label: 'Thesis', value: 'Explainable Computer Vision' }
      ]
    },
  },
  {
    fallbackColor: '#3c72c6',
    accentColor: '#3c72c6',
    textureSrc: FLOWER04,
    position: { x: 1, y: 0 },
    backgroundColor: '#5b9bc2',
    blob1Color: '#ffaa00',
    blob2Color: '#00e1ff',
    label: {
      word: 'Creator, Founder',
      color: '#f4f4f4',
      specs: [
        { label: 'Content', value: '@indonesian.bercerita (21k followers)', url: 'https://instagram.com/indonesian.bercerita'},
        { label: 'Co-Founder', value: 'Google Developers Student Club (400+ Members)' },
        { label: 'Cinema', value: '@ignatiocalvin', url: 'https://instagram.com/ignatiocalvin' },
        { label: 'Founder', value: 'klipin.ai (building)' }
      ]
    },
  },
  {
    fallbackColor: '#9e4a3b',
    accentColor: '#9e4a3b',
    textureSrc: FLOWER05, // Update this variable name to your new image
    position: { x: -0.7, y: 0 },
    backgroundColor: '#eed8c9', 
    blob1Color: '#c76b58',
    blob2Color: '#b9825b',
    label: {
      word: 'Connect',
      color: '#3a221c',
      specs: [
        { 
          label: 'Email', 
          value: 'ignacalvin@gmail.com', 
          url: 'mailto:ignacalvin@gmail.com' 
        },
        { 
          label: 'LinkedIn', 
          value: 'in/ignatiocalvin', 
          url: 'https://www.linkedin.com/in/ignatio-calvin-hidayat/' 
        },
        { 
          label: 'GitHub', 
          value: '@Ignatiocalvin', 
          url: 'https://github.com/Ignatiocalvin' 
        },
        { 
          label: 'Resume', 
          value: 'Download', 
          url: '/CV_Ignatio.docx' // See the note below about hosting this!
        }
      ]
    },
  },
]

export { galleryPlaneData }