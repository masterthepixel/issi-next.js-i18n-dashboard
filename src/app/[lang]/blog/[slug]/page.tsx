import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { BlogSidebar } from "../components";

export async function generateStaticParams() {
  // For external PayloadCMS, we'll skip static generation to avoid issues
  // The posts will be dynamically fetched at runtime
  return [];
}

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  try {
    // Import the fetch function
    const { fetchPostBySlug } = await import("@/lib/data");
    const post = await fetchPostBySlug(slug, lang);

    if (!post) {
      return {
        title: 'Post Not Found | ISSI',
        description: 'The requested blog post could not be found.',
      };
    }

    const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
      ? post.populatedAuthors[0].name
      : 'ISSI Team';

    const title = `${post.title} | ISSI Blog`;
    const description = post.excerpt || `Read the latest from ${authorName} on the ISSI blog.`;
    const featuredImageUrl = post.featuredImage
      ? `https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.url}`
      : `${baseUrl}/images/blog-og.webp`;

    return {
      title,
      description,
      keywords: `ISSI blog, ${post.title}, ${authorName}, technology insights, software development`,
      robots: 'index, follow',
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${lang}/blog/${slug}`,
        images: [
          {
            url: featuredImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        siteName: 'ISSI - International Software Systems',
        locale: lang,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [featuredImageUrl],
      },
      alternates: {
        canonical: `${baseUrl}/${lang}/blog/${slug}`,
        languages: {
          'en': `${baseUrl}/en/blog/${slug}`,
          'fr': `${baseUrl}/fr/blog/${slug}`,
          'es': `${baseUrl}/es/blog/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | ISSI',
      description: 'Read the latest insights and thought leadership from ISSI.',
    };
  }
}

interface Props {
  params: Promise<{
    lang: Locale;
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { lang: locale, slug } = await params;

  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} slug={slug} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
  slug: string;
}

