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
      notFound();
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
      <div className="min-h-screen">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2  " text-caption7690="true">
              <li>
                <a
                  href={`/${locale}`}
                  className="hover:text-primary transition-colors"
                >
                  {locale === 'en' ? 'Home' :
                    locale === 'fr' ? 'Accueil' :
                      'Inicio'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>→</span>
                <a
                  href={`/${locale}/blog`}
                  className="hover:text-primary transition-colors"
                >
                  {locale === 'en' ? 'Blog' :
                    locale === 'fr' ? 'Blog' :
                      'Blog'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>→</span>
                <span className="text-foreground font-medium line-clamp-1">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-8">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: any) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center px-3 py-1  " text-caption9155="true"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="md:text-4xl lg:text-5xl mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium  " text-caption10287="true">
                    {locale === 'en' ? 'By' :
                      locale === 'fr' ? 'Par' :
                        'Por'} {authorName}
                  </div>
                </div>
              </div>
              <div className="" text-caption10553="true">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.publishedAt !== post.updatedAt && (
                <div className="" text-caption10824="true">
                  {locale === 'en' ? 'Updated' :
                    locale === 'fr' ? 'Mis à jour' :
                      'Actualizado'} {formatDate(post.updatedAt)}
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage}
                alt={typeof post.featuredImage === 'object' ? post.featuredImage.alt : post.title}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
              {typeof post.featuredImage === 'object' && post.featuredImage.caption && (
                <div className="mt-2  " text-caption11683="true">
                  <RichTextRenderer content={post.featuredImage.caption} />
                </div>
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert
                         prose-headings:font-semibold prose-headings:tracking-tight
                         prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                         prose-strong:font-semibold prose-code: " text-caption11946="true">
            <RichTextRenderer content={post.content} />
          </div>

          {/* Author Bio */}
          {post.author && (
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-xl">
                    {authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2">
                    {locale === 'en' ? 'About the Author' :
                      locale === 'fr' ? 'À propos de l\'auteur' :
                        'Sobre el Autor'}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>{authorName}</strong>
                  </p>
                  <p className="" text-caption13567="true">
                    {post.author.role === 'admin' ? (
                      locale === 'en' ? 'Administrator and technology leader at ISSI.' :
                        locale === 'fr' ? 'Administrateur et leader technologique chez ISSI.' :
                          'Administrador y líder tecnológico en ISSI.'
                    ) : (
                      locale === 'en' ? 'Content contributor and technology expert at ISSI.' :
                        locale === 'fr' ? 'Contributeur de contenu et expert technologique chez ISSI.' :
                          'Colaborador de contenido y experto en tecnología en ISSI.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="" text-caption14497="true">
              {locale === 'en' ? 'Share this post:' :
                locale === 'fr' ? 'Partager cet article :' :
                  'Compartir este artículo:'}
            </span>
            <div className="flex gap-2">
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

          {/* Back to Blog Link */}
          <div className="text-center">
            <a
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              ← {locale === 'en' ? 'Back to Blog' :
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
  if (!content) return null;

  // This is a simplified rich text renderer
  // In a real implementation, you'd want to use @payloadcms/richtext-lexical-react
  // or implement a proper renderer for your chosen rich text format

  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Handle Lexical JSON format (simplified)
  if (content?.root?.children) {
    return (
      <div>
        {content.root.children.map((node: any, index: number) => (
          <RenderNode key={index} node={node} />
        ))}
      </div>
    );
  }

  // Fallback for other formats
  return <div>{JSON.stringify(content)}</div>;
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

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition-colors"
      aria-label={`${locale === 'en' ? 'Share on' : locale === 'fr' ? 'Partager sur' : 'Compartir en'} ${labels[platform]}`}
    >
      <span className="" text-caption19796="true">
        {platform.charAt(0).toUpperCase()}
      </span>
    </a>
  );
}