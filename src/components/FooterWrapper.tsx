import Footer from "@/components/Footer";
import { Locale } from "@/lib/definitions";

async function getMessages(locale: string) {
  return (await import(`../lang/${locale}.json`)).default;
}

interface FooterWrapperProps {
  locale: Locale;
}

import dynamic from "next/dynamic";
const FooterContactCTA = dynamic(() => import("@/components/FooterContactCTA"), { ssr: false });

export default async function FooterWrapper({ locale }: FooterWrapperProps) {
  const messages = await getMessages(locale);

  return (
    <>
      <FooterContactCTA locale={locale} messages={messages} />
      <Footer locale={locale} messages={messages} />
    </>
  );
}
