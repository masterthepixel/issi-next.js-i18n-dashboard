// Test PayloadCMS API endpoints - Verification Script
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

            } else {
                const text = await response.text();
                console.log(`📝 Text Response (first 200 chars): ${text.substring(0, 200)}`);
            }

            console.log('✅ SUCCESS: Endpoint responding correctly');
            return { success: true, data: data };

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

async function runPayloadCMSTests() {
    console.log('🚀 PayloadCMS API Testing Started');
    console.log(`🎯 Target: ${API_BASE}`);
    console.log('='.repeat(60));

    const tests = [
        // Core API endpoints
        { url: `${API_BASE}/api`, description: 'API Root Endpoint' },
        { url: `${API_BASE}/api/jobposts`, description: 'Job Posts Collection' },
        { url: `${API_BASE}/api/companies`, description: 'Companies Collection' },
        { url: `${API_BASE}/api/users`, description: 'Users Collection' },

        // Critical missing endpoints
        { url: `${API_BASE}/api/applications`, description: 'Applications Collection (Critical for MVP)' },
        { url: `${API_BASE}/api/interviews`, description: 'Interviews Collection (High Priority)' },
        { url: `${API_BASE}/api/jobseekers`, description: 'Job Seekers Collection (Critical for MVP)' },

        // Upload endpoints
        { url: `${API_BASE}/api/upload`, description: 'File Upload Endpoint' },

        // NextAuth endpoints
        { url: `${API_BASE}/api/auth/providers`, description: 'NextAuth Providers' },
    ];

    const results = [];

    for (const test of tests) {
        const result = await testEndpoint(test.url, test.description);
        results.push({ ...test, result });
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
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

    console.log('\n🎯 PRIORITY RECOMMENDATIONS:');
    console.log('  1. Implement Applications collection (/api/applications)');
    console.log('  2. Implement Users collection enhancements');
    console.log('  3. Implement Job Seekers profile endpoint');
    console.log('  4. Set up file upload system');
    console.log('  5. Configure authentication and access control');

    return results;
}

// Export for potential use in other tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testEndpoint, runPayloadCMSTests };
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
    runPayloadCMSTests().then(results => {
        console.log('\n🏁 PayloadCMS API Testing Completed');
        process.exit(0);
    }).catch(error => {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    });
}