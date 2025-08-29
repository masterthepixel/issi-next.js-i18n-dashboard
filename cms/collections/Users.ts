import type { CollectionConfig } from 'payload';
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
        // Allow user registration for initial admin creation
        create: ({ req: { user } }) => {
            // If no user logged in, allow creation (for first admin)
            if (!user) return true;
            // Admin users can create other users
            return Boolean(user?.role === 'admin');
        },
        // Allow users to read and update their own data
        read: ({ req: { user }, id }) => {
            // Allow admins to read all users
            if (user?.role === 'admin') return true;
            // Allow users to read their own profile
            if (user?.id === id) return true;
            return false;
        },
        update: ({ req: { user }, id }) => {
            // Allow admins to update all users
            if (user?.role === 'admin') return true;
            // Allow users to update their own profile
            if (user?.id === id) return true;
            return false;
        },
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
