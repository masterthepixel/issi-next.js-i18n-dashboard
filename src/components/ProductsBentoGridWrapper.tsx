'use client';

import ProductsBentoGrid from './ProductsBentoGrid';

interface ProductsBentoGridWrapperProps {
  locale: string;
  messages: any;
}

export default function ProductsBentoGridWrapper({ locale: _locale, messages: _messages }: ProductsBentoGridWrapperProps) {
  return (
    <ProductsBentoGrid />
  );
}
