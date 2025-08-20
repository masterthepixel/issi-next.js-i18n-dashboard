import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        tokenExpiration: 7200, // 2 hours
        verify: false,
        maxLoginAttempts: 5,
        lockTime: 600 * 1000, // 10 minutes
    },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['firstName', 'lastName', 'email', 'role', 'updatedAt'],
        group: 'System',
    },
    access: {
        read: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'firstName',
            type: 'text',
            required: true,
        },
        {
            name: 'lastName',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'editor',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'Editor',
                    value: 'editor',
                },
                {
                    label: 'Translator',
                    value: 'translator',
                },
                {
                    label: 'Viewer',
                    value: 'viewer',
                },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'preferences',
            type: 'group',
            fields: [
                {
                    name: 'language',
                    type: 'select',
                    defaultValue: 'en',
                    options: [
                        {
                            label: 'English',
                            value: 'en',
                        },
                        {
                            label: 'Français',
                            value: 'fr',
                        },
                        {
                            label: 'Español',
                            value: 'es',
                        },
                    ],
                },
                {
                    name: 'theme',
                    type: 'select',
                    defaultValue: 'auto',
                    options: [
                        {
                            label: 'Auto',
                            value: 'auto',
                        },
                        {
                            label: 'Light',
                            value: 'light',
                        },
                        {
                            label: 'Dark',
                            value: 'dark',
                        },
                    ],
                },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'lastLogin',
            type: 'date',
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
        },
    ],
    timestamps: true,
};
