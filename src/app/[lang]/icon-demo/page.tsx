import IconShowcase from "@/components/IconShowcase";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { Suspense } from "react";

interface Props {
    params: {
        lang: Locale;
    };
}

export default function Page({ params: { lang } }: Props) {
    return (
        <Suspense fallback={<Spinner />}>
            <div className="min-h-screen bg-white dark:bg-slate-900">
                <div className="container mx-auto py-16">
                    <IconShowcase />
                </div>
            </div>
        </Suspense>
    );
}
