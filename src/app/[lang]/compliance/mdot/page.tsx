import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maryland DOT MBE/DBE/SBE Certification | ISSI Compliance",
  description:
    "Learn more about ISSI’s Maryland Department of Transportation MBE/DBE/SBE certification. Minority, Disadvantaged, and Small Business Enterprise.",
};

interface Props {
  params: { lang: Locale };
}

export default async function Page({ params: { lang } }: Props) {
  const intl = await getIntl(lang);
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-balance bg-clip-text text-transparent text-center bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] sm:text-6xl mb-6">
        Maryland DOT MBE/DBE/SBE Certification
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 text-center">
        {/* Placeholder: Add Maryland DOT MBE/DBE/SBE content here in the future. */}
      </p>
    </main>
  );
}
