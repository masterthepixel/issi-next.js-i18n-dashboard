import ContactForm from "@/components/ContactForm";
import { Locale } from "@/lib/definitions";

async function getMessages(locale: string) {
  return (await import(`../lang/${locale}.json`)).default;
}

interface ContactFormWrapperProps {
  locale: Locale;
}

export default async function ContactFormWrapper({ locale }: ContactFormWrapperProps) {
  const messages = await getMessages(locale);

  return <ContactForm locale={locale} messages={messages} />;
}