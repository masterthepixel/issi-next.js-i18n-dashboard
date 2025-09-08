"use client";

interface NewAlternativeHeroProps {
  lang: string;
}

export default function NewAlternativeHero({ lang }: NewAlternativeHeroProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="md:text-6xl text-foreground">
          Welcome to ISSI Dashboard
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          {lang === 'en' 
            ? "Enterprise solutions for government and business"
            : "Solutions d'entreprise pour les gouvernements et les entreprises"}
        </p>
      </div>
    </div>
  );
}