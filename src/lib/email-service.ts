/**
 * Email Service for Job Application Notifications
 * Handles various notification types for the job application system
 */

// Email configuration types
interface EmailConfig {
  provider: 'smtp' | 'sendgrid' | 'resend' | 'nodemailer';
  apiKey?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
}

interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

interface EmailRecipient {
  email: string;
  name?: string;
}

interface EmailData {
  to: EmailRecipient;
  from: EmailRecipient;
  template: EmailTemplate;
  variables?: Record<string, any>;
}

// Application notification types
export type NotificationType = 
  | 'APPLICATION_SUBMITTED'
  | 'APPLICATION_RECEIVED'
  | 'APPLICATION_STATUS_CHANGED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_REMINDER'
  | 'INTERVIEW_CANCELLED'
  | 'OFFER_EXTENDED'
  | 'APPLICATION_REJECTED'
  | 'APPLICATION_WITHDRAWN';

// Email service configuration
const EMAIL_CONFIG: EmailConfig = {
  provider: (process.env.EMAIL_PROVIDER as EmailConfig['provider']) || 'nodemailer',
  apiKey: process.env.EMAIL_API_KEY,
  smtpHost: process.env.SMTP_HOST || 'localhost',
  smtpPort: parseInt(process.env.SMTP_PORT || '587'),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
};

const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL || 'noreply@issi.com';
const DEFAULT_FROM_NAME = process.env.DEFAULT_FROM_NAME || 'ISSI Jobs Portal';

