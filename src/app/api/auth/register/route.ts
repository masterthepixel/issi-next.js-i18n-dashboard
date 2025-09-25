import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Proxy the request to PayloadCMS
    const response = await fetch(`${API_BASE_URL}/users`, {
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
        message: data.errors?.[0]?.message || data.message || "Registration failed",
      }, { status: response.status });
    }
    
    // For registration, we need to log the user in to get a token
    if (data.doc && data.doc.email) {
      try {
        const loginResponse = await fetch(`${API_BASE_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.doc.email,
            password: body.password,
          }),
        });
        
        const loginData = await loginResponse.json();
        
        if (loginResponse.ok && loginData.token) {
          return NextResponse.json({
            success: true,
            token: loginData.token,
            user: loginData.user,
          });
        }
      } catch (loginError) {
        // If login fails, still return success for registration
        console.warn('Auto-login after registration failed:', loginError);
      }
    }
    
    return NextResponse.json({
      success: true,
      user: data.doc,
      message: "Registration successful. Please log in.",
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Network error",
    }, { status: 500 });
  }
}
