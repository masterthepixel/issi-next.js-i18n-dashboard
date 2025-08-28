import type { CollectionConfig } from 'payload/types';
import { isEditor, isLoggedInOrPublished } from '../access';

// Hook to auto-generate slug from title
const slugifyHook = ({ data, req }: { data: any; req: any }) => {
    if (data?.title && !data?.slug) {
        return data.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    return data?.slug;
};

export const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: isEditor,
        delete: isEditor,
        read: isLoggedInOrPublished,
        update: isEditor,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'author', 'publishedAt', 'updatedAt'],
        group: 'Content',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            index: true, // Enables search indexing
            admin: {
                description: 'The main title of the blog post',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            localized: true,
            unique: true,
            index: true,
            admin: {
                position: 'sidebar',
                description: 'URL-friendly version of the title (auto-generated)',
            },
            hooks: {
                beforeChange: [slugifyHook],
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            localized: true,
            admin: {
                description: 'The main content of the blog post',
            },
        },
        {
            name: 'excerpt',
            type: 'textarea',
            localized: true,
            index: true,
            admin: {
                description: 'Short summary of the post (shown on listing pages)',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'The author of this blog post',
            },
        },
        {
            name: 'featuredImage',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
                description: 'Featured image for the blog post',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                description: 'When this post should be published (can be future date)',
            },
            hooks: {
                beforeChange: [
                    ({ data, req }) => {
                        // Auto-set published date if status is published and no date is set
                        if (data?.status === 'published' && !data?.publishedAt) {
                            return new Date();
                        }
                        return data?.publishedAt;
                    },
                ],
            },
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
                description: 'Publication status of the post',
            },
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
                description: 'Categories this post belongs to',
            },
        },
    ],
    timestamps: true,
    // Only show published posts to non-authenticated users
    defaultWhere: ({ req }) => {
        if (req.user) {
            return {};
        }
        
        return {
            and: [
                {
                    status: {
                        equals: 'published',
                    },
                },
                {
                    publishedAt: {
                        less_than_equal: new Date(),
                    },
                },
            ],
        };
    },
};