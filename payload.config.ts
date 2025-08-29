import { postgresAdapter } from '@payloadcms/db-postgres';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { slateEditor } from '@payloadcms/richtext-slate';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig, type Payload } from 'payload';

// Collections
import { Categories } from './cms/collections/Categories';
import { Media } from './cms/collections/Media';
import { Posts } from './cms/collections/Posts';
import { Users } from './cms/collections/Users';

// Seed data
import { seed } from './cms/seed/simple';

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || 'your-encryption-key-here',
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '- ISSI Content Management',
        },
        dateFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    editor: slateEditor({
        admin: {
            elements: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'blockquote',
                'ul',
                'ol',
                'li',
                'link',
                'textAlign',
                'indent',
                'upload',
            ],
            leaves: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'code',
            ],
        },
    }),
    collections: [Users, Posts, Media, Categories],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    localization: {
        locales: [
            {
                label: 'English',
                code: 'en',
            },
            {
                label: 'Français',
                code: 'fr',
            },
            {
                label: 'Español',
                code: 'es',
            },
        ],
        defaultLocale: 'en',
        fallback: true,
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || 'postgresql://localhost:5432/payload',
        },
    }),
    plugins: [
        vercelBlobStorage({
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
        seoPlugin({
            collections: ['users'],
            uploadsCollection: 'media',
            generateTitle: ({ doc }) => `${doc?.title?.value || doc?.title} | ISSI`,
            generateDescription: ({ doc }) =>
                doc?.meta?.description?.value ||
                doc?.meta?.description ||
                doc?.description?.value ||
                doc?.description,
        }),
    ],
    cors: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ],
    csrf: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ],
    onInit: async (payload: Payload) => {
        // Run seed data on initialization if no users exist
        const existingUsers = await payload.find({
            collection: 'users',
            limit: 1,
        });

        if (existingUsers.docs.length === 0) {
            await seed(payload);
        }
    },
});
