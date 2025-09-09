import { Inter_Tight, Instrument_Serif } from 'next/font/google'

// Inter Tight - Primary sans-serif font
export const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif']
})

// Instrument Serif - Secondary serif font for headings
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'Times', 'serif']
})

// Combined font class names for easy application
export const fontClassNames = `${interTight.variable} ${instrumentSerif.variable}`
