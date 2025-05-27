interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <div className="w-full p-5 lg:p-10">{children}</div>;
}
