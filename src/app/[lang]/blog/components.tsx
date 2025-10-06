import { Locale } from "@/lib/definitions";
import Image from "next/image";

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  title: string;
  name: string;
  slug: string;
}

interface FeaturedImage {
  id: number;
  url: string;
  alt?: string;
  sizes?: {
    card?: {
      url: string;
    };
  };
}

interface BlogPost {
  id: number;
  title?: string;
  excerpt?: string;
  slug: string;
  publishedAt: string;
  readingTime?: number;
  featuredImage?: FeaturedImage;
  populatedAuthors?: Author[];
  category?: Category;
  tags?: string[];
  content?: {
    root?: {
      children?: unknown[];
    };
  };
}

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
  baseUrl?: string;
}

// Featured Blog Card Component (GitHub-inspired)
export function FeaturedBlogCard({ post, locale }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return locale === 'en' ? 'Date TBD' :
        locale === 'fr' ? 'Date à déterminer' :
          'Fecha por determinar';
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return locale === 'en' ? 'Date TBD' :
          locale === 'fr' ? 'Date à déterminer' :
            'Fecha por determinar';
      }

      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (error) {
      console.warn('Invalid date format:', dateString, error);
      return locale === 'en' ? 'Date TBD' :
        locale === 'fr' ? 'Date à déterminer' :
          'Fecha por determinar';
    }
  };

  const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
    ? post.populatedAuthors[0].name
    : 'ISSI Team';

  const readingTime = post.readingTime ? `${post.readingTime} min read` :
    `${Math.max(1, Math.ceil((post.content?.root?.children?.length || 1) * 0.5))} min read`;

  // Generate fallback title from slug if title is missing
  const displayTitle = post.title && post.title.trim() !== ''
    ? post.title
    : post.slug
      ? post.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Untitled Article';

  // Generate fallback excerpt if missing
  const displayExcerpt = post.excerpt && post.excerpt.trim() !== ''
    ? post.excerpt
    : locale === 'en'
      ? 'Read this article to discover insights and updates from our team.'
      : locale === 'fr'
        ? 'Lisez cet article pour découvrir les perspectives et mises à jour de notre équipe.'
        : 'Lea este artículo para descubrir perspectivas y actualizaciones de nuestro equipo.';

  // Generate fallback slug from title if slug is missing, or use post ID as last resort
  const displaySlug = post.slug && post.slug.trim() !== ''
    ? post.slug
    : post.title
      ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : `post-${post.id}`;

  return (
    <article className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Content */}
        <div className="space-y-6 flex flex-col justify-center">
          {/* Categories */}
          {post.category && (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-primary/10 text-primary rounded-full border border-primary/20 backdrop-blur-sm">
                {post.category.title}
              </span>
              {post.tags && post.tags.length > 0 && post.tags.slice(0, 1).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-normal leading-tight group-hover:text-primary transition-colors duration-300">
            <a
              href={`/${locale}/blog/${displaySlug}`}
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 rounded-lg no-underline"
            >
              {displayTitle}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
            {displayExcerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-normal text-sm">
                  {authorName.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal text-foreground">{authorName}</span>
                <span className="text-xs">
                  {locale === 'en' ? 'Author' :
                    locale === 'fr' ? 'Auteur' :
                      'Autor'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt} className="font-normal">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-normal">{readingTime}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <a
              href={`/${locale}/blog/${displaySlug}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-normal shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group/cta no-underline"
            >
              {locale === 'en' ? 'Read Full Article' : locale === 'fr' ? 'Lire l\'Article' : 'Leer Artículo'}
              <svg
                className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-xl">
          {post.featuredImage ? (
            <Image
              src={`https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.card?.url || post.featuredImage.url}`}
              alt={post.featuredImage.alt || displayTitle}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground font-normal">
                  {locale === 'en' ? 'Featured Article' :
                    locale === 'fr' ? 'Article Vedette' :
                      'Artículo Destacado'}
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </article>
  );
}

// Regular Blog Post Card Component (Aceternity-inspired)
export function BlogPostCard({ post, locale }: BlogCardProps) {
  const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
    ? post.populatedAuthors[0].name
    : 'ISSI Team';

  const readingTime = post.readingTime ? `${post.readingTime} min read` :
    `${Math.max(1, Math.ceil((post.content?.root?.children?.length || 1) * 0.5))} min read`;

  // Generate fallback title from slug if title is missing
  const displayTitle = post.title && post.title.trim() !== ''
    ? post.title
    : post.slug
      ? post.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Untitled Article';

  // Generate fallback excerpt if missing
  const displayExcerpt = post.excerpt && post.excerpt.trim() !== ''
    ? post.excerpt
    : locale === 'en'
      ? 'Read this article to discover insights and updates from our team.'
      : locale === 'fr'
        ? 'Lisez cet article pour découvrir les perspectives et mises à jour de notre équipe.'
        : 'Lea este artículo para descubrir perspectivas y actualizaciones de nuestro equipo.';

  // Generate fallback slug from title if slug is missing, or use post ID as last resort
  const displaySlug = post.slug && post.slug.trim() !== ''
    ? post.slug
    : post.title
      ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : `post-${post.id}`;

  // Get the background image URL
  const backgroundImageUrl = post.featuredImage
    ? `https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.card?.url || post.featuredImage.url}`
    : 'https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80';

  return (
    <div className="max-w-sm w-full group/card">
      <div
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-start space-x-4 z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {authorName.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="font-normal text-base text-white relative z-10 mb-0">
              {authorName}
            </p>
            <p className="text-sm text-gray-300 mt-0 leading-tight">{readingTime}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-normal text-xl md:text-2xl text-white relative z-10 line-clamp-2">
            <a
              href={`/${locale}/blog/${displaySlug}`}
              className="no-underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/50 rounded-lg block"
            >
              {displayTitle}
            </a>
          </h1>
          <p className="font-normal text-sm text-gray-200 relative z-10 my-4 line-clamp-3">
            {displayExcerpt}
          </p>
        </div>
      </div>
    </div>
  );
}

// Blog Sidebar Component
interface BlogSidebarProps {
  currentPost: BlogPost;
  relatedPosts: BlogPost[];
  categories: Category[];
  locale: Locale;
}

export function BlogSidebar({ currentPost, relatedPosts, categories, locale }: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return locale === 'en' ? 'Date TBD' :
        locale === 'fr' ? 'Date à déterminer' :
          'Fecha por determinar';
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return locale === 'en' ? 'Date TBD' :
          locale === 'fr' ? 'Date à déterminer' :
            'Fecha por determinar';
      }

      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch (error) {
      console.warn('Invalid date format:', dateString, error);
      return locale === 'en' ? 'Date TBD' :
        locale === 'fr' ? 'Date à déterminer' :
          'Fecha por determinar';
    }
  };

  return (
    <aside className="space-y-8">
      {/* Author Info */}
      {currentPost.populatedAuthors && currentPost.populatedAuthors.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-normal text-foreground mb-4">
            {locale === 'en' ? 'About the Author' :
              locale === 'fr' ? 'À propos de l\'auteur' :
                'Sobre el Autor'}
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">
                {currentPost.populatedAuthors[0].name.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-normal text-foreground">{currentPost.populatedAuthors[0].name}</h4>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Software Development Expert' :
                  locale === 'fr' ? 'Expert en Développement Logiciel' :
                    'Experto en Desarrollo de Software'}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === 'en'
              ? 'Contributing to ISSI\'s mission of delivering high-quality, cost-effective software solutions for government and enterprise clients.'
              : locale === 'fr'
                ? 'Contribue à la mission d\'ISSI de fournir des solutions logicielles de haute qualité et rentables pour les clients gouvernementaux et entreprises.'
                : 'Contribuyendo a la misión de ISSI de entregar soluciones de software de alta calidad y rentables para clientes gubernamentales y empresariales.'
            }
          </p>
        </div>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-normal text-foreground mb-4">
            {locale === 'en' ? 'Categories' :
              locale === 'fr' ? 'Catégories' :
                'Categorías'}
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/${locale}/blog?category=${category.slug}`}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors no-underline"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-normal text-foreground mb-4">
            {locale === 'en' ? 'Related Articles' :
              locale === 'fr' ? 'Articles Connexes' :
                'Artículos Relacionados'}
          </h3>
          <div className="space-y-4">
            {relatedPosts.slice(0, 3).map((post) => {
              const displayTitle = post.title && post.title.trim() !== ''
                ? post.title
                : post.slug
                  ? post.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                  : 'Untitled Article';

              const displaySlug = post.slug && post.slug.trim() !== ''
                ? post.slug
                : post.title
                  ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  : `post-${post.id}`;

              return (
                <div key={post.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {post.featuredImage ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={`https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.card?.url || post.featuredImage.url}`}
                          alt={post.featuredImage.alt || displayTitle}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-normal text-foreground line-clamp-2 mb-1">
                      <a
                        href={`/${locale}/blog/${displaySlug}`}
                        className="hover:text-primary transition-colors no-underline"
                      >
                        {displayTitle}
                      </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <h3 className="text-lg font-normal text-foreground mb-2">
          {locale === 'en' ? 'Stay Updated' :
            locale === 'fr' ? 'Restez Informé' :
              'Mantente Actualizado'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {locale === 'en'
            ? 'Get the latest insights and updates delivered to your inbox.'
            : locale === 'fr'
              ? 'Recevez les dernières perspectives et mises à jour dans votre boîte de réception.'
              : 'Recibe las últimas perspectivas y actualizaciones en tu bandeja de entrada.'
          }
        </p>
        <a
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-normal no-underline"
        >
          {locale === 'en' ? 'Subscribe' :
            locale === 'fr' ? 'S\'abonner' :
              'Suscribirse'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </aside>
  );
}