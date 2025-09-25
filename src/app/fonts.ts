import { Instrument_Serif, Inter } from 'next/font/google'

// Inter - Primary sans-serif font (variable font for better performance)
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif']
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
export const fontClassNames = `${inter.variable} ${instrumentSerif.variable}`
