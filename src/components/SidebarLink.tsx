"use client";

import clsx from "clsx";
import React from 'react';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function SidebarLink({ href, children }: Props) {
  const pathname = usePathname();

  return (
    <Link href={href}>      <div
        className={clsx("flex items-center px-4 py-2 my-1 text-base text-slate-200 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-800", {
          "text-white bg-slate-700 dark:bg-slate-800": pathname === href,
        })}
      >
        {children}
      </div>
    </Link>
  );
}
