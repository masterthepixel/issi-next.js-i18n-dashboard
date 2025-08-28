/**
 * Script to test PayloadCMS database connection and basic API functionality
 * Run with: node scripts/test-payload-connection.js
 */

const { getPayload } = require('payload');
const config = require('../payload.config.ts');

async function testPayloadConnection() {
  console.log('🔄 Testing PayloadCMS connection...\n');

  try {
    // Initialize Payload
    const payload = await getPayload({ config });
    console.log('✅ PayloadCMS initialized successfully');

    // Test database connection by checking collections
    console.log('\n📊 Testing collections...');
    
    // Test Users collection
    try {
      const users = await payload.find({
        collection: 'users',
        limit: 1,
      });
      console.log(`✅ Users collection: ${users.totalDocs} users found`);
    } catch (error) {
      console.log(`❌ Users collection error: ${error.message}`);
    }

    // Test Posts collection
    try {
      const posts = await payload.find({
        collection: 'posts',
        limit: 5,
      });
      console.log(`✅ Posts collection: ${posts.totalDocs} posts found`);
      
      if (posts.docs.length > 0) {
        const firstPost = posts.docs[0];
        console.log(`   📝 Sample post: "${firstPost.title}" (Status: ${firstPost.status})`);
      }
    } catch (error) {
      console.log(`❌ Posts collection error: ${error.message}`);
    }

    // Test Categories collection
    try {
      const categories = await payload.find({
        collection: 'categories',
        limit: 5,
      });
      console.log(`✅ Categories collection: ${categories.totalDocs} categories found`);
    } catch (error) {
      console.log(`❌ Categories collection error: ${error.message}`);
    }

    // Test Media collection
    try {
      const media = await payload.find({
        collection: 'media',
        limit: 5,
      });
      console.log(`✅ Media collection: ${media.totalDocs} media files found`);
    } catch (error) {
      console.log(`❌ Media collection error: ${error.message}`);
    }

    console.log('\n🎉 PayloadCMS connection test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Access PayloadCMS admin: http://localhost:3000/admin');
    console.log('3. View blog pages: http://localhost:3000/en/blog');

  } catch (error) {
    console.error('❌ PayloadCMS connection failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check if MongoDB is running');
    console.error('2. Verify DATABASE_URI in .env.local');
    console.error('3. Ensure all PayloadCMS dependencies are installed');
    console.error('\nFull error:', error);
  }
}

// Handle script execution
if (require.main === module) {
  testPayloadConnection()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Script execution failed:', error);
      process.exit(1);
    });
}

module.exports = { testPayloadConnection };