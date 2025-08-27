import type { CollectionConfig } from 'payload/types';

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'updatedAt'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            index: true, // Enables search indexing
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
            index: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        },
    ],
    timestamps: true,
};