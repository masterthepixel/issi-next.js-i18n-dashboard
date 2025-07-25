import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function CardHeader({ children }: Props) {
  return <h5 className="my-2 text-xl font-medium tracking-tight text-slate-800 dark:text-slate-200">{children}</h5>;
}
