'use client'

import { Locale } from '@/lib/definitions'
import { Field, Label, Switch } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useState } from 'react'

interface ContactSalesFormProps {
  locale: Locale
  messages: any
}

export default function ContactSalesForm({ locale, messages }: ContactSalesFormProps) {
  const t = (key: string) => messages[key] || key
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-2xl text-center">        <h2 className="text-balance text-foreground sm:text-5xl">{t('contactSales.title')}</h2>
        <p className="mt-2 text-lg/8 text-muted-foreground">{t('contactSales.subtitle')}</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block  " text-caption1068="true">
              {t('contactSales.firstName')}
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-background px-3.5 py-2 text-foreground border border-border placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block  " text-caption1706="true">
              {t('contactSales.lastName')}
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-background px-3.5 py-2 text-foreground border border-border placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block  " text-caption2362="true">
              {t('contactSales.company')}
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md bg-background px-3.5 py-2 text-foreground border border-border placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block  " text-caption3012="true">
              {t('contactSales.email')}
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-background px-3.5 py-2 text-foreground border border-border placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block  " text-caption3659="true">
              {t('contactSales.phoneNumber')}
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-background border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-muted-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary sm: " text-caption4252="true"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-muted-foreground sm:size-4"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="123-456-7890"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm: " text-caption5135="true"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block  " text-caption5457="true">
              {t('contactSales.message')}
            </label>
            <div className="mt-2.5">              <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full rounded-md bg-background px-3.5 py-2 text-foreground border border-border placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              defaultValue={''}
            />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-muted p-px ring-1 ring-border transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="size-4 transform rounded-full bg-background shadow-xs ring-1 ring-border transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="" text-caption6896="true">
              {t('contactSales.privacyText')}{' '}
              <Link href={`/${locale}/privacy`} className="font-semibold text-primary">
                {t('contactSales.privacyPolicy')}
              </Link>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center  " text-caption7317="true"
          >
            {t('contactSales.submitButton')}
          </button>
        </div>
      </form>
    </div>
  )
}
