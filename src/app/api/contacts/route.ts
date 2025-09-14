import { NextRequest, NextResponse } from "next/server";

// Proxy to the external PayloadCMS contacts collection endpoint
const PAYLOAD_CONTACTS_URL = "https://issi-dashboard-payloadcms.vercel.app/api/contacts";

// Very small in-memory rate limiter. This is suitable for dev and single-instance deploys only.
// For production, use a shared store like Redis.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const ipCounters = new Map<string, { count: number; firstSeen: number }>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const entry = ipCounters.get(ip);
    if (!entry) {
        ipCounters.set(ip, { count: 1, firstSeen: now });
        return false;
    }

    if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
        // reset window
        ipCounters.set(ip, { count: 1, firstSeen: now });
        return false;
    }

    entry.count += 1;
    ipCounters.set(ip, entry);
    return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
    try {
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }

        const body = await request.json();

        // server-side basic validation and honeypot check
        const { firstName, lastName, email, message, hp } = body || {};
        if (hp && String(hp).length > 0) {
            // likely a bot
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const resp = await fetch(PAYLOAD_CONTACTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await resp.json();

        return NextResponse.json(data, {
            status: resp.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (err) {
        console.error("contacts proxy error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    );
}
