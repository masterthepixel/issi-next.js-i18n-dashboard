import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { buildConfig } from 'payload/config';

// Collections
import { Media } from './cms/collections/Media';
import { Pages } from './cms/collections/Pages';
import { Products } from './cms/collections/Products';
import { UIElements } from './cms/collections/UIElements';
import { Users } from './cms/collections/Users';

// Globals
import { Navigation } from './cms/globals/Navigation';
import { Settings } from './cms/globals/Settings';

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- ISSI Content Management',
            favicon: '/favicon.ico',
            ogImage: '/images/og-image.jpg',
        },
        css: path.resolve(__dirname, './cms/styles/admin.css'),
        dateFormat: 'yyyy-MM-dd HH:mm:ss',
        buildPath: path.resolve(__dirname, './build'),
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
    collections: [Products, Pages, Media, UIElements, Users],
    globals: [Settings, Navigation],
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
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://localhost:27017/issi-cms',
    }),
    plugins: [
        cloudStorage({
            collections: {
                media: {
                    adapter: s3Adapter({
                        config: {
                            endpoint: process.env.S3_ENDPOINT,
                            credentials: {
                                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                            },
                            region: process.env.S3_REGION || 'us-east-1',
                        },
                        bucket: process.env.S3_BUCKET,
                    }),
                },
            },
        }),
        seoPlugin({
            collections: ['products', 'pages'],
            uploadsCollection: 'media',
            generateTitle: ({ doc }) => `${doc?.title?.value || doc?.title} | ISSI`,
            generateDescription: ({ doc }) =>
                doc?.meta?.description?.value ||
                doc?.meta?.description ||
                doc?.description?.value ||
                doc?.description,
        }),
    ],
    rateLimit: {
        trustProxy: true,
        window: 2 * 60 * 1000, // 2 minutes
        max: 2400, // Limit each IP to 2400 requests per windowMs
    },
    cors: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ],
    csrf: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ],
});
