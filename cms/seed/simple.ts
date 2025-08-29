import { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
    payload.logger.info('Seeding data...');

    // Create admin user if it doesn't exist
    const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
    });

    if (existingUsers.docs.length === 0) {
        await payload.create({
            collection: 'users',
            data: {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@issi.com',
                password: 'password123!', // Change this in production
                role: 'admin',
            },
        });
        payload.logger.info('Admin user created');
    }

    payload.logger.info('Seeding completed successfully!');
};
