import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

// File upload configuration
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Validate file
function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: PDF, DOC, DOCX`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds limit. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

// POST /api/upload/resume - Upload resume file
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization required for file upload' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Let's try uploading without any alt field and see what happens
    // Maybe the alt field isn't actually required for file uploads
    console.log('Uploading file to PayloadCMS without alt field:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const payloadFormData = new FormData();
    payloadFormData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
      },
      body: payloadFormData,
    });

    console.log('Upload response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayloadCMS upload error:', errorData);
      
      // Check if this is specifically about alt field or other validation
      if (errorData.errors?.some((error: any) => error.message?.includes('Alt'))) {
        console.log('Alt field is required by PayloadCMS configuration');
        
        // Since alt field is required, let's just provide a minimal one
        console.log('Uploading with minimal alt field...');
        
        const retryFormData = new FormData();
        retryFormData.append('file', file);
        retryFormData.append('alt', ''); // Try empty string
        
        const retryResponse = await fetch(`${API_BASE_URL}/media`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
          },
          body: retryFormData,
        });
        
        if (!retryResponse.ok) {
          // If empty string fails, try with actual content
          const finalFormData = new FormData();
          finalFormData.append('file', file);
          finalFormData.append('alt', 'Uploaded file'); // Simple, generic alt text
          
          const finalResponse = await fetch(`${API_BASE_URL}/media`, {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
            },
            body: finalFormData,
          });
          
          if (!finalResponse.ok) {
            const finalError = await finalResponse.json();
            console.error('Final upload attempt failed:', finalError);
            throw new Error('PayloadCMS alt field validation failed - check collection configuration');
          }
          
          const finalResult = await finalResponse.json();
          console.log('Upload successful with generic alt text');
          
          return NextResponse.json(
            {
              success: true,
              id: finalResult.doc.id,
              filename: finalResult.doc.filename,
              originalName: file.name,
              url: finalResult.doc.url,
              size: finalResult.doc.filesize,
              type: finalResult.doc.mimeType,
            },
            { status: 201 }
          );
        } else {
          const retryResult = await retryResponse.json();
          console.log('Upload successful with empty alt field');
          
          return NextResponse.json(
            {
              success: true,
              id: retryResult.doc.id,
              filename: retryResult.doc.filename,
              originalName: file.name,
              url: retryResult.doc.url,
              size: retryResult.doc.filesize,
              type: retryResult.doc.mimeType,
            },
            { status: 201 }
          );
        }
      } else {
        // Not an alt field issue, some other validation problem
        console.error('Upload failed for non-alt field reason:', errorData);
        throw new Error(errorData.message || 'Failed to upload to PayloadCMS');
      }
    }

    const result = await response.json();
    
    return NextResponse.json(
      {
        success: true,
        id: result.doc.id,
        filename: result.doc.filename,
        originalName: file.name,
        url: result.doc.url,
        size: result.doc.filesize,
        type: result.doc.mimeType,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload resume' },
      { status: 500 }
    );
  }
}

// GET /api/upload/resume - Get user's uploaded resumes
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user || user.userType !== 'JOB_SEEKER') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Get media files from PayloadCMS
    // TODO: Filter by current user when authentication is implemented
    const response = await fetch(`${API_BASE_URL}/media`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch media from PayloadCMS');
    }

    const result = await response.json();
    
    // Transform PayloadCMS response to expected format
    const files = result.docs.map((doc: any) => ({
      id: doc.id,
      filename: doc.filename,
      originalName: doc.filename,
      url: doc.url,
      size: doc.filesize,
      type: doc.mimeType,
      uploadedAt: doc.createdAt,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}
