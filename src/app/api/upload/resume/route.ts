import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// File upload configuration
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'resumes');

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Generate unique filename
function generateFilename(originalName: string, userId: string): string {
  const ext = path.extname(originalName);
  const timestamp = Date.now();
  const sanitized = originalName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_');
  return `${userId}_${timestamp}_${sanitized}`;
}

// Validate file
function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`,
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
    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user || user.userType !== 'JOB_SEEKER') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

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

    // Ensure upload directory exists
    await ensureUploadDir();

    // Generate unique filename
    const userId = 'current-user-id'; // Replace with actual user ID from auth
    const filename = generateFilename(file.name, userId);
    const filepath = path.join(UPLOAD_DIR, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Generate public URL
    const publicUrl = `/uploads/resumes/${filename}`;

    // TODO: Save file reference to database
    // await saveFileReference({
    //   userId,
    //   filename,
    //   originalName: file.name,
    //   filePath: filepath,
    //   publicUrl,
    //   fileSize: file.size,
    //   mimeType: file.type,
    //   uploadedAt: new Date(),
    // });

    return NextResponse.json(
      {
        success: true,
        filename,
        originalName: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
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

    // TODO: Get user's uploaded files from database
    // const files = await getUserFiles(user.id);

    // Mock response
    const files = [
      {
        id: '1',
        filename: 'user1_1642781234567_john_doe_resume.pdf',
        originalName: 'john_doe_resume.pdf',
        url: '/uploads/resumes/user1_1642781234567_john_doe_resume.pdf',
        size: 245760,
        type: 'application/pdf',
        uploadedAt: '2024-01-15T10:30:00Z',
      },
    ];

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}