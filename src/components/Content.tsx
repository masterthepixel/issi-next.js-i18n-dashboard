import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <div className="relative z-10 w-full pb-5 px-5 lg:pb-10 lg:px-10 text-slate-900 dark:text-slate-100 flex-1 overflow-visible">{children}</div>;
}
