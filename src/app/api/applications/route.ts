import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailNotifications } from '@/lib/email-service';

// Request validation schemas
const CreateApplicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().min(1),
  resumeUrl: z.string().url(),
  portfolioLinks: z.array(z.string().url()).optional(),
  expectedSalary: z.number().positive().optional(),
  availableStartDate: z.string().optional(),
  notes: z.string().optional(),
});

const UpdateApplicationSchema = z.object({
  status: z.enum(['APPLIED', 'UNDER_REVIEW', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN']).optional(),
  hrNotes: z.string().optional(),
  notes: z.string().optional(),
});

// Mock database functions - replace with actual database calls
async function createApplication(data: any) {
  // This would integrate with your actual database
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'APPLIED',
    appliedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function getApplications(userId?: string, jobId?: string, status?: string) {
  // Mock data - replace with actual database query
  const mockApplications = [
    {
      id: '1',
      jobId: 'job-1',
      userId: 'user-1',
      status: 'APPLIED',
      coverLetter: 'I am very interested in this position...',
      resumeUrl: 'https://example.com/resume.pdf',
      portfolioLinks: ['https://portfolio.example.com'],
      expectedSalary: 75000,
      availableStartDate: '2024-02-01',
      appliedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      job: {
        id: 'job-1',
        jobTitle: 'Senior Software Engineer',
        company: { name: 'ISSI Software Solutions' },
        location: 'Remote',
        salaryFrom: 70000,
        salaryTo: 90000,
      },
    },
  ];

  return {
    docs: mockApplications.filter(app => {
      if (userId && app.userId !== userId) return false;
      if (jobId && app.jobId !== jobId) return false;
      if (status && app.status !== status) return false;
      return true;
    }),
    totalDocs: mockApplications.length,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

async function updateApplication(id: string, data: any) {
  // Mock update - replace with actual database update
  return {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

async function deleteApplication(id: string) {
  // Mock delete - replace with actual database delete
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