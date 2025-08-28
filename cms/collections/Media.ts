import path from 'path';
import type { CollectionConfig } from 'payload/types';
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
            name: 'focalPoint',
            type: 'point',
            admin: {
                description: 'Focal point for image cropping (optional)',
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