import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Proxy the request to PayloadCMS
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.errors?.[0]?.message || data.message || "Login failed",
      }, { status: response.status });
    }
    
    return NextResponse.json({
      success: true,
      token: data.token,
      user: data.user,
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Network error",
    }, { status: 500 });
  }
}