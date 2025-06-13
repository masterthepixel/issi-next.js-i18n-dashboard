'use client';

import ProductsBentoGrid from './ProductsBentoGrid';

interface ProductsBentoGridWrapperProps {
  locale: string;
  messages: any;
}

export default function ProductsBentoGridWrapper({ locale: _locale, messages: _messages }: ProductsBentoGridWrapperProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <ProductsBentoGrid />
    </section>
  );
}
