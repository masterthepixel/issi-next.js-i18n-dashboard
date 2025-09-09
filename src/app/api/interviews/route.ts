import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailNotifications } from '@/lib/email-service';

// Request validation schemas
const CreateInterviewSchema = z.object({
  applicationId: z.string(),
  scheduledFor: z.string().datetime(),
  type: z.enum(['PHONE', 'VIDEO', 'IN_PERSON', 'TECHNICAL']),
  duration: z.number().min(15).max(480), // 15 minutes to 8 hours
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  interviewerIds: z.array(z.string()),
  notes: z.string().optional(),
});

const UpdateInterviewSchema = z.object({
  scheduledFor: z.string().datetime().optional(),
  type: z.enum(['PHONE', 'VIDEO', 'IN_PERSON', 'TECHNICAL']).optional(),
  duration: z.number().min(15).max(480).optional(),
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  interviewerIds: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  feedback: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
});

// Mock database functions - replace with actual database calls
async function createInterview(data: any) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'SCHEDULED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function getInterviews(applicationId?: string, interviewerId?: string) {
  // Mock data - replace with actual database query
  const mockInterviews = [
    {
      id: '1',
      applicationId: 'app-1',
      scheduledFor: '2024-02-01T10:00:00Z',
      type: 'VIDEO',
      duration: 60,
      location: null,
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      interviewerIds: ['interviewer-1'],
      notes: 'Initial technical screening',
      status: 'SCHEDULED',
      feedback: null,
      rating: null,
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-01-20T09:00:00Z',
      application: {
        id: 'app-1',
        job: {
          jobTitle: 'Senior Software Engineer',
          company: { name: 'ISSI Software Solutions' },
        },
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      },
      interviewers: [
        {
          id: 'interviewer-1',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@issi.com',
          title: 'Senior Software Engineer',
        },
      ],
    },
  ];

  return {
    docs: mockInterviews.filter(interview => {
      if (applicationId && interview.applicationId !== applicationId) return false;
      if (interviewerId && !interview.interviewerIds.includes(interviewerId)) return false;
      return true;
    }),
    totalDocs: mockInterviews.length,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

async function updateInterview(id: string, data: any) {
  return {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

// GET /api/interviews - Get interviews with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const interviewerId = searchParams.get('interviewerId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const interviews = await getInterviews(
      applicationId || undefined,
      interviewerId || undefined
    );

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}

// POST /api/interviews - Schedule new interview
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = CreateInterviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.errors },
        { status: 400 }
      );
    }

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user || user.userType !== 'COMPANY') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Verify application exists and belongs to user's company
    // const application = await getApplicationById(validation.data.applicationId);
    // if (!application || application.job.companyId !== user.companyId) {
    //   return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    // }

    // TODO: Verify interviewers exist and belong to user's company
    // const interviewers = await getUsersByIds(validation.data.interviewerIds);
    // if (interviewers.some(interviewer => interviewer.companyId !== user.companyId)) {
    //   return NextResponse.json({ error: 'Invalid interviewer(s)' }, { status: 400 });
    // }

    const interview = await createInterview(validation.data);

    // Send interview scheduled notification
    try {
      await emailNotifications.interviewScheduled(
        'candidate@example.com', // Replace with actual candidate email
        'John Doe', // Replace with actual candidate name
        {
          candidateName: 'John Doe',
          jobTitle: 'Software Engineer', // Get from application/job data
          companyName: 'ISSI Software Solutions', // Get from company data
          interviewDate: new Date(validation.data.scheduledFor).toLocaleDateString(),
          duration: validation.data.duration,
          interviewType: validation.data.type,
          location: validation.data.location,
          meetingLink: validation.data.meetingLink,
          interviewer: 'Jane Smith', // Get from interviewer data
          preparation: 'Please review the job description and prepare to discuss your experience with React and Node.js.',
        }
      );
    } catch (emailError) {
      console.error('Failed to send interview notification:', emailError);
      // Continue with successful response even if email fails
    }

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error('Error creating interview:', error);
    return NextResponse.json(
      { error: 'Failed to schedule interview' },
      { status: 500 }
    );
  }
}
