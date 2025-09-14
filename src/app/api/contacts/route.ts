import { NextRequest, NextResponse } from 'next/server';

// Proxy to the external PayloadCMS contacts collection endpoint
const PAYLOAD_CONTACTS_URL = 'https://issi-dashboard-payloadcms.vercel.app/api/contacts';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const resp = await fetch(PAYLOAD_CONTACTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await resp.json();

        return NextResponse.json(data, {
            status: resp.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err) {
        console.error('contacts proxy error', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
