import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import TermsTimelineWrapper from "@/components/TermsTimelineWrapper";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Terms of Service - ISSI - International Software Systems International",
  description: "Explore ISSI's Terms of Service in an interactive timeline format to understand the rules and regulations for using our website.",
};

interface Props {
  params: {
    lang: Locale;
  };
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);

  // Get all messages for the current locale
  const messages = intl.messages as Record<string, string>;

  return (
    <div className="relative">
      {/* Interactive Terms Timeline */}
      <TermsTimelineWrapper
        messages={messages}
        locale={locale}
      />
    </div>
  );
}