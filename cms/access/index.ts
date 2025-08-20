import type { Access } from 'payload/types';
import type { User } from '../payload-types';

export const isAdmin: Access<User> = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin');
};

export const isEditor: Access = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin' || user?.role === 'editor');
};

export const isUser: Access = ({ req: { user } }) => {
    return Boolean(user);
};

export const isOwnerOrAdmin: Access = ({ req: { user } }) => {
    if (user?.role === 'admin') return true;

    return {
        id: {
            equals: user?.id,
        },
    };
};

export const isPublished: Access = () => {
    return {
        _status: {
            equals: 'published',
        },
    };
};

export const isPublishedOrAdmin: Access = ({ req: { user } }) => {
    if (user?.role === 'admin') return true;

    return {
        _status: {
            equals: 'published',
        },
    };
};

export const isLoggedIn: Access = ({ req: { user } }) => {
    return Boolean(user);
};

export const isLoggedInOrPublished: Access = ({ req: { user } }) => {
    if (user) return true;

    return {
        _status: {
            equals: 'published',
        },
    };
};
