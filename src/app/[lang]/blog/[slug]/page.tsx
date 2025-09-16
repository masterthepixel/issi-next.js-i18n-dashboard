import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";

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

    const authorName = post.author
      ? `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim()
      : 'ISSI Team';

    const title = `${post.title} | ISSI Blog`;
    const description = post.excerpt || `Read the latest from ${authorName} on the ISSI blog.`;
    const featuredImageUrl = post.featuredImage
      ? (typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage)
      : `${baseUrl}/images/blog-og.jpg`;

    return {
      title,
      description,
      keywords: `ISSI blog, ${post.title}, ${authorName}, technology insights, software development`,
      authors: [{ name: authorName }],
      openGraph: {
        title,
        description,
        url: `${baseUrl}/${lang}/blog/${slug}`,
        siteName: "ISSI - International Software Systems",
        images: [
          {
            url: featuredImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: lang,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [authorName],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [featuredImageUrl],
        creator: `@issi_${authorName.replace(/\s+/g, '').toLowerCase()}`,
      },
      alternates: {
        canonical: `${baseUrl}/${lang}/blog/${slug}`,
        languages: {
          'en': `${baseUrl}/en/blog/${slug}`,
          'fr': `${baseUrl}/fr/blog/${slug}`,
          'es': `${baseUrl}/es/blog/${slug}`,
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  try {
    // Import the fetch function
    const { fetchPostBySlug } = await import("@/lib/data");
    const post = await fetchPostBySlug(slug, locale);

    if (!post) {
      console.log('❌ No post found for slug:', slug, 'locale:', locale);
      notFound();
    }

    console.log('✅ Post found:', {
      title: post.title,
      content: post.content ? 'Content exists' : 'No content',
      contentType: typeof post.content,
      contentKeys: post.content ? Object.keys(post.content) : 'No keys',
      fullPost: post
    });

    // If the post doesn't have essential content, create a fallback
    if (!post.title && !post.content) {
      console.log('⚠️ Post missing essential content, creating fallback');
      post.title = post.slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Sample Blog Post';
      post.excerpt = 'This is a sample blog post created for demonstration purposes.';
      post.content = {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This is a sample blog post created for demonstration purposes. The original post content was not available from the PayloadCMS API.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 2,
              children: [
                {
                  type: 'text',
                  text: 'GitHub-Style Blog Design'
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This page demonstrates a GitHub blog-inspired design using Shadcn UI theme variables and proper internationalization support. The layout includes:'
                }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'text',
                      text: 'Clean typography hierarchy'
                    }
                  ]
                },
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'text',
                      text: 'Responsive design patterns'
                    }
                  ]
                },
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'text',
                      text: 'Theme-aware styling'
                    }
                  ]
                },
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'text',
                      text: 'Proper accessibility features'
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The design follows modern web development best practices and provides an excellent reading experience across all devices.'
                }
              ]
            }
          ]
        }
      };
      post.author = {
        firstName: 'ISSI',
        lastName: 'Team',
        role: 'admin'
      };
      post.publishedAt = new Date().toISOString();
      post.updatedAt = new Date().toISOString();
    }

    const authorName = post.author
      ? `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim()
      : 'ISSI Team';

    // Format publication date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    };

    // Structured data for the blog post
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${baseUrl}/${locale}/blog/${slug}#article`,
          "url": `${baseUrl}/${locale}/blog/${slug}`,
          "headline": post.title,
          "description": post.excerpt || "",
          "datePublished": post.publishedAt,
          "dateModified": post.updatedAt,
          "author": {
            "@type": "Person",
            "name": authorName,
          },
          "publisher": {
            "@type": "Organization",
            "@id": `${baseUrl}#organization`,
            "name": "International Software Systems, Inc. (ISSI)",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/images/issi_logo.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/${locale}/blog/${slug}#webpage`
          },
          "image": post.featuredImage
            ? {
              "@type": "ImageObject",
              "url": typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage,
              "width": 1200,
              "height": 630
            }
            : undefined,
          "articleSection": post.categories?.map((cat: any) => cat.title) || ["Technology"],
          "keywords": post.categories?.map((cat: any) => cat.title).join(", ") || "technology, software development",
          "wordCount": post.content ? JSON.stringify(post.content).length / 6 : 0, // Rough estimate
          "articleBody": post.content ? JSON.stringify(post.content) : ""
        },
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/${locale}/blog/${slug}#webpage`,
          "url": `${baseUrl}/${locale}/blog/${slug}`,
          "name": post.title,
          "description": post.excerpt || "",
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `${baseUrl}/${locale}/blog/${slug}`
              }
            ]
          }
        }
      ]
    };

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="max-w-5xl mx-auto px-6 py-12">
          {/* Breadcrumb Navigation */}
          <nav className="mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href={`/${locale}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {locale === 'en' ? 'Home' :
                    locale === 'fr' ? 'Accueil' :
                      'Inicio'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">/</span>
                <a
                  href={`/${locale}/blog`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {locale === 'en' ? 'Blog' :
                    locale === 'fr' ? 'Blog' :
                      'Blog'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category: any) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {authorName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author?.role === 'admin' ? (
                      locale === 'en' ? 'Technology Leader' :
                        locale === 'fr' ? 'Leader Technologique' :
                          'Líder Tecnológico'
                    ) : (
                      locale === 'en' ? 'Technology Expert' :
                        locale === 'fr' ? 'Expert Technologique' :
                          'Experto en Tecnología'
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt} className="text-sm font-medium">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.publishedAt !== post.updatedAt && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">
                    {locale === 'en' ? 'Updated' :
                      locale === 'fr' ? 'Mis à jour' :
                        'Actualizado'} {formatDate(post.updatedAt)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">
                  {locale === 'en' ? '5 min read' :
                    locale === 'fr' ? '5 min de lecture' :
                      '5 min de lectura'}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage}
                  alt={typeof post.featuredImage === 'object' ? post.featuredImage.alt : post.title}
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              {typeof post.featuredImage === 'object' && post.featuredImage.caption && (
                <div className="mt-4 text-center">
                  <div className="text-sm text-muted-foreground italic">
                    <RichTextRenderer content={post.featuredImage.caption} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-xl max-w-none dark:prose-invert
                         prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                         prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                         prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
                         prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                         prose-strong:font-bold prose-strong:text-foreground
                         prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:text-sm
                         prose-pre:bg-muted prose-pre:border prose-pre:border-border
                         prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r
                         prose-ul:my-6 prose-ol:my-6
                         prose-li:my-2">
            <RichTextRenderer content={post.content} />
          </div>

          {/* Author Bio */}
          {post.author && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {authorName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {locale === 'en' ? 'About the Author' :
                      locale === 'fr' ? 'À propos de l\'auteur' :
                        'Sobre el Autor'}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {authorName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.author.role === 'admin' ? (
                      locale === 'en' ? 'Technology leader and administrator at ISSI, driving innovation and digital transformation initiatives across international markets.' :
                        locale === 'fr' ? 'Leader technologique et administrateur chez ISSI, conduisant l\'innovation et les initiatives de transformation numérique sur les marchés internationaux.' :
                          'Líder tecnológico y administrador en ISSI, impulsando la innovación y las iniciativas de transformación digital en mercados internacionales.'
                    ) : (
                      locale === 'en' ? 'Technology expert and content contributor at ISSI, specializing in cutting-edge software solutions and industry insights.' :
                        locale === 'fr' ? 'Expert technologique et contributeur de contenu chez ISSI, spécialisé dans les solutions logicielles de pointe et les perspectives industrielles.' :
                          'Experto en tecnología y colaborador de contenido en ISSI, especializado en soluciones de software de vanguardia y perspectivas de la industria.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Social Share Buttons */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {locale === 'en' ? 'Share this article' :
                  locale === 'fr' ? 'Partager cet article' :
                    'Compartir este artículo'}
              </span>
              <div className="flex gap-3">
                <SocialShareButton
                  platform="twitter"
                  url={`${baseUrl}/${locale}/blog/${slug}`}
                  title={post.title}
                  locale={locale}
                />
                <SocialShareButton
                  platform="linkedin"
                  url={`${baseUrl}/${locale}/blog/${slug}`}
                  title={post.title}
                  locale={locale}
                />
                <SocialShareButton
                  platform="facebook"
                  url={`${baseUrl}/${locale}/blog/${slug}`}
                  title={post.title}
                  locale={locale}
                />
              </div>
            </div>
          </div>

          {/* Back to Blog Link */}
          <div className="text-center pt-8 border-t border-border">
            <a
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 no-underline"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {locale === 'en' ? 'Back to Blog' :
                locale === 'fr' ? 'Retour au Blog' :
                  'Volver al Blog'}
            </a>
          </div>
        </article>
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
    console.log('❌ No content provided to RichTextRenderer');
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-muted-foreground">No content available</p>
      </div>
    );
  }

  console.log('🔍 RichTextRenderer received content:', content);
  console.log('🔍 Content type:', typeof content);

  // This is a simplified rich text renderer
  // In a real implementation, you'd want to use @payloadcms/richtext-lexical-react
  // or implement a proper renderer for your chosen rich text format

  if (typeof content === 'string') {
    console.log('📝 Rendering string content');
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Handle Lexical JSON format (simplified)
  if (content?.root?.children) {
    console.log('📝 Rendering Lexical JSON content with', content.root.children.length, 'children');
    return (
      <div>
        {content.root.children.map((node: any, index: number) => (
          <RenderNode key={index} node={node} />
        ))}
      </div>
    );
  }

  // Fallback for other formats
  console.log('📝 Rendering JSON fallback');
  return (
    <div className="p-4 bg-muted rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Debug: Content Structure</h3>
      <pre className="text-sm overflow-auto">{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}

function RenderNode({ node }: { node: any }) {
  if (!node) return null;

  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          {node.children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </p>
      );
    case 'heading':
      const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag>
          {node.children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </HeadingTag>
      );
    case 'text':
      let textElement = node.text || '';
      if (node.format) {
        if (node.format.includes('bold')) textElement = <strong>{textElement}</strong>;
        if (node.format.includes('italic')) textElement = <em>{textElement}</em>;
        if (node.format.includes('underline')) textElement = <u>{textElement}</u>;
      }
      return textElement;
    case 'link':
      return (
        <a href={node.url} target={node.newTab ? '_blank' : undefined} rel={node.newTab ? 'noopener noreferrer' : undefined}>
          {node.children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </a>
      );
    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <ListTag>
          {node.children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </ListTag>
      );
    case 'listitem':
      return (
        <li>
          {node.children?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </li>
      );
    default:
      return null;
  }
}

// Social Share Button Component
function SocialShareButton({
  platform,
  url,
  title,
  locale
}: {
  platform: 'twitter' | 'linkedin' | 'facebook';
  url: string;
  title: string;
  locale: Locale;
}) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const labels = {
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
  };

  const icons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      aria-label={`${locale === 'en' ? 'Share on' : locale === 'fr' ? 'Partager sur' : 'Compartir en'} ${labels[platform]}`}
    >
      <span className="text-gray-600 dark:text-gray-300">
        {icons[platform]}
      </span>
    </a>
  );
}