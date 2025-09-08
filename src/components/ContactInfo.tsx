'use client'

import { Locale } from '@/lib/definitions'

interface ContactInfoProps {
  locale: Locale
  messages: Record<string, string>
}

export default function ContactInfo({ locale: _locale, messages }: ContactInfoProps) {
  const t = (key: string) => messages[key] || key

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl divide-y divide-border lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
            <div>
              <h2 className="text-pretty text-foreground">{t('contactInfo.getInTouch')}</h2>
              <p className="mt-4 text-base/7 text-muted-foreground">
                {t('contactInfo.getInTouchSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">              <div className="rounded-2xl bg-card p-10 border border-border">
              <h3 className="text-base/7 text-foreground">{t('contactInfo.businessDevelopment')}</h3>
              <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a href="mailto:sales@issi.com" className="font-semibold text-primary">
                      sales@issi.com
                    </a>
                  </dd>
                </div>
                <div className="mt-1">
                  <dt className="sr-only">Phone number</dt>
                  <dd>301-982-9700</dd>
                </div>
              </dl>
            </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.mediaInquiries')}</h3>
                <dl className="mt-3 space-y-1">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:press@issi.com" className="font-semibold text-primary">
                        press@issi.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>301-982-9700</dd>
                  </div>
                </dl>
              </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.careers')}</h3>
                <dl className="mt-3 space-y-1">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:careers@issi.com" className="font-semibold text-primary">
                        careers@issi.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>301-982-9700</dd>
                  </div>
                </dl>
              </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.support')}</h3>
                <dl className="mt-3 space-y-1">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:support@issi.com" className="font-semibold text-primary">
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
            <div>              <h2 className="text-pretty text-foreground">{t('contactInfo.locations')}</h2>
              <p className="mt-4 text-base/7 text-muted-foreground">
                {t('contactInfo.locationsSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">              <div className="rounded-2xl bg-card p-10 border border-border">
              <h3 className="text-base/7 text-foreground">{t('contactInfo.headquarters')}</h3>
              <address className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>7337 Hanover Pkwy, Suite A</p>
                <p>Greenbelt, MD 20770</p>
              </address>
            </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.virginiaOffice')}</h3>
                <address className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>1800 Diagonal Road</p>
                  <p>Alexandria, VA 22314</p>
                </address>
              </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.westCoast')}</h3>
                <address className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Suite 1200</p>
                  <p>San Francisco, CA 94105</p>
                </address>
              </div>              <div className="rounded-2xl bg-card p-10 border border-border">
                <h3 className="text-base/7 text-foreground">{t('contactInfo.midwest')}</h3>
                <address className="mt-3 space-y-1 text-sm text-muted-foreground">
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
