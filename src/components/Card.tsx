import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return <div className="bg-white dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700 rounded-lg shadow">{children}</div>;
}