async function PageContent({ locale, slug }: PageContentProps) {
  try {
    // Import the fetch functions
    const { fetchPostBySlug, fetchPosts } = await import("@/lib/data");
    const post = await fetchPostBySlug(slug, locale);

    if (!post) {
      console.log('❌ No post found for slug:', slug, 'locale:', locale);
      notFound();
    }

    console.log('✅ Post found:', {
      title: post.title,
      content: post.content ? 'Content exists' : 'No content',
      slug: post.slug
    });

    // Fetch related posts (same category or recent posts)
    let relatedPosts = [];
    try {
      if (post.category) {
        // Try to get posts from the same category
        const relatedResult = await fetchPosts({
          where: {
            category: { equals: post.category.id },
            slug: { not_equals: slug }, // Exclude current post
            _status: { equals: 'published' }
          },
          locale,
          limit: 3
        });
        relatedPosts = relatedResult.docs || [];
      }

      // If not enough related posts, fill with recent posts
      if (relatedPosts.length < 3) {
        const recentResult = await fetchPosts({
          where: {
            slug: { not_equals: slug }, // Exclude current post
            _status: { equals: 'published' }
          },
          locale,
          limit: 3 - relatedPosts.length
        });
        relatedPosts = [...relatedPosts, ...(recentResult.docs || [])];
      }
    } catch (error) {
      console.warn('Failed to fetch related posts:', error);
      relatedPosts = [];
    }

    // Fetch categories
    let categories = [];
    try {
      const categoriesResult = await fetchPosts({
        where: { _status: { equals: 'published' } },
        locale,
        limit: 50 // Get enough posts to extract unique categories
      });

      // Extract unique categories
      const categoryMap = new Map();
      categoriesResult.docs?.forEach((p: any) => {
        if (p.category && !categoryMap.has(p.category.id)) {
          categoryMap.set(p.category.id, p.category);
        }
      });
      categories = Array.from(categoryMap.values());
    } catch (error) {
      console.warn('Failed to fetch categories:', error);
      categories = [];
    }

    const authorName = post.populatedAuthors && post.populatedAuthors.length > 0
      ? post.populatedAuthors[0].name
      : 'ISSI Team';

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    };

    const readingTime = post.readingTime ? `${post.readingTime} min read` :
      `${Math.max(1, Math.ceil((post.content?.root?.children?.length || 1) * 0.5))} min read`;

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-8">
              {/* Header */}
              <header className="space-y-6">
                {/* Categories */}
                {post.category && (
                  <div>
                    <span className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                      {post.category.title}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-normal leading-tight text-foreground tracking-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
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
              </header>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={`https://issi-dashboard-payloadcms.vercel.app${post.featuredImage.sizes?.desktop?.url || post.featuredImage.url}`}
                    alt={post.featuredImage.alt || post.title}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="prose prose-xl max-w-none dark:prose-invert
                             prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
                             prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                             prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10
                             prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                             prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
                             prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                             prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                             prose-strong:font-normal prose-strong:text-foreground
                             prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:text-sm
                             prose-pre:bg-muted prose-pre:border prose-pre:border-border
                             prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r
                             prose-ul:my-6 prose-ol:my-6
                             prose-li:my-2">
                <RichTextRenderer content={post.content} />
              </div>

              {/* Author Bio */}
              {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-2xl">
                        {authorName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-normal text-foreground mb-2">
                        {authorName}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Software Development Expert at ISSI
                      </p>
                      <p className="text-foreground leading-relaxed">
                        Contributing to ISSI's mission of delivering high-quality, cost-effective software solutions
                        for government and enterprise clients since 1995.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 self-start">
                <BlogSidebar
                  currentPost={post}
                  relatedPosts={relatedPosts}
                  categories={categories}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

// Rich Text Renderer Component
function RichTextRenderer({ content }: { content: any }) {
  if (!content) {
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-muted-foreground">No content available</p>
      </div>
    );
  }

  console.log('🔍 RichTextRenderer received content:', content);

  // Handle Lexical content format
  if (content.root && content.root.children) {
    return <div>{renderLexicalNodes(content.root.children)}</div>;
  }

  // Handle string content
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Fallback for unknown format
  return (
    <div className="p-4 bg-muted rounded-lg">
      <p className="text-muted-foreground">Content format not supported</p>
    </div>
  );
}

// Helper function to render Lexical nodes
function renderLexicalNodes(nodes: any[]): React.ReactNode {
  if (!Array.isArray(nodes)) return null;

  return nodes.map((node, index) => {
    if (!node || typeof node !== 'object') return null;

    const key = `node-${index}`;

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={key}>
            {node.children && renderLexicalNodes(node.children)}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={key}>
            {node.children && renderLexicalNodes(node.children)}
          </HeadingTag>
        );

      case 'text':
        let textContent = node.text || '';

        // Handle text formatting
        if (node.format) {
          if (typeof node.format === 'string') {
            if (node.format.includes('bold')) {
              textContent = <strong key={key}>{textContent}</strong>;
            }
            if (node.format.includes('italic')) {
              textContent = <em key={key}>{textContent}</em>;
            }
          } else if (typeof node.format === 'number') {
            // Handle numeric format flags
            if (node.format & 1) { // Bold
              textContent = <strong key={key}>{textContent}</strong>;
            }
            if (node.format & 2) { // Italic
              textContent = <em key={key}>{textContent}</em>;
            }
          }
        }

        return textContent;

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return (
          <ListTag key={key}>
            {node.children && renderLexicalNodes(node.children)}
          </ListTag>
        );

      case 'listitem':
        return (
          <li key={key}>
            {node.children && renderLexicalNodes(node.children)}
          </li>
        );

      case 'link':
        return (
          <a key={key} href={node.url} target={node.newTab ? '_blank' : undefined} rel={node.newTab ? 'noopener noreferrer' : undefined}>
            {node.children && renderLexicalNodes(node.children)}
          </a>
        );

      case 'quote':
        return (
          <blockquote key={key}>
            {node.children && renderLexicalNodes(node.children)}
          </blockquote>
        );

      default:
        // Handle unknown node types gracefully
        if (node.children) {
          return <div key={key}>{renderLexicalNodes(node.children)}</div>;
        }
        return null;
    }
  });
}