// Base email templates
const EMAIL_TEMPLATES: Record<NotificationType, Omit<EmailTemplate, 'htmlContent' | 'textContent'> & {
  getHtmlContent: (variables: any) => string;
  getTextContent: (variables: any) => string;
}> = {
  APPLICATION_SUBMITTED: {
    subject: 'Application Submitted Successfully - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Application Submitted Successfully</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>Thank you for applying to the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Application Details:</h3>
          <ul>
            <li><strong>Position:</strong> ${vars.jobTitle}</li>
            <li><strong>Company:</strong> ${vars.companyName}</li>
            <li><strong>Location:</strong> ${vars.location}</li>
            <li><strong>Application ID:</strong> ${vars.applicationId}</li>
            <li><strong>Submitted:</strong> ${vars.submittedDate}</li>
          </ul>
        </div>

        <p>We have received your application and our team will review it shortly. You will receive updates on your application status via this email address.</p>
        
        <p>You can track your application status at: <a href="${vars.applicationUrl}">View Application</a></p>

        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Application Submitted Successfully

Dear ${vars.candidateName},

Thank you for applying to the ${vars.jobTitle} position at ${vars.companyName}.

Application Details:
- Position: ${vars.jobTitle}
- Company: ${vars.companyName}
- Location: ${vars.location}
- Application ID: ${vars.applicationId}
- Submitted: ${vars.submittedDate}

We have received your application and our team will review it shortly. You will receive updates on your application status via this email address.

You can track your application status at: ${vars.applicationUrl}

If you have any questions, please don't hesitate to contact us.

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  APPLICATION_RECEIVED: {
    subject: 'New Application Received - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Application Received</h2>
        <p>Dear Hiring Manager,</p>
        <p>A new application has been received for the <strong>${vars.jobTitle}</strong> position.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Candidate Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${vars.candidateName}</li>
            <li><strong>Email:</strong> ${vars.candidateEmail}</li>
            <li><strong>Position:</strong> ${vars.jobTitle}</li>
            <li><strong>Application ID:</strong> ${vars.applicationId}</li>
            <li><strong>Submitted:</strong> ${vars.submittedDate}</li>
            ${vars.expectedSalary ? `<li><strong>Expected Salary:</strong> $${vars.expectedSalary.toLocaleString()}</li>` : ''}
          </ul>
        </div>

        <p><a href="${vars.applicationReviewUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Review Application</a></p>
        
        <p>Best regards,<br>
        ISSI Jobs Portal</p>
      </div>
    `,
    getTextContent: (vars) => `
New Application Received

Dear Hiring Manager,

A new application has been received for the ${vars.jobTitle} position.

Candidate Information:
- Name: ${vars.candidateName}
- Email: ${vars.candidateEmail}
- Position: ${vars.jobTitle}
- Application ID: ${vars.applicationId}
- Submitted: ${vars.submittedDate}
${vars.expectedSalary ? `- Expected Salary: $${vars.expectedSalary.toLocaleString()}` : ''}

Review Application: ${vars.applicationReviewUrl}

Best regards,
ISSI Jobs Portal
    `,
  },

  APPLICATION_STATUS_CHANGED: {
    subject: 'Application Status Update - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Application Status Update</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>We have an update regarding your application for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Status Update:</h3>
          <p><strong>New Status:</strong> <span style="color: #059669; font-weight: bold;">${vars.newStatus}</span></p>
          ${vars.statusMessage ? `<p><strong>Message:</strong> ${vars.statusMessage}</p>` : ''}
          <p><strong>Updated:</strong> ${vars.updatedDate}</p>
        </div>

        ${vars.nextSteps ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h4 style="margin-top: 0;">Next Steps:</h4>
            <p>${vars.nextSteps}</p>
          </div>
        ` : ''}
        
        <p>You can view your complete application status at: <a href="${vars.applicationUrl}">View Application</a></p>

        <p>Thank you for your interest in joining ${vars.companyName}.</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Application Status Update

Dear ${vars.candidateName},

We have an update regarding your application for the ${vars.jobTitle} position at ${vars.companyName}.

Status Update:
- New Status: ${vars.newStatus}
${vars.statusMessage ? `- Message: ${vars.statusMessage}` : ''}
- Updated: ${vars.updatedDate}

${vars.nextSteps ? `Next Steps: ${vars.nextSteps}` : ''}

You can view your complete application status at: ${vars.applicationUrl}

Thank you for your interest in joining ${vars.companyName}.

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  INTERVIEW_SCHEDULED: {
    subject: 'Interview Scheduled - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Interview Scheduled</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>Congratulations! We would like to invite you for an interview for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #3b82f6;">
          <h3 style="margin-top: 0; color: #1e40af;">Interview Details:</h3>
          <ul>
            <li><strong>Date & Time:</strong> ${vars.interviewDate}</li>
            <li><strong>Duration:</strong> ${vars.duration} minutes</li>
            <li><strong>Type:</strong> ${vars.interviewType}</li>
            ${vars.location ? `<li><strong>Location:</strong> ${vars.location}</li>` : ''}
            ${vars.meetingLink ? `<li><strong>Meeting Link:</strong> <a href="${vars.meetingLink}">${vars.meetingLink}</a></li>` : ''}
            ${vars.interviewer ? `<li><strong>Interviewer:</strong> ${vars.interviewer}</li>` : ''}
          </ul>
        </div>

        ${vars.preparation ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Interview Preparation:</h4>
            <p>${vars.preparation}</p>
          </div>
        ` : ''}

        <p>Please confirm your attendance by replying to this email or contacting us directly.</p>
        
        <p>We look forward to speaking with you!</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Interview Scheduled

Dear ${vars.candidateName},

Congratulations! We would like to invite you for an interview for the ${vars.jobTitle} position at ${vars.companyName}.

Interview Details:
- Date & Time: ${vars.interviewDate}
- Duration: ${vars.duration} minutes
- Type: ${vars.interviewType}
${vars.location ? `- Location: ${vars.location}` : ''}
${vars.meetingLink ? `- Meeting Link: ${vars.meetingLink}` : ''}
${vars.interviewer ? `- Interviewer: ${vars.interviewer}` : ''}

${vars.preparation ? `Interview Preparation: ${vars.preparation}` : ''}

Please confirm your attendance by replying to this email or contacting us directly.

We look forward to speaking with you!

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  INTERVIEW_REMINDER: {
    subject: 'Interview Reminder - Tomorrow at {{interviewTime}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Interview Reminder</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>This is a friendly reminder about your upcoming interview for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #f59e0b;">
          <h3 style="margin-top: 0; color: #d97706;">Interview Tomorrow:</h3>
          <ul>
            <li><strong>Time:</strong> ${vars.interviewTime}</li>
            <li><strong>Duration:</strong> ${vars.duration} minutes</li>
            <li><strong>Type:</strong> ${vars.interviewType}</li>
            ${vars.location ? `<li><strong>Location:</strong> ${vars.location}</li>` : ''}
            ${vars.meetingLink ? `<li><strong>Meeting Link:</strong> <a href="${vars.meetingLink}">${vars.meetingLink}</a></li>` : ''}
          </ul>
        </div>

        <p>Please ensure you're prepared and available at the scheduled time. If you need to reschedule, please contact us as soon as possible.</p>
        
        <p>Good luck with your interview!</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Interview Reminder

Dear ${vars.candidateName},

This is a friendly reminder about your upcoming interview for the ${vars.jobTitle} position at ${vars.companyName}.

Interview Tomorrow:
- Time: ${vars.interviewTime}
- Duration: ${vars.duration} minutes
- Type: ${vars.interviewType}
${vars.location ? `- Location: ${vars.location}` : ''}
${vars.meetingLink ? `- Meeting Link: ${vars.meetingLink}` : ''}

Please ensure you're prepared and available at the scheduled time. If you need to reschedule, please contact us as soon as possible.

Good luck with your interview!

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  INTERVIEW_CANCELLED: {
    subject: 'Interview Cancelled - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Interview Cancelled</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>We regret to inform you that we need to cancel your scheduled interview for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #ef4444;">
          <h3 style="margin-top: 0; color: #dc2626;">Cancelled Interview Details:</h3>
          <ul>
            <li><strong>Original Date & Time:</strong> ${vars.originalDateTime}</li>
            <li><strong>Reason:</strong> ${vars.cancellationReason}</li>
          </ul>
        </div>

        ${vars.willReschedule ? `
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>We will contact you shortly to reschedule the interview.</strong></p>
          </div>
        ` : ''}

        <p>We apologize for any inconvenience this may cause and appreciate your understanding.</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Interview Cancelled

Dear ${vars.candidateName},

We regret to inform you that we need to cancel your scheduled interview for the ${vars.jobTitle} position at ${vars.companyName}.

Cancelled Interview Details:
- Original Date & Time: ${vars.originalDateTime}
- Reason: ${vars.cancellationReason}

${vars.willReschedule ? 'We will contact you shortly to reschedule the interview.' : ''}

We apologize for any inconvenience this may cause and appreciate your understanding.

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  OFFER_EXTENDED: {
    subject: 'Job Offer - {{jobTitle}} Position',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Congratulations! Job Offer Extended</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>We are pleased to extend an offer for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
          <h3 style="margin-top: 0; color: #059669;">Offer Details:</h3>
          <ul>
            <li><strong>Position:</strong> ${vars.jobTitle}</li>
            ${vars.salary ? `<li><strong>Annual Salary:</strong> $${vars.salary.toLocaleString()}</li>` : ''}
            ${vars.startDate ? `<li><strong>Start Date:</strong> ${vars.startDate}</li>` : ''}
            <li><strong>Employment Type:</strong> ${vars.employmentType}</li>
            ${vars.benefits ? `<li><strong>Benefits:</strong> ${vars.benefits}</li>` : ''}
          </ul>
        </div>

        <p>Please review the attached offer letter for complete details and terms.</p>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Please respond by ${vars.responseDeadline} to accept or decline this offer.</strong></p>
        </div>

        <p>We're excited about the possibility of you joining our team!</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Congratulations! Job Offer Extended

Dear ${vars.candidateName},

We are pleased to extend an offer for the ${vars.jobTitle} position at ${vars.companyName}.

Offer Details:
- Position: ${vars.jobTitle}
${vars.salary ? `- Annual Salary: $${vars.salary.toLocaleString()}` : ''}
${vars.startDate ? `- Start Date: ${vars.startDate}` : ''}
- Employment Type: ${vars.employmentType}
${vars.benefits ? `- Benefits: ${vars.benefits}` : ''}

Please review the attached offer letter for complete details and terms.

Please respond by ${vars.responseDeadline} to accept or decline this offer.

We're excited about the possibility of you joining our team!

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  APPLICATION_REJECTED: {
    subject: 'Application Status Update - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Application Status Update</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>Thank you for your interest in the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong> and for taking the time to complete our application process.</p>
        
        <p>After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.</p>

        ${vars.feedback ? `
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Feedback:</h3>
            <p>${vars.feedback}</p>
          </div>
        ` : ''}

        <p>We encourage you to apply for future positions that match your skills and experience. We will keep your resume on file for upcoming opportunities.</p>

        <p>Thank you again for considering ${vars.companyName} as a potential employer.</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Application Status Update

Dear ${vars.candidateName},

Thank you for your interest in the ${vars.jobTitle} position at ${vars.companyName} and for taking the time to complete our application process.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

${vars.feedback ? `Feedback: ${vars.feedback}` : ''}

We encourage you to apply for future positions that match your skills and experience. We will keep your resume on file for upcoming opportunities.

Thank you again for considering ${vars.companyName} as a potential employer.

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },

  APPLICATION_WITHDRAWN: {
    subject: 'Application Withdrawal Confirmation - {{jobTitle}}',
    getHtmlContent: (vars) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Application Withdrawal Confirmation</h2>
        <p>Dear ${vars.candidateName},</p>
        <p>We have received and processed your request to withdraw your application for the <strong>${vars.jobTitle}</strong> position at <strong>${vars.companyName}</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Application Details:</h3>
          <ul>
            <li><strong>Position:</strong> ${vars.jobTitle}</li>
            <li><strong>Application ID:</strong> ${vars.applicationId}</li>
            <li><strong>Withdrawal Date:</strong> ${vars.withdrawalDate}</li>
          </ul>
        </div>

        <p>Your application has been removed from our active review process.</p>

        <p>We appreciate your interest in ${vars.companyName} and encourage you to apply for future positions that match your career goals.</p>
        
        <p>Best regards,<br>
        The ${vars.companyName} Hiring Team</p>
      </div>
    `,
    getTextContent: (vars) => `
Application Withdrawal Confirmation

Dear ${vars.candidateName},

We have received and processed your request to withdraw your application for the ${vars.jobTitle} position at ${vars.companyName}.

Application Details:
- Position: ${vars.jobTitle}
- Application ID: ${vars.applicationId}
- Withdrawal Date: ${vars.withdrawalDate}

Your application has been removed from our active review process.

We appreciate your interest in ${vars.companyName} and encourage you to apply for future positions that match your career goals.

Best regards,
The ${vars.companyName} Hiring Team
    `,
  },
};

// Template variable replacement function
function replaceTemplateVariables(template: string, variables: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}

// Email sending function (mock implementation)
async function sendEmail(emailData: EmailData): Promise<boolean> {
  // Mock email sending - replace with actual email service implementation
  console.log('📧 Email would be sent:', {
    to: emailData.to.email,
    subject: emailData.template.subject,
    provider: EMAIL_CONFIG.provider,
  });

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // TODO: Implement actual email sending based on configuration
  switch (EMAIL_CONFIG.provider) {
    case 'smtp':
    case 'nodemailer':
      // Use nodemailer with SMTP
      break;
    case 'sendgrid':
      // Use SendGrid API
      break;
    case 'resend':
      // Use Resend API
      break;
  }

  // For now, always return success
  return true;
}

// Main notification functions
export async function sendApplicationNotification(
  type: NotificationType,
  recipient: EmailRecipient,
  variables: Record<string, any>
): Promise<boolean> {
  try {
    const templateConfig = EMAIL_TEMPLATES[type];
    
    const template: EmailTemplate = {
      subject: replaceTemplateVariables(templateConfig.subject, variables),
      htmlContent: templateConfig.getHtmlContent(variables),
      textContent: templateConfig.getTextContent(variables),
    };

    const emailData: EmailData = {
      to: recipient,
      from: {
        email: DEFAULT_FROM_EMAIL,
        name: DEFAULT_FROM_NAME,
      },
      template,
      variables,
    };

    return await sendEmail(emailData);
  } catch (error) {
    console.error(`Failed to send ${type} notification:`, error);
    return false;
  }
}

// Convenience functions for specific notification types
export const emailNotifications = {
  // For job seekers
  applicationSubmitted: (candidateEmail: string, candidateName: string, jobDetails: any) =>
    sendApplicationNotification('APPLICATION_SUBMITTED', 
      { email: candidateEmail, name: candidateName },
      {
        candidateName,
        jobTitle: jobDetails.jobTitle,
        companyName: jobDetails.company?.name || 'Company',
        location: jobDetails.location,
        applicationId: jobDetails.applicationId,
        submittedDate: new Date().toLocaleDateString(),
        applicationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/applications`,
      }
    ),

  applicationStatusChanged: (candidateEmail: string, candidateName: string, statusDetails: any) =>
    sendApplicationNotification('APPLICATION_STATUS_CHANGED',
      { email: candidateEmail, name: candidateName },
      statusDetails
    ),

  interviewScheduled: (candidateEmail: string, candidateName: string, interviewDetails: any) =>
    sendApplicationNotification('INTERVIEW_SCHEDULED',
      { email: candidateEmail, name: candidateName },
      interviewDetails
    ),

  // For employers/HR
  applicationReceived: (hrEmail: string, applicationDetails: any) =>
    sendApplicationNotification('APPLICATION_RECEIVED',
      { email: hrEmail },
      {
        candidateName: applicationDetails.candidateName,
        candidateEmail: applicationDetails.candidateEmail,
        jobTitle: applicationDetails.jobTitle,
        applicationId: applicationDetails.applicationId,
        submittedDate: new Date().toLocaleDateString(),
        applicationReviewUrl: `${process.env.NEXT_PUBLIC_APP_URL}/jobs/manage/applications`,
        expectedSalary: applicationDetails.expectedSalary,
      }
    ),

  // Utility functions
  offerExtended: (candidateEmail: string, candidateName: string, offerDetails: any) =>
    sendApplicationNotification('OFFER_EXTENDED',
      { email: candidateEmail, name: candidateName },
      offerDetails
    ),

  applicationRejected: (candidateEmail: string, candidateName: string, rejectionDetails: any) =>
    sendApplicationNotification('APPLICATION_REJECTED',
      { email: candidateEmail, name: candidateName },
      rejectionDetails
    ),
};

// Email service health check
export async function checkEmailService(): Promise<boolean> {
  try {
    // TODO: Implement actual health check for configured email service
    return true;
  } catch (error) {
    console.error('Email service health check failed:', error);
    return false;
  }
}

export default {
  sendApplicationNotification,
  emailNotifications,
  checkEmailService,
};
