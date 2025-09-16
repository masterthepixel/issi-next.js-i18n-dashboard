import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailNotifications } from '@/lib/email-service';

// Request validation schemas
const CreateApplicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().min(1),
  resumeUrl: z.string().optional().default(''), // Allow empty string
  portfolioLinks: z.array(z.string()).optional().default([]).transform(links => 
    // Filter out empty strings and validate URLs
    links?.filter(link => link.trim() !== '').filter(link => {
      try {
        new URL(link);
        return true;
      } catch {
        return false;
      }
    }) || []
  ),
  expectedSalary: z.union([z.number().positive(), z.string().transform(val => val === '' ? undefined : Number(val))]).optional(),
  availableStartDate: z.string().optional().default(''),
  notes: z.string().optional(),
});

const UpdateApplicationSchema = z.object({
  status: z.enum(['APPLIED', 'UNDER_REVIEW', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN']).optional(),
  hrNotes: z.string().optional(),
  notes: z.string().optional(),
});

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

// PayloadCMS integration functions
async function createApplication(data: any) {
  // Create application via PayloadCMS API
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      status: 'APPLIED',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create application in PayloadCMS');
  }

  const result = await response.json();
  return result.doc;
}

async function getApplications(userId?: string, jobId?: string, status?: string) {
  // Build query parameters for PayloadCMS
  const searchParams = new URLSearchParams();
  
  if (userId) {
    searchParams.append('where[userId][equals]', userId);
  }
  if (jobId) {
    searchParams.append('where[jobId][equals]', jobId);
  }
  if (status) {
    searchParams.append('where[status][equals]', status);
  }
  
  // Include related job data
  searchParams.append('depth', '2');
  
  const response = await fetch(`${API_BASE_URL}/applications?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch applications from PayloadCMS');
  }

  return await response.json();
}

async function updateApplication(id: string, data: any) {
  // Update application via PayloadCMS API
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update application in PayloadCMS');
  }

  const result = await response.json();
  return result.doc;
}

async function deleteApplication(id: string) {
  // Delete application via PayloadCMS API
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete application in PayloadCMS');
  }

  return { success: true };
}

// GET /api/applications - Get applications with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const jobId = searchParams.get('jobId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const applications = await getApplications(userId || undefined, jobId || undefined, status || undefined);

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications - Create new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = CreateApplicationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.errors },
        { status: 400 }
      );
    }

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user || user.userType !== 'JOB_SEEKER') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Check if user has already applied for this job
    // const existingApplication = await getApplicationByJobAndUser(body.jobId, user.id);
    // if (existingApplication) {
    //   return NextResponse.json(
    //     { error: 'You have already applied for this job' },
    //     { status: 409 }
    //   );
    // }

    const application = await createApplication({
      ...validation.data,
      userId: 'current-user-id', // Replace with actual user ID from auth
    });

    // Send confirmation email to candidate
    try {
      await emailNotifications.applicationSubmitted(
        'candidate@example.com', // Replace with actual candidate email from auth
        'John Doe', // Replace with actual candidate name from auth
        {
          jobTitle: 'Software Engineer', // Get from job data
          company: { name: 'ISSI Software Solutions' },
          location: 'Remote',
          applicationId: application.id,
        }
      );

      // Send notification email to HR/Company
      await emailNotifications.applicationReceived(
        'hr@issi.com', // Replace with actual HR email from job/company data
        {
          candidateName: 'John Doe', // Replace with actual candidate name
          candidateEmail: 'candidate@example.com', // Replace with actual candidate email
          jobTitle: 'Software Engineer', // Get from job data
          applicationId: application.id,
          expectedSalary: validation.data.expectedSalary,
        }
      );
    } catch (emailError) {
      console.error('Failed to send application emails:', emailError);
      // Continue with successful response even if email fails
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
