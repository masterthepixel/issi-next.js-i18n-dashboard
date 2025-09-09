import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maryland DOT MBE/DBE/SBE Certification | ISSI Compliance",
  description:
    "Learn more about ISSI’s Maryland Department of Transportation MBE/DBE/SBE certification. Minority, Disadvantaged, and Small Business Enterprise.",
};

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const intl = await getIntl(lang);
  
  return (
    <main className="-mt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-primary/5 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Maryland DOT Badge */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">MD</span>
            </div>
          </div>
            <h1 className="md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)]">
            {intl.formatMessage({ id: "mdot.hero.title" })}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {intl.formatMessage({ id: "mdot.hero.subtitle" })}
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">            <Link 
              href={`/${lang}/contact`}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              {intl.formatMessage({ id: "mdot.hero.cta.primary" })}
            </Link>
            <Link 
              href="#capabilities"
              className="border border-border px-8 py-4 rounded-lg hover:bg-accent transition-colors font-semibold"
            >
              {intl.formatMessage({ id: "mdot.hero.cta.secondary" })}
            </Link>
          </div>
        </div>
      </section>      {/* Certification Overview */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="mb-4">{intl.formatMessage({ id: "mdot.certifications.title" })}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {intl.formatMessage({ id: "mdot.certifications.description" })}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">          {/* MBE Card */}
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">M</span>
            </div>
            <h3 className="text-card-foreground mb-2">MBE</h3>
            <h4 className="mb-3">{intl.formatMessage({ id: "mdot.certifications.mbe.title" })}</h4>
            <p className="text-muted-foreground">
              {intl.formatMessage({ id: "mdot.certifications.mbe.description" })}
            </p>
          </div>

          {/* DBE Card */}
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">D</span>
            </div>
            <h3 className="text-card-foreground mb-2">DBE</h3>
            <h4 className="mb-3">{intl.formatMessage({ id: "mdot.certifications.dbe.title" })}</h4>
            <p className="text-muted-foreground">
              {intl.formatMessage({ id: "mdot.certifications.dbe.description" })}
            </p>
          </div>          {/* SBE Card */}
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">S</span>
            </div>
            <h3 className="text-card-foreground mb-2">SBE</h3>
            <h4 className="mb-3">{intl.formatMessage({ id: "mdot.certifications.sbe.title" })}</h4>
            <p className="text-muted-foreground">
              {intl.formatMessage({ id: "mdot.certifications.sbe.description" })}
            </p>
          </div>
        </div>
      </section>      {/* Why Partner With ISSI */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">{intl.formatMessage({ id: "mdot.benefits.title" })}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {intl.formatMessage({ id: "mdot.benefits.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Compliance Support */}
            <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="mb-2">{intl.formatMessage({ id: "mdot.benefits.compliance.title" })}</h3>
              <p className="text-muted-foreground">
                {intl.formatMessage({ id: "mdot.benefits.compliance.description" })}
              </p>
            </div>

            {/* Partnership Approach */}
            <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="mb-2">{intl.formatMessage({ id: "mdot.benefits.partnership.title" })}</h3>
              <p className="text-muted-foreground">
                {intl.formatMessage({ id: "mdot.benefits.partnership.description" })}
              </p>
            </div>            {/* Delivery Excellence */}
            <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="mb-2">{intl.formatMessage({ id: "mdot.benefits.delivery.title" })}</h3>
              <p className="text-muted-foreground">
                {intl.formatMessage({ id: "mdot.benefits.delivery.description" })}
              </p>
            </div>

            {/* Experience & Trust */}
            <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="mb-2">{intl.formatMessage({ id: "mdot.benefits.experience.title" })}</h3>
              <p className="text-muted-foreground">
                {intl.formatMessage({ id: "mdot.benefits.experience.description" })}
              </p>
            </div>
          </div>
        </div>
      </section>      {/* Our Capabilities */}
      <section id="capabilities" className="container mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="mb-4">{intl.formatMessage({ id: "mdot.capabilities.title" })}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {intl.formatMessage({ id: "mdot.capabilities.subtitle" })}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transportation Infrastructure */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-primary mb-4">{intl.formatMessage({ id: "mdot.capabilities.infrastructure.title" })}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.infrastructure.item1" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.infrastructure.item2" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.infrastructure.item3" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.infrastructure.item4" })}</span>
              </div>
            </div>
          </div>

          {/* Technology Solutions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-primary mb-4">{intl.formatMessage({ id: "mdot.capabilities.technology.title" })}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.technology.item1" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.technology.item2" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.technology.item3" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.technology.item4" })}</span>
              </div>
            </div>
          </div>

          {/* Project Management & Support */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-primary mb-4">{intl.formatMessage({ id: "mdot.capabilities.management.title" })}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.management.item1" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.management.item2" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.management.item3" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.management.item4" })}</span>
              </div>
            </div>
          </div>

          {/* Professional Services */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-primary mb-4">{intl.formatMessage({ id: "mdot.capabilities.professional.title" })}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.professional.item1" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.professional.item2" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.professional.item3" })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{intl.formatMessage({ id: "mdot.capabilities.professional.item4" })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Track Record */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="text-center mb-8">
            <h2 className="mb-4">{intl.formatMessage({ id: "mdot.track_record.title" })}</h2>
            <p className=" max-w-2xl mx-auto">
              {intl.formatMessage({ id: "mdot.track_record.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{intl.formatMessage({ id: "mdot.track_record.stats.experience.value" })}</div>
              <div className="">{intl.formatMessage({ id: "mdot.track_record.stats.experience.label" })}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{intl.formatMessage({ id: "mdot.track_record.stats.portfolio.value" })}</div>
              <div className="">{intl.formatMessage({ id: "mdot.track_record.stats.portfolio.label" })}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{intl.formatMessage({ id: "mdot.track_record.stats.contracts.value" })}</div>
              <div className="">{intl.formatMessage({ id: "mdot.track_record.stats.contracts.label" })}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{intl.formatMessage({ id: "mdot.track_record.stats.states.value" })}</div>
              <div className="">{intl.formatMessage({ id: "mdot.track_record.stats.states.label" })}</div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl italic mb-4">
              {intl.formatMessage({ id: "mdot.track_record.testimonial.quote" })}
            </blockquote>
            <cite className="">— {intl.formatMessage({ id: "mdot.track_record.testimonial.attribution" })}</cite>
          </div>
        </div>
      </section>      {/* Get Started */}
      <section className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="mb-6">{intl.formatMessage({ id: "mdot.contact.title" })}</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder={intl.formatMessage({ id: "mdot.contact.form.name" })}
                className="w-full p-3 border border-border rounded bg-background"
                required
              />
              <input 
                type="email" 
                placeholder={intl.formatMessage({ id: "mdot.contact.form.email" })}
                className="w-full p-3 border border-border rounded bg-background"
                required
              />
              <select className="w-full p-3 border border-border rounded bg-background">
                <option value="">{intl.formatMessage({ id: "mdot.contact.form.project_type" })}</option>
                <option value="highway">{intl.formatMessage({ id: "mdot.contact.form.project_type.highway" })}</option>
                <option value="bridge">{intl.formatMessage({ id: "mdot.contact.form.project_type.bridge" })}</option>
                <option value="transit">{intl.formatMessage({ id: "mdot.contact.form.project_type.transit" })}</option>
                <option value="technology">{intl.formatMessage({ id: "mdot.contact.form.project_type.technology" })}</option>
                <option value="other">{intl.formatMessage({ id: "mdot.contact.form.project_type.other" })}</option>
              </select>
              <textarea 
                placeholder={intl.formatMessage({ id: "mdot.contact.form.message" })}
                rows={4}
                className="w-full p-3 border border-border rounded bg-background"
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground px-8 py-3 rounded hover:bg-primary/90 transition-colors font-semibold"
              >
                {intl.formatMessage({ id: "mdot.contact.form.submit" })}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-6">{intl.formatMessage({ id: "mdot.contact.info.title" })}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-primary">📧</span>
                  <span>{intl.formatMessage({ id: "mdot.contact.info.email" })}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-primary">📞</span>
                  <span>{intl.formatMessage({ id: "mdot.contact.info.phone" })}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-primary">📍</span>
                  <span>{intl.formatMessage({ id: "mdot.contact.info.address" })}</span>
                </div>
              </div>
            </div>
              <div className="pt-6">
              <Link 
                href={`/${lang}/capabilities`}
                className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded hover:bg-accent transition-colors font-semibold"
              >
                {intl.formatMessage({ id: "mdot.contact.info.download" })}
              </Link>
            </div>
              <div className="pt-6">
              <h4 className="mb-2">{intl.formatMessage({ id: "mdot.contact.info.certifications.title" })}</h4>
              <p className="text-muted-foreground">
                {intl.formatMessage({ id: "mdot.contact.info.certifications.description" })}
              </p>
              <Link 
                href={`/${lang}/compliance`}
                className="text-primary hover:underline font-medium"
              >
                {intl.formatMessage({ id: "mdot.contact.info.certifications.link" })}
              </Link>
            </div>
          </div>
        </div>
      </section>      {/* Footer CTA */}
      <section className="bg-accent py-12 text-center">
        <div className="container mx-auto px-6">
          <h2 className="mb-4">{intl.formatMessage({ id: "mdot.footer_cta.title" })}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {intl.formatMessage({ id: "mdot.footer_cta.subtitle" })}
          </p>
          <Link 
            href={`/${lang}/contact`}
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg text-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            {intl.formatMessage({ id: "mdot.footer_cta.button" })}
          </Link>
        </div>
      </section>
    </main>
  );
}
