import { Metadata } from "next";
import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import { fetchPosts } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { BlogPostCard, FeaturedBlogCard } from "./components";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  // Import messages for dynamic metadata
  const messages = (await import(`../../../lang/${lang}.json`)).default;

  const seoData = {
    en: {
      title: messages['page.blog.meta.title'] || "Blog | Latest News & Insights | ISSI",
      description: messages['page.blog.meta.description'] || "Stay updated with the latest insights, news, and thought leadership from ISSI's team of technology experts. Explore our blog for industry trends and innovation.",
      keywords: messages['page.blog.meta.keywords'] || "ISSI blog, technology insights, software development news, government IT, enterprise solutions, tech thought leadership"
    },
    fr: {
      title: messages['page.blog.meta.title'] || "Blog | Actualités et Insights | ISSI",
      description: messages['page.blog.meta.description'] || "Restez à jour avec les dernières informations, nouvelles et leadership d'opinion de l'équipe d'experts technologiques d'ISSI. Explorez notre blog pour les tendances de l'industrie.",
      keywords: messages['page.blog.meta.keywords'] || "blog ISSI, insights technologiques, nouvelles développement logiciel, IT gouvernementale, solutions d'entreprise"
    },
    es: {
      title: messages['page.blog.meta.title'] || "Blog | Noticias e Insights | ISSI",
      description: messages['page.blog.meta.description'] || "Manténgase actualizado con las últimas perspectivas, noticias y liderazgo intelectual del equipo de expertos tecnológicos de ISSI.",
      keywords: messages['page.blog.meta.keywords'] || "blog ISSI, perspectivas tecnológicas, noticias desarrollo software, TI gubernamental, soluciones empresariales"
    }
  };

  const currentSeo = seoData[lang] || seoData.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `${baseUrl}/${lang}/blog`,
      siteName: "ISSI - International Software Systems",
      images: [
        {
          url: `${baseUrl}/images/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: currentSeo.title,
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/images/blog-og.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'fr': `${baseUrl}/fr/blog`,
        'es': `${baseUrl}/es/blog`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for all locales
  const locales = ['en', 'fr', 'es'];

  return locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function Page({ params, searchParams }: Props) {
  const { lang: locale } = await params;
  const { page = '1', search = '' } = await searchParams;

  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} page={parseInt(page, 10)} search={search} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
  page: number;
  search: string;
}

async function PageContent({ locale, page, search }: PageContentProps) {
  const messages = (await import(`../../../lang/${locale}.json`)).default;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  // Fetch blog posts from external PayloadCMS
  const limit = 10;

  // Only show published posts with actual content
  const where: Record<string, unknown> = {
    _status: { equals: 'published' },
    content: { not_equals: null }
  };

  // Note: Complex filtering like publishedAt and search not yet supported by external API
  // After confirming external API capabilities, we can add search functionality

  try {
    const result = await fetchPosts({
      page,
      limit,
      locale,
      where
    });

    // Get all posts and handle missing data gracefully in the UI
    const allPosts = result.docs || [];
    console.log('🔍 All posts before filtering:', allPosts.map((p: any) => ({ id: p.id, title: p.title, slug: p.slug })));

    // Show all posts - we'll handle missing data gracefully in the UI with fallbacks
    const posts = allPosts.filter((post: any) => {
      // Only exclude posts that have no id or are completely broken
      if (!post.id) {
        console.log(`❌ Filtering out post with no ID:`, post);
        return false;
      }

      // Log data state for debugging
      if (!post.slug || post.slug === null || post.slug === '') {
        console.log(`⚠️ Post ${post.id} has no slug - will use fallback: ${post.title || 'untitled'}`);
      }
      if (!post.title || post.title === null || post.title === '') {
        console.log(`⚠️ Post ${post.id} has no title - will generate from slug or use fallback`);
      }

      return true;
    });

    console.log('✅ Posts after filtering:', posts.map((p: any) => ({ id: p.id, title: p.title, slug: p.slug })));
    const totalPages = result.totalPages || 1;
    const hasNextPage = result.hasNextPage || false;
    const hasPrevPage = result.hasPrevPage || false;

    // Structured data for the blog index
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/${locale}/blog#webpage`,
          "url": `${baseUrl}/${locale}/blog`,
          "name": locale === 'en' ? "Blog | Latest News & Insights | ISSI" :
            locale === 'fr' ? "Blog | Actualités et Insights | ISSI" :
              "Blog | Noticias e Insights | ISSI",
          "description": locale === 'en' ? "Stay updated with the latest insights, news, and thought leadership from ISSI's team of technology experts." :
            locale === 'fr' ? "Restez à jour avec les dernières informations et leadership d'opinion de l'équipe d'experts d'ISSI." :
              "Manténgase actualizado con las últimas perspectivas del equipo de expertos tecnológicos de ISSI.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": `${baseUrl}#website`
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${baseUrl}/${locale}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": locale === 'en' ? "Blog" : locale === 'fr' ? "Blog" : "Blog",
                "item": `${baseUrl}/${locale}/blog`
              }
            ]
          }
        },
        {
          "@type": "Blog",
          "@id": `${baseUrl}/${locale}/blog#blog`,
          "url": `${baseUrl}/${locale}/blog`,
          "name": locale === 'en' ? "ISSI Technology Blog" :
            locale === 'fr' ? "Blog Technologique ISSI" :
              "Blog Tecnológico ISSI",
          "description": locale === 'en' ? "Latest insights and thought leadership from ISSI's technology experts" :
            locale === 'fr' ? "Dernières perspectives et leadership éclairé des experts technologiques d'ISSI" :
              "Últimas perspectivas y liderazgo intelectual de los expertos tecnológicos de ISSI",
          "publisher": {
            "@type": "Organization",
            "@id": `${baseUrl}#organization`,
            "name": "International Software Systems, Inc. (ISSI)"
          },
          "blogPost": posts.map((post: any, index: number) => ({
            "@type": "BlogPosting",
            "position": index + 1,
            "headline": post.title,
            "description": post.excerpt || "",
            "url": `${baseUrl}/${locale}/blog/${post.slug}`,
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "author": {
              "@type": "Person",
              "name": `${post.author?.firstName || ''} ${post.author?.lastName || ''}`.trim()
            },
            "publisher": {
              "@type": "Organization",
              "@id": `${baseUrl}#organization`
            }
          }))
        }
      ]
    };

    return (
      <div className="min-h-screen">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Blog Header */}
        <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-b border-border/20">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="md:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                {locale === 'en' ? 'Blog' :
                  locale === 'fr' ? 'Blog' :
                    'Blog'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {locale === 'en' ? 'Stay updated with the latest insights, news, and thought leadership from our team of technology experts.' :
                  locale === 'fr' ? 'Restez à jour avec les dernières informations, nouvelles et leadership éclairé de notre équipe d\'experts technologiques.' :
                    'Manténgase actualizado con las últimas perspectivas, noticias y liderazgo intelectual de nuestro equipo de expertos tecnológicos.'}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <form method="GET" className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">
                  {locale === 'en' ? 'Search blog posts' :
                    locale === 'fr' ? 'Rechercher dans le blog' :
                      'Buscar en el blog'}
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  defaultValue={search}
                  placeholder={locale === 'en' ? 'Search blog posts...' :
                    locale === 'fr' ? 'Rechercher dans le blog...' :
                      'Buscar en el blog...'}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {locale === 'en' ? 'Search' :
                  locale === 'fr' ? 'Rechercher' :
                    'Buscar'}
              </button>
            </form>
            {search && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? `Showing results for "${search}"` :
                    locale === 'fr' ? `Résultats pour "${search}"` :
                      `Resultados para "${search}"`}
                  {' • '}
                  <a
                    href={`/${locale}/blog`}
                    className="text-primary hover:underline"
                  >
                    {locale === 'en' ? 'Clear search' :
                      locale === 'fr' ? 'Effacer la recherche' :
                        'Limpiar búsqueda'}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-4 pb-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                {search ?
                  (locale === 'en' ? 'No posts found for your search.' :
                    locale === 'fr' ? 'Aucun article trouvé pour votre recherche.' :
                      'No se encontraron artículos para su búsqueda.') :
                  (locale === 'en' ? 'No blog posts published yet.' :
                    locale === 'fr' ? 'Aucun article de blog publié pour le moment.' :
                      'Aún no hay artículos de blog publicados.')
                }
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {posts.length > 0 && (
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {locale === 'en' ? 'Featured Article' :
                        locale === 'fr' ? 'Article en Vedette' :
                          'Artículo Destacado'}
                    </h2>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                  </div>
                  <FeaturedBlogCard
                    post={posts[0]}
                    locale={locale}
                    baseUrl={baseUrl}
                  />
                </div>
              )}

              {/* Recent Posts */}
              {posts.length > 1 && (
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {locale === 'en' ? 'Latest Articles' :
                        locale === 'fr' ? 'Derniers Articles' :
                          'Últimos Artículos'}
                    </h2>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {posts.slice(1).map((post: any) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        locale={locale}
                        baseUrl={baseUrl}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <BlogPagination
                    currentPage={page}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    locale={locale}
                    search={search}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">
            {locale === 'en' ? 'Error Loading Blog' :
              locale === 'fr' ? 'Erreur de Chargement du Blog' :
                'Error Cargando Blog'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'en' ? 'We\'re having trouble loading the blog posts. Please try again later.' :
              locale === 'fr' ? 'Nous avons des difficultés à charger les articles du blog. Veuillez réessayer plus tard.' :
                'Tenemos problemas para cargar los artículos del blog. Inténtelo de nuevo más tarde.'}
          </p>
        </div>
      </div>
    );
  }
}


// Blog Pagination Component
function BlogPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  locale,
  search
}: {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  locale: Locale;
  search: string;
}) {
  const buildPageUrl = (page: number) => {
    const searchParams = new URLSearchParams();
    if (search) searchParams.set('search', search);
    if (page > 1) searchParams.set('page', page.toString());
    const query = searchParams.toString();
    return `/${locale}/blog${query ? `?${query}` : ''}`;
  };

  return (
    <nav className="flex items-center gap-2" aria-label="Blog pagination">
      {/* Previous Page */}
      {hasPrevPage ? (
        <a
          href={buildPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
        >
          {locale === 'en' ? 'Previous' :
            locale === 'fr' ? 'Précédent' :
              'Anterior'}
        </a>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted-foreground cursor-not-allowed">
          {locale === 'en' ? 'Previous' :
            locale === 'fr' ? 'Précédent' :
              'Anterior'}
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => {
            // Show first page, last page, current page, and pages around current
            const isFirst = page === 1;
            const isLast = page === totalPages;
            const isAroundCurrent = Math.abs(page - currentPage) <= 1;
            return isFirst || isLast || isAroundCurrent;
          })
          .map((page, index, pages) => {
            const prev = pages[index - 1];
            const showEllipsis = prev && page - prev > 1;

            return (
              <div key={page} className="flex items-center gap-1">
                {showEllipsis && (
                  <span className="px-2 py-2 text-muted-foreground">...</span>
                )}
                {page === currentPage ? (
                  <span className="px-3 py-2 bg-primary text-primary-foreground rounded-md">
                    {page}
                  </span>
                ) : (
                  <a
                    href={buildPageUrl(page)}
                    className="px-3 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
                  >
                    {page}
                  </a>
                )}
              </div>
            );
          })}
      </div>

      {/* Next Page */}
      {hasNextPage ? (
        <a
          href={buildPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
        >
          {locale === 'en' ? 'Next' :
            locale === 'fr' ? 'Suivant' :
              'Siguiente'}
        </a>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted-foreground cursor-not-allowed">
          {locale === 'en' ? 'Next' :
            locale === 'fr' ? 'Suivant' :
              'Siguiente'}
        </span>
      )}
    </nav>
  );
}