import path from 'path';
import type { CollectionConfig } from 'payload';
import { fileURLToPath } from 'url';

import { isLoggedIn, isLoggedInOrPublished } from '../access';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        create: isLoggedIn,
        delete: isLoggedIn,
        read: isLoggedInOrPublished,
        update: isLoggedIn,
    },
    admin: {
        useAsTitle: 'alt',
        group: 'Media',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            localized: true,
            required: true,
            admin: {
                description: 'Alternative text for accessibility and SEO',
            },
        },
        {
            name: 'caption',
            type: 'richText',
            localized: true,
            admin: {
                description: 'Optional caption displayed with the image',
            },
        },
        {
            name: 'focalX',
            type: 'number',
            admin: {
                description: 'Focal point X coordinate (0-1)',
                step: 0.01,
            },
        },
        {
            name: 'focalY',
            type: 'number',
            admin: {
                description: 'Focal point Y coordinate (0-1)',
                step: 0.01,
            },
        },
    ],
    upload: {
        // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
        staticDir: path.resolve(dirname, '../../../public/media'),
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 432,
                position: 'centre',
            },
            {
                name: 'hero',
                width: 1200,
                height: 600,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
};