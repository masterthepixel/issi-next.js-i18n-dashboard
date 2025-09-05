import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Request validation schemas
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

// Mock database functions
async function getInterviewById(id: string) {
  return {
    id,
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
  };
}

async function updateInterview(id: string, data: any) {
  return {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

async function deleteInterview(id: string) {
  return { success: true };
}

// GET /api/interviews/[id] - Get specific interview
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

    const interview = await getInterviewById(id);

    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }

    // TODO: Check if user is authorized to view this interview
    // if (user.userType === 'JOB_SEEKER' && interview.application.userId !== user.id) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    // if (user.userType === 'COMPANY' && 
    //     interview.application.job.companyId !== user.companyId &&
    //     !interview.interviewerIds.includes(user.id)) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    return NextResponse.json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
}

// PUT /api/interviews/[id] - Update interview
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validation = UpdateInterviewSchema.safeParse(body);
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

    // TODO: Get existing interview to check permissions
    // const existingInterview = await getInterviewById(id);
    // if (!existingInterview) {
    //   return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    // }

    // TODO: Check if user is authorized to update this interview
    // if (user.userType === 'COMPANY' && 
    //     existingInterview.application.job.companyId !== user.companyId &&
    //     !existingInterview.interviewerIds.includes(user.id)) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const updatedInterview = await updateInterview(id, validation.data);

    // TODO: Send notifications if interview details changed
    // if (validation.data.scheduledFor || validation.data.meetingLink || validation.data.location) {
    //   await sendInterviewUpdatedNotification(updatedInterview);
    // }

    return NextResponse.json(updatedInterview);
  } catch (error) {
    console.error('Error updating interview:', error);
    return NextResponse.json(
      { error: 'Failed to update interview' },
      { status: 500 }
    );
  }
}

// DELETE /api/interviews/[id] - Cancel interview
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Add authentication check here
    // const user = await getCurrentUser(request);
    // if (!user || user.userType !== 'COMPANY') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Get existing interview to check permissions
    // const existingInterview = await getInterviewById(id);
    // if (!existingInterview) {
    //   return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    // }

    // TODO: Check if user is authorized to cancel this interview
    // if (existingInterview.application.job.companyId !== user.companyId) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    // Instead of deleting, mark as cancelled
    const cancelledInterview = await updateInterview(id, {
      status: 'CANCELLED',
      notes: 'Interview cancelled by company',
    });

    // TODO: Send cancellation notifications
    // await sendInterviewCancelledNotification(cancelledInterview);

    return NextResponse.json(cancelledInterview);
  } catch (error) {
    console.error('Error cancelling interview:', error);
    return NextResponse.json(
      { error: 'Failed to cancel interview' },
      { status: 500 }
    );
  }
}