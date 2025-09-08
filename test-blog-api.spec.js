// Test Blog-specific PayloadCMS API endpoints - Blog Backend Verification
const API_BASE = 'https://issi-dashboard-payloadcms.vercel.app';

async function testEndpoint(url, description) {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`📡 URL: ${url}`);

    try {
        const response = await fetch(url);
        console.log(`📊 Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            console.log(`📄 Content-Type: ${contentType || 'No content-type header'}`);

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log(`📋 Response Keys: ${Object.keys(data).join(', ')}`);

                // Show data structure summary
                if (data.collections) {
                    console.log(`📂 Collections Available: ${data.collections.map(c => c.slug).join(', ')}`);
                }

                if (Array.isArray(data.docs)) {
                    console.log(`📊 Documents Found: ${data.docs.length}`);
                    if (data.docs.length > 0) {
                        console.log(`🔑 Sample Keys: ${Object.keys(data.docs[0]).join(', ')}`);
                    }
                }

                // Pagination info if available
                if (data.totalDocs) {
                    console.log(`📈 Total Documents: ${data.totalDocs}`);
                }

                console.log('✅ SUCCESS: Endpoint responding correctly');
                return { success: true, data: data };

            } else {
                const text = await response.text();
                console.log(`📝 Text Response (first 200 chars): ${text.substring(0, 200)}`);
            }

        } else {
            console.log('❌ FAILED: Non-200 status code');

            if (response.status === 404) {
                console.log('🔍 Note: This endpoint does not exist yet');
            } else if (response.status === 403) {
                console.log('🔒 Note: Authentication required');
            } else if (response.status === 500) {
                console.log('💥 Note: Server error - backend needs implementation');
            }

            return { success: false, status: response.status };
        }

    } catch (error) {
        console.log(`💥 ERROR: ${error.message}`);
        if (error.message.includes('CORS')) {
            console.log('🌐 Note: CORS policy may be blocking request');
        } else if (error.message.includes('fetch')) {
            console.log('📶 Note: Network connectivity issue');
        }
        return { success: false, error: error.message };
    }
}

async function runBlogApiTests() {
    console.log('📰 BLOG API TESTING STARTED');
    console.log(`🎯 Target: ${API_BASE}`);
    console.log('='.repeat(60));

    // Blog-specific endpoints that the frontend requires
    const tests = [
        // Core blog endpoints
        { url: `${API_BASE}/api`, description: 'API Root Endpoint' },
        { url: `${API_BASE}/api/posts?page=1&limit=10&depth=2`, description: 'Posts Collection (Blog Posts)' },
        { url: `${API_BASE}/api/posts?page=1&limit=10&locale=en&depth=2`, description: 'Posts in English' },
        { url: `${API_BASE}/api/posts?page=1&limit=10&locale=fr&depth=2`, description: 'Posts in French' },
        { url: `${API_BASE}/api/posts?page=1&limit=10&locale=es&depth=2`, description: 'Posts in Spanish' },
        { url: `${API_BASE}/api/categories?locale=en`, description: 'Categories Collection' },
        { url: `${API_BASE}/api/media`, description: 'Media Collection' },
        { url: `${API_BASE}/api/users`, description: 'Users Collection (Authors)' },

        // Specific blog functionality endpoints
        { url: `${API_BASE}/api/posts?where={"status":{"equals":"published"}}&locale=en`, description: 'Published Blog Posts' },
        { url: `${API_BASE}/api/posts?search=blog&locale=en`, description: 'Posts Search Test' },
        { url: `${API_BASE}/api/posts?sort=-publishedAt&locale=en`, description: 'Posts Sorted by Date' },
    ];

    const results = [];

    for (const test of tests) {
        const result = await testEndpoint(test.url, test.description);
        results.push({ ...test, result });
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 BLOG API TEST SUMMARY');
    console.log('='.repeat(60));

    const successful = results.filter(r => r.result.success).length;
    const failed = results.filter(r => !r.result.success).length;

    console.log(`✅ Working Endpoints: ${successful}`);
    console.log(`❌ Missing/Broken Endpoints: ${failed}`);

    // Detailed breakdown
    console.log('\n🔍 WORKING ENDPOINTS:');
    results.filter(r => r.result.success).forEach(r => {
        console.log(`  ✅ ${r.description}`);
    });

    console.log('\n🔧 MISSING/FAILED ENDPOINTS:');
    results.filter(r => !r.result.success).forEach(r => {
        const status = r.result.status === 404 ? '404 (Not Found)' : r.result.status ? `${r.result.status}` : 'Error';
        console.log(`  ❌ ${r.description} - ${status}`);
    });

    console.log('\n🎯 BLOG-SPECIFIC PRIORITY RECOMMENDATIONS:');
    console.log('  1. Deploy PayloadCMS with posts collection (/api/posts)');
    console.log('  2. Configure multilingual support (/api/posts?locale=...)');
    console.log('  3. Implement categories (/api/categories)');
    console.log('  4. Set up media collection (/api/media)');
    console.log('  5. Create users collection (/api/users for authors)');
    console.log('  6. Enable search functionality');
    console.log('  7. Configure published status filtering');

    // Specific to blog functionality
    console.log('\n📝 BLOG FUNCTIONALITY BLOCKERS IDENTIFIED:');
    const blogEndpoints = results.filter(r => r.description.includes('Posts') || r.description.includes('Categories') || r.description.includes('Media') || r.description.includes('Users'));
    const allBlogEndpointsFailed = blogEndpoints.filter(r => !r.result.success).length === blogEndpoints.length;

    if (allBlogEndpointsFailed) {
        console.log('  🚫 ALL BLOG ENDPOINTS FAILING - Blog completely non-functional');
        console.log('  🚫 No content available for blog index pages');
        console.log('  🚫 No data for blog post detail pages');
        console.log('  🚫 No categories for filtering');
        console.log('  🚫 No media for images');
        console.log('  🚫 No authors/users for attribution');
    }

    return results;
}

// Export and run
try {
    runBlogApiTests().then(results => {
        console.log('\n🏁 Blog API Testing Completed');
        console.log(`📋 Tested ${results.length} blog-related endpoints`);
        const successfulCount = results.filter(r => r.result.success).length;
        console.log(`📊 Results: ${successfulCount} working, ${results.length - successfulCount} failed`);
        console.log('\n📍 ACTION REQUIRED: Deploy PayloadCMS with posts collection to fix blog');
    }).catch(error => {
        console.error('❌ Blog API Testing Failed:', error);
    });
} catch (error) {
    console.error('💥 Script Execution Error:', error);
}