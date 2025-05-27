import Navbar from "@/components/Navbar";
import Content from "@/components/Content";

import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";

import { i18n } from "../../../i18n-config";

import "@/app/globals.css";

export const metadata = {
  title: "ISSI - International Software Systems International",
  description: "International Software Systems International official website",
};

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  const user = await getUser();

  return (
    <html lang={params.lang}>
      <body className="relative min-h-screen overflow-y-auto bg-gray-50">
        <Navbar locale={params.lang} user={user} />
        <Content>{children}</Content>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
