import Footer from "@/components/Footer";
import { Locale } from "@/lib/definitions";

async function getMessages(locale: string) {
  return (await import(`../lang/${locale}.json`)).default;
}

interface FooterWrapperProps {
  locale: Locale;
}

export default async function FooterWrapper({ locale }: FooterWrapperProps) {
  const messages = await getMessages(locale);

  return <Footer locale={locale} messages={messages} />;
}
