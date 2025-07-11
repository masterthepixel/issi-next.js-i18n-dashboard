import { Suspense } from "react";

import LicenseTimelineWrapper from "@/components/LicenseTimelineWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "License Agreement - ISSI - International Software Systems International",
  description: "Explore ISSI's software licensing terms and usage agreements in an interactive timeline format for comprehensive understanding.",
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
      {/* Interactive License Timeline */}
      <LicenseTimelineWrapper
        messages={messages}
        locale={locale}
      />
    </div>
  );
}