'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { FormattedMessage } from 'react-intl'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full p-1 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >      <span className="sr-only">
        <FormattedMessage id="common.theme-switcher" />
      </span>
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-[#ffef00] fill-[#ffef00]" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6 text-[#E7E9EA]" aria-hidden="true" />
      )}
    </button>
  )
}
