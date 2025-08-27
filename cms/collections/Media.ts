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
    fields: [
        {
            name: 'alt',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'caption',
            type: 'richText',
            localized: true,
        },
    ],
    upload: {
        // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
        staticDir: path.resolve(dirname, '../../../public/media'),
    },
};