import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailNotifications } from '@/lib/email-service';

// Request validation schemas
const UpdateApplicationSchema = z.object({
  status: z.enum(['APPLIED', 'UNDER_REVIEW', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN']).optional(),
  hrNotes: z.string().optional(),
  notes: z.string().optional(),
  coverLetter: z.string().optional(),
  expectedSalary: z.number().positive().optional(),
  availableStartDate: z.string().optional(),
  portfolioLinks: z.array(z.string().url()).optional(),
});

// Helper function for status-based next steps
function getNextStepsForStatus(status: string): string | undefined {
  const nextSteps: Record<string, string> = {
    'UNDER_REVIEW': 'Our team is currently reviewing your application. We will contact you within 3-5 business days with next steps.',
    'INTERVIEW': 'Congratulations! We will be scheduling an interview with you soon. Please watch for an email with interview details.',
    'OFFER': 'An offer will be extended to you soon. Please watch for detailed offer information via email.',
    'HIRED': 'Congratulations! Welcome to the team. HR will contact you with onboarding details.',
    'REJECTED': 'Thank you for your interest. We encourage you to apply for future positions that match your skills.',
  };
  return nextSteps[status];
}

// Mock database functions - replace with actual database calls
async function getApplicationById(id: string) {
  // Mock data - replace with actual database query
  const mockApplication = {
    id,
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
  };

  return mockApplication;
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

// GET /api/applications/[id] - Get specific application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const application = await getApplicationById(id);

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // TODO: Check if user is authorized to view this application
    // if (user.userType === 'JOB_SEEKER' && application.userId !== user.id) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    // if (user.userType === 'COMPANY' && application.job.companyId !== user.companyId) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

// PUT /api/applications/[id] - Update application
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validation = UpdateApplicationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.errors },
        { status: 400 }
      );
    }

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Get existing application to check permissions
    // const existingApplication = await getApplicationById(id);
    // if (!existingApplication) {
    //   return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    // }

    // TODO: Check if user is authorized to update this application
    // if (user.userType === 'JOB_SEEKER' && existingApplication.userId !== user.id) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    // if (user.userType === 'COMPANY' && existingApplication.job.companyId !== user.companyId) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    // Job seekers can only update certain fields
    // if (user.userType === 'JOB_SEEKER') {
    //   const allowedFields = ['notes', 'coverLetter', 'expectedSalary', 'availableStartDate', 'portfolioLinks'];
    //   const restrictedFields = Object.keys(validation.data).filter(key => !allowedFields.includes(key));
    //   if (restrictedFields.length > 0) {
    //     return NextResponse.json(
    //       { error: `Job seekers cannot update these fields: ${restrictedFields.join(', ')}` },
    //       { status: 403 }
    //     );
    //   }
    // }

    const updatedApplication = await updateApplication(id, validation.data);

    // Send status change notification if status was updated
    if (validation.data.status) {
      try {
        await emailNotifications.applicationStatusChanged(
          'candidate@example.com', // Replace with actual candidate email
          'John Doe', // Replace with actual candidate name
          {
            candidateName: 'John Doe',
            jobTitle: 'Software Engineer', // Get from job data
            companyName: 'ISSI Software Solutions', // Get from company data
            newStatus: validation.data.status,
            statusMessage: validation.data.hrNotes,
            updatedDate: new Date().toLocaleDateString(),
            applicationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/applications`,
            nextSteps: getNextStepsForStatus(validation.data.status),
          }
        );
      } catch (emailError) {
        console.error('Failed to send status change email:', emailError);
        // Continue with successful response even if email fails
      }
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications/[id] - Withdraw/delete application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Get existing application to check permissions
    // const existingApplication = await getApplicationById(id);
    // if (!existingApplication) {
    //   return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    // }

    // TODO: Check if user is authorized to delete this application
    // if (user.userType === 'JOB_SEEKER' && existingApplication.userId !== user.id) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    // TODO: Check if application can be withdrawn (only APPLIED status typically)
    // if (existingApplication.status !== 'APPLIED') {
    //   return NextResponse.json(
    //     { error: 'Cannot withdraw application in current status' },
    //     { status: 400 }
    //   );
    // }

    const result = await deleteApplication(id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}