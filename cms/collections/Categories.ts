import type { CollectionConfig } from 'payload';

import { isLoggedIn, isLoggedInOrPublished } from '../access';

export const Categories: CollectionConfig = {
    slug: 'categories',
    access: {
        create: isLoggedIn,
        delete: isLoggedIn,
        read: isLoggedInOrPublished,
        update: isLoggedIn,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
        },
    ],
};