import { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding data...');

  // Create admin user if it doesn't exist
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@issi.com',
        password: 'password123!', // Change this in production
        role: 'admin',
      },
    });
    payload.logger.info('Admin user created');
  }

  // Create sample categories
  const techCategory = await payload.create({
    collection: 'categories',
    data: {
      title: {
        en: 'Technology',
        fr: 'Technologie',
        es: 'Tecnología',
      },
    },
  });

  const businessCategory = await payload.create({
    collection: 'categories',
    data: {
      title: {
        en: 'Business',
        fr: 'Affaires',
        es: 'Negocios',
      },
    },
  });

  const innovationCategory = await payload.create({
    collection: 'categories',
    data: {
      title: {
        en: 'Innovation',
        fr: 'Innovation',
        es: 'Innovación',
      },
    },
  });

  payload.logger.info('Categories created');

  // Get admin user for blog posts
  const adminUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@issi.com',
      },
    },
    limit: 1,
  });

  const adminUserId = adminUser.docs[0]?.id;

  if (adminUserId) {
    // Create sample blog posts
    const samplePosts = [
      {
        title: {
          en: 'The Future of Government Technology',
          fr: 'L\'avenir de la technologie gouvernementale',
          es: 'El futuro de la tecnología gubernamental',
        },
        slug: {
          en: 'future-of-government-technology',
          fr: 'avenir-technologie-gouvernementale',
          es: 'futuro-tecnologia-gubernamental',
        },
        content: {
          en: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'As we advance into a new era of digital transformation, government technology stands at the forefront of innovation. This article explores the emerging trends and technologies that will shape the future of public sector IT.',
                },
              ],
            },
            {
              type: 'h2',
              children: [
                {
                  text: 'Cloud-First Strategies',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Government agencies are increasingly adopting cloud-first strategies to improve efficiency, reduce costs, and enhance security. This shift enables better scalability and faster deployment of new services.',
                },
              ],
            },
            {
              type: 'h2',
              children: [
                {
                  text: 'AI and Machine Learning Integration',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Artificial intelligence and machine learning are revolutionizing how government services are delivered. From automated document processing to predictive analytics for resource allocation, AI is transforming public sector operations.',
                },
              ],
            },
          ],
          fr: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Alors que nous entrons dans une nouvelle ère de transformation numérique, la technologie gouvernementale se trouve à l\'avant-garde de l\'innovation. Cet article explore les tendances émergentes et les technologies qui façonneront l\'avenir de l\'informatique du secteur public.',
                },
              ],
            },
          ],
          es: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'A medida que avanzamos hacia una nueva era de transformación digital, la tecnología gubernamental se encuentra a la vanguardia de la innovación. Este artículo explora las tendencias emergentes y las tecnologías que darán forma al futuro de las TI del sector público.',
                },
              ],
            },
          ],
        },
        excerpt: {
          en: 'Exploring emerging trends and technologies shaping the future of public sector IT.',
          fr: 'Explorer les tendances émergentes et les technologies qui façonnent l\'avenir de l\'informatique du secteur public.',
          es: 'Explorando las tendencias emergentes y tecnologías que dan forma al futuro de las TI del sector público.',
        },
        author: adminUserId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        categories: [techCategory.id, innovationCategory.id],
      },
      {
        title: {
          en: 'Building Scalable Enterprise Solutions',
          fr: 'Construire des solutions d\'entreprise évolutives',
          es: 'Construyendo soluciones empresariales escalables',
        },
        slug: {
          en: 'building-scalable-enterprise-solutions',
          fr: 'construire-solutions-entreprise-evolutives',
          es: 'construyendo-soluciones-empresariales-escalables',
        },
        content: {
          en: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'In today\'s rapidly evolving business landscape, organizations need solutions that can grow and adapt with their changing requirements. This post discusses key principles for building scalable enterprise solutions.',
                },
              ],
            },
            {
              type: 'h2',
              children: [
                {
                  text: 'Microservices Architecture',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Microservices architecture enables organizations to build applications as a collection of loosely coupled services, making them easier to develop, deploy, and scale independently.',
                },
              ],
            },
          ],
        },
        excerpt: {
          en: 'Key principles and strategies for developing enterprise solutions that scale.',
          fr: 'Principes clés et stratégies pour développer des solutions d\'entreprise qui évoluent.',
          es: 'Principios clave y estrategias para desarrollar soluciones empresariales que escalen.',
        },
        author: adminUserId,
        status: 'published',
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        categories: [techCategory.id, businessCategory.id],
      },
      {
        title: {
          en: 'Digital Transformation Best Practices',
          fr: 'Meilleures pratiques de transformation numérique',
          es: 'Mejores prácticas de transformación digital',
        },
        slug: {
          en: 'digital-transformation-best-practices',
          fr: 'meilleures-pratiques-transformation-numerique',
          es: 'mejores-practicas-transformacion-digital',
        },
        content: {
          en: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Digital transformation is more than just implementing new technology—it\'s about fundamentally changing how organizations operate and deliver value to customers.',
                },
              ],
            },
          ],
        },
        excerpt: {
          en: 'Essential practices for successful digital transformation initiatives.',
          fr: 'Pratiques essentielles pour des initiatives de transformation numérique réussies.',
          es: 'Prácticas esenciales para iniciativas de transformación digital exitosas.',
        },
        author: adminUserId,
        status: 'draft', // This one is a draft
        categories: [businessCategory.id, innovationCategory.id],
      },
    ];

    for (const post of samplePosts) {
      await payload.create({
        collection: 'posts',
        data: post,
      });
    }

    payload.logger.info('Sample blog posts created');
  }

  payload.logger.info('Seed data creation completed');
};