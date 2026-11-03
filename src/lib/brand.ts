export const PALETTE = [
  {
    id: 'void',
    name: 'Void black',
    hex: '#05060A',
    role: 'The field. The room the can stands in.',
  },
  {
    id: 'cyan',
    name: 'Electric cyan',
    hex: '#00F0FF',
    role: 'The thermometer. The live number.',
  },
  {
    id: 'magenta',
    name: 'Hot magenta',
    hex: '#FF2E97',
    role: 'The +273.15 Stack. The tab under the wordmark.',
  },
  {
    id: 'volt',
    name: 'Volt yellow',
    hex: '#E6FF3D',
    role: 'Caution tape. No degrees required.',
  },
  {
    id: 'silver',
    name: 'Lab silver',
    hex: '#C5CED6',
    role: 'The Conversion Facts plate and the secondary type.',
  },
] as const;

export const LEAD_TAGLINE = 'Celsius + 273.15.';

export const NAME_STORY = 'Celsius, but converted.';

export const TAGLINES = [
  { text: LEAD_TAGLINE, note: 'Lead tagline. The whole brand is this equation with a period.' },
  { text: NAME_STORY, note: 'Name story. Kelvin is Celsius after you add 273.15.' },
  { text: "We don't do degrees.", note: 'Stage line. Kelvin is not a degree scale.' },
  { text: 'Now converting.', note: 'Retail line. The can is mid-calculation.' },
  { text: 'Celsius is for amateurs.', note: 'Hype line. The insult is a unit, not a body.' },
  { text: 'Do the math. Then do a Kelvin.', note: 'Whiteboard line.' },
  { text: 'Chug to 0 K.', note: 'Poster line. 0 K is the number, not a serving.' },
  { text: 'No degrees required.', note: 'Caution tape.' },
  { text: 'The footnote has been converted.', note: 'Label line. Footnotes convert footnotes.' },
] as const;

export const VOICE_RULES = [
  'Speak in conversions. If a sentence starts praising a body, replace the praise with a temperature.',
  'Numbers wear monospace. The unit stays attached to the number.',
  'A claim appears in K, °C, and °F, or it does not appear.',
  'Footnotes convert the footnotes. The arithmetic has to survive a calculator.',
  'No caffeine amounts. No servings. No health, medical, nutrition, or performance claims.',
  'Shrimp Club is the store. One stamp. One link. The room belongs to them.',
  'Hype is allowed. Precision is mandatory. Confusion is the product.',
] as const;

export const DISCLAIMER =
  'Kelvin is a parody poured into a tall can. It is not Celsius, it is not affiliated with Celsius, and it is not a health, medical, nutrition, or performance product. Intensity on this site is a unit conversion. Nothing here tells you how many to drink. Pre-orders are requests filed for Shrimp Club. Nothing is charged. No card is collected. No email is sent.';

export const SHRIMP_CLUB_URL = 'https://shrimpclub.vercel.app';

export const LOGO_ASSETS = [
  {
    src: '/brand/kelvin-lockup.svg',
    alt: 'KELVIN lockup',
    title: 'Primary lockup',
    detail: 'Ultra-wide KELVIN wordmark with the magenta +273.15 Stack tab underneath.',
  },
  {
    src: '/brand/kelvin-wordmark.svg',
    alt: 'KELVIN wordmark',
    title: 'Wordmark only',
    detail: 'The name without the tab. Use it when the Stack is already on screen.',
  },
  {
    src: '/brand/kelvin-tab.svg',
    alt: '+273.15 tab',
    title: '+273.15 monogram',
    detail: 'The Stack by itself. This is the icon when a full wordmark will not fit.',
  },
  {
    src: '/brand/kelvin-mark.svg',
    alt: '+273.15 app icon',
    title: 'App icon',
    detail: 'Square mark for favicon, apple touch, and home screen. +273 over .15.',
  },
] as const;
