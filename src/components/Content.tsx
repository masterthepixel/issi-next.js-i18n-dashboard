interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <div className="relative z-10 w-full p-5 lg:p-10 text-slate-900 dark:text-slate-100 flex-1">{children}</div>;
}
