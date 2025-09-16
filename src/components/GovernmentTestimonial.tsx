"use client";

import { FormattedMessage } from "react-intl";

export default function GovernmentTestimonial() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="sm:text-4xl mb-8 font-serif font-[400] text-3xl tracking-tight text-white">
            <FormattedMessage
              id="government.testimonial.title"
              defaultMessage="Trusted by Government Agencies"
            />
          </h2>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">
                <FormattedMessage
                  id="government.testimonial.stats.experience.value"
                  defaultMessage="30+"
                />
              </div>
              <div className="text-blue-100">
                <FormattedMessage
                  id="government.testimonial.stats.experience.label"
                  defaultMessage="Years Experience"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">
                <FormattedMessage
                  id="government.testimonial.stats.projects.value"
                  defaultMessage="500+"
                />
              </div>
              <div className="text-blue-100">
                <FormattedMessage
                  id="government.testimonial.stats.projects.label"
                  defaultMessage="Government Projects"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">
                <FormattedMessage
                  id="government.testimonial.stats.satisfaction.value"
                  defaultMessage="98%"
                />
              </div>
              <div className="text-blue-100">
                <FormattedMessage
                  id="government.testimonial.stats.satisfaction.label"
                  defaultMessage="Client Satisfaction"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">
                <FormattedMessage
                  id="government.testimonial.stats.agencies.value"
                  defaultMessage="50+"
                />
              </div>
              <div className="text-blue-100">
                <FormattedMessage
                  id="government.testimonial.stats.agencies.label"
                  defaultMessage="Federal Agencies"
                />
              </div>
            </div>
          </div>

          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl italic mb-6 text-blue-100">
              <FormattedMessage
                id="government.testimonial.quote"
                defaultMessage="ISSI has been instrumental in helping us meet our diversity goals while delivering exceptional project outcomes on schedule and within budget. Their deep understanding of government requirements and proven track record make them an invaluable partner."
              />
            </blockquote>
            <cite className="text-blue-200">
              — <FormattedMessage
                id="government.testimonial.attribution"
                defaultMessage="Federal Project Manager"
              />
            </cite>
          </div>

          {/* Additional Client Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <blockquote className="text-blue-100 italic mb-4">
                <FormattedMessage
                  id="government.testimonial.quote2"
                  defaultMessage="Outstanding technical expertise and commitment to security compliance. ISSI consistently delivers solutions that exceed our expectations."
                />
              </blockquote>
              <cite className="text-blue-200  ">
                — <FormattedMessage
                  id="government.testimonial.attribution2"
                  defaultMessage="Department of Defense IT Director"
                />
              </cite>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <blockquote className="text-blue-100 italic mb-4">
                <FormattedMessage
                  id="government.testimonial.quote3"
                  defaultMessage="Their agile approach and understanding of government processes helped us modernize our legacy systems efficiently and securely."
                />
              </blockquote>
              <cite className="text-blue-200  ">
                — <FormattedMessage
                  id="government.testimonial.attribution3"
                  defaultMessage="State Agency CIO"
                />
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

