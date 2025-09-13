import { NextRequest, NextResponse } from 'next/server';

const PAYLOAD_API_URL = 'https://issi-dashboard-payloadcms.vercel.app/api/jobposts';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Build the PayloadCMS API URL with query parameters
        const payloadUrl = new URL(PAYLOAD_API_URL);
        searchParams.forEach((value, key) => {
            payloadUrl.searchParams.set(key, value);
        });

        // Forward the request to PayloadCMS
        const response = await fetch(payloadUrl.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch jobs from PayloadCMS' },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Return the response with CORS headers
        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
