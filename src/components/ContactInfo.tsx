'use client'

import { Locale } from '@/lib/definitions'

interface ContactInfoProps {
  locale: Locale
  messages: any
}

export default function ContactInfo({ locale: _locale, messages }: ContactInfoProps) {
  const t = (key: string) => messages[key] || key

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl divide-y divide-slate-100 dark:divide-slate-800 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white">{t('contactInfo.getInTouch')}</h2>
              <p className="mt-4 text-base/7 text-slate-600 dark:text-slate-400">
                {t('contactInfo.getInTouchSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
              <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.businessDevelopment')}</h3>
              <dl className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400">
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a href="mailto:sales@issi.com" className="font-semibold text-blue-600 dark:text-blue-400">
                      sales@issi.com
                    </a>
                  </dd>
                </div>
                <div className="mt-1">
                  <dt className="sr-only">Phone number</dt>
                  <dd>301-982-9700</dd>
                </div>
              </dl>
            </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.mediaInquiries')}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:press@issi.com" className="font-semibold text-blue-600 dark:text-blue-400">
                        press@issi.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>301-982-9700</dd>
                  </div>
                </dl>
              </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.careers')}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:careers@issi.com" className="font-semibold text-blue-600 dark:text-blue-400">
                        careers@issi.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>301-982-9700</dd>
                  </div>
                </dl>
              </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.support')}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:support@issi.com" className="font-semibold text-blue-600 dark:text-blue-400">
                        support@issi.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>1-888-810-3661 (Toll Free)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
            <div>              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white">{t('contactInfo.locations')}</h2>
              <p className="mt-4 text-base/7 text-slate-600 dark:text-slate-400">
                {t('contactInfo.locationsSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
              <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.headquarters')}</h3>
              <address className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400 not-italic">
                <p>7337 Hanover Pkwy, Suite A</p>
                <p>Greenbelt, MD 20770</p>
              </address>
            </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.virginiaOffice')}</h3>
                <address className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400 not-italic">
                  <p>1800 Diagonal Road</p>
                  <p>Alexandria, VA 22314</p>
                </address>
              </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.westCoast')}</h3>
                <address className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400 not-italic">
                  <p>Suite 1200</p>
                  <p>San Francisco, CA 94105</p>
                </address>
              </div>              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-300 dark:border-slate-600">
                <h3 className="text-base/7 font-semibold text-slate-900 dark:text-white">{t('contactInfo.midwest')}</h3>
                <address className="mt-3 space-y-1 text-sm/6 text-slate-600 dark:text-slate-400 not-italic">
                  <p>233 S Wacker Dr</p>
                  <p>Chicago, IL 60606</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
