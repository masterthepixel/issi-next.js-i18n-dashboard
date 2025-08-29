import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.js'; // TypeScript files are compiled to .js

const clearDatabase = async () => {
    const payload = await getPayload({ config: configPromise });

    console.log('🗑️  Clearing database...');

    try {
        // Clear all collections
        const collections = ['users', 'posts', 'media', 'categories'] as const;

        for (const collection of collections) {
            const result = await payload.delete({
                collection,
                where: {},
            });
            console.log(`✅ Cleared ${result.docs?.length || 0} documents from ${collection}`);
        }

        console.log('🎯 Database cleared successfully!');
        console.log('🌱 Starting seed process...');

        // The seed function will be called automatically by onInit in config
        console.log('✨ Database seeding completed!');

    } catch (error) {
        console.error('❌ Error clearing database:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
};

clearDatabase();
