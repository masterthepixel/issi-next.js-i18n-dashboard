import { Locale } from "@/lib/definitions";

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
  title: string;
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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
    ? post.populatedAuthors[0].name
    : 'ISSI Team';

  const readingTime = post.readingTime ? `${post.readingTime} min read` :
    `${Math.max(1, Math.ceil((post.content?.root?.children?.length || 1) * 0.5))} min read`;

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
          <h2 className="text-3xl md:text-4xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            <a
              href={`/${locale}/blog/${post.slug}`}
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 rounded-lg no-underline"
            >
              {post.title}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {authorName.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{authorName}</span>
                <span className="text-xs">
                  {locale === 'en' ? 'Author' :
                    locale === 'fr' ? 'Auteur' :
                      'Autor'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt} className="font-medium">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{readingTime}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <a
              href={`/${locale}/blog/${post.slug}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group/cta no-underline"
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
            <img
              src={`https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.card?.url || post.featuredImage.url}`}
              alt={post.featuredImage.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
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

// Regular Blog Post Card Component (GitHub-inspired)
export function BlogPostCard({ post, locale }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
    ? post.populatedAuthors[0].name
    : 'ISSI Team';

  const readingTime = post.readingTime ? `${post.readingTime} min read` :
    `${Math.max(1, Math.ceil((post.content?.root?.children?.length || 1) * 0.5))} min read`;

  return (
    <article className="group relative bg-card rounded-xl border border-border/50 overflow-hidden hover:border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Featured Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {post.featuredImage ? (
          <img
            src={`https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.card?.url || post.featuredImage.url}`}
            alt={post.featuredImage.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Categories */}
        {post.category && (
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {post.category.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
          <a
            href={`/${locale}/blog/${post.slug}`}
            className="block after:absolute after:inset-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg no-underline"
          >
            {post.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-xs">
                {authorName.charAt(0)}
              </span>
            </div>
            <span className="font-medium">{authorName}</span>
          </div>
          <span className="text-muted-foreground/50">•</span>
          <time dateTime={post.publishedAt} className="font-medium">
            {formatDate(post.publishedAt)}
          </time>
          <span className="text-muted-foreground/50">•</span>
          <span className="bg-muted px-2 py-1 rounded-md font-medium">{readingTime}</span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
    </article>
  );
}