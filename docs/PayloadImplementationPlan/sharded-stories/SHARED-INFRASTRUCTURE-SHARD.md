# Sharded Story: Shared Infrastructure Shard

## Story Overview
**As a system administrator,**  
**I want to manage shared services and infrastructure**  
**So that both blog and job portal can operate efficiently**

---

## 📋 Story Details

### **Shard Information**
- **Shard ID:** SHARED-INFRA-001
- **Shard Name:** Shared Infrastructure
- **Epic:** Platform Infrastructure
- **Priority:** High
- **Estimated Effort:** 6-8 days

### **Business Context**
The shared infrastructure provides common services and components that both the blog and job portal
rely on. This includes user authentication, media management, email services, and common data
structures. This shard establishes the foundation that enables both content management and job
portal functionality to work seamlessly together.

### **Stakeholders**
- **Primary:** System Administrators, Developers
- **Secondary:** Content Managers, HR Team
- **Supporting:** DevOps Team, Security Team

---

## 🎯 Acceptance Criteria

### **Functional Requirements**
- [ ] **User Authentication**: Complete user management system
- [ ] **Media Management**: Centralized file storage and optimization
- [ ] **Email Services**: Notification and communication system
- [ ] **Role-Based Access**: Granular permissions system
- [ ] **Audit Logging**: Comprehensive activity tracking
- [ ] **API Gateway**: Unified API access layer
- [ ] **Caching Layer**: Performance optimization
- [ ] **Backup & Recovery**: Data protection and restoration

### **Non-Functional Requirements**
- [ ] **Security**: Enterprise-grade security measures
- [ ] **Scalability**: Support for growing user base
- [ ] **Reliability**: 99.9% uptime guarantee
- [ ] **Performance**: Sub-second response times
- [ ] **Compliance**: GDPR and accessibility compliance

---

## 🏗️ Technical Implementation

### **PayloadCMS Collections**

#### **Users Collection**

```typescript
// src/collections/Users.ts
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'createdAt'],
    group: 'User Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Job Seeker', value: 'job-seeker' },
        { label: 'Employer', value: 'employer' },
      ],
      defaultValue: 'job-seeker',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
        {
          name: 'website',
          type: 'text',
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        {
          name: 'language',
          type: 'text',
          defaultValue: 'en',
        },
        {
          name: 'theme',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ],
          defaultValue: 'system',
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'update' && req.user) {
          // Track last login
          if (data.lastLogin) {
            data.lastLogin = new Date();
          }
        }
        return data;
      },
    ],
  },
};

export default Users;
```

#### **Media Collection**

```typescript
// src/collections/Media.ts
import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: 800,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    defaultColumns: ['filename', 'filesize', 'mimeType', 'createdAt'],
    group: 'Media Management',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'media-tags',
      hasMany: true,
    },
    {
      name: 'folder',
      type: 'relationship',
      relationTo: 'media-folders',
    },
    {
      name: 'license',
      type: 'select',
      options: [
        { label: 'All Rights Reserved', value: 'all-rights-reserved' },
        { label: 'Creative Commons BY', value: 'cc-by' },
        { label: 'Creative Commons BY-SA', value: 'cc-by-sa' },
        { label: 'Public Domain', value: 'public-domain' },
      ],
    },
  },
};

export default Media;
```

#### **Applications Collection**

```typescript
// src/collections/Applications.ts
import { CollectionConfig } from 'payload/types';

const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['job', 'applicantName', 'applicantEmail', 'status', 'createdAt'],
    group: 'Job Applications',
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'applicant',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'applicantName',
      type: 'text',
      required: true,
    },
    {
      name: 'applicantEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'applicantPhone',
      type: 'text',
    },
    {
      name: 'coverLetter',
      type: 'textarea',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'portfolio',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Interview Scheduled', value: 'interview-scheduled' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the application',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Application rating (1-5 stars)',
      },
    },
    {
      name: 'interviewDate',
      type: 'date',
    },
    {
      name: 'feedback',
      type: 'textarea',
      admin: {
        description: 'Feedback provided to the applicant',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          // Send confirmation email to applicant
          await sendApplicationConfirmation(doc);

          // Notify relevant team members
          await notifyTeamOfNewApplication(doc);
        }
      },
    ],
  },
};

export default Applications;
```

#### **Email Templates Collection**

```typescript
// src/collections/EmailTemplates.ts
import { CollectionConfig } from 'payload/types';

const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'type'],
    group: 'Email Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Application Confirmation', value: 'application-confirmation' },
        { label: 'Application Status Update', value: 'application-status-update' },
        { label: 'Job Alert', value: 'job-alert' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Welcome', value: 'welcome' },
        { label: 'Password Reset', value: 'password-reset' },
      ],
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['h1', 'h2', 'h3', 'strong', 'em', 'link', 'ol', 'ul'],
        },
      }),
      required: true,
      localized: true,
    },
    {
      name: 'variables',
      type: 'textarea',
      admin: {
        description: 'Available template variables (one per line)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default EmailTemplates;
```

### **Authentication & Authorization**

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Payload } from 'payload';

export function getAuthConfig(payload: Payload): NextAuthOptions {
  return {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          try {
            const result = await payload.login({
              collection: 'users',
              data: {
                email: credentials.email,
                password: credentials.password,
              },
            });

            if (result.user) {
              return {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                role: result.user.role,
              };
            }

            return null;
          } catch (error) {
            console.error('Authentication error:', error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.sub!;
          session.user.role = token.role as string;
        }
        return session;
      },
    },
    pages: {
      signIn: '/auth/signin',
      signUp: '/auth/signup',
    },
  };
}
```

### **Email Service**

```typescript
// src/lib/email.ts
import { createTransport, Transporter } from 'nodemailer';
import { render } from '@react-email/render';
import { Payload } from 'payload';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, any>;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, template, variables }: EmailOptions) {
    try {
      // Get email template from PayloadCMS
      const templateDoc = await payload.find({
        collection: 'email-templates',
        where: {
          type: { equals: template },
          isActive: { equals: true },
        },
      });

      if (!templateDoc.docs.length) {
        throw new Error(`Email template '${template}' not found`);
      }

      const emailTemplate = templateDoc.docs[0];

      // Replace variables in subject and content
      const processedSubject = this.replaceVariables(emailTemplate.subject, variables);
      const processedContent = this.replaceVariables(emailTemplate.content, variables);

      // Render email content
      const htmlContent = render(processedContent);

      await this.transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject: processedSubject,
        html: htmlContent,
      });

      // Log email activity
      await this.logEmailActivity({
        to,
        subject: processedSubject,
        template,
        status: 'sent',
      });
    } catch (error) {
      console.error('Email sending error:', error);

      // Log failed email
      await this.logEmailActivity({
        to,
        subject,
        template,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  }

  private replaceVariables(content: string, variables: Record<string, any>): string {
    let processedContent = content;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      processedContent = processedContent.replace(regex, String(value));
    });

    return processedContent;
  }

  private async logEmailActivity(activity: {
    to: string;
    subject: string;
    template: string;
    status: 'sent' | 'failed';
    error?: string;
  }) {
    // Log to PayloadCMS activity collection
    await payload.create({
      collection: 'email-activities',
      data: {
        ...activity,
        sentAt: new Date(),
      },
    });
  }
}

export const emailService = new EmailService();

// Helper functions
export async function sendApplicationConfirmation(application: any) {
  const job = await payload.findByID({
    collection: 'jobs',
    id: application.job,
  });

  await emailService.sendEmail({
    to: application.applicantEmail,
    subject: 'Application Received',
    template: 'application-confirmation',
    variables: {
      applicantName: application.applicantName,
      jobTitle: job.title,
      companyName: job.company.name,
    },
  });
}

export async function notifyTeamOfNewApplication(application: any) {
  // Get team members who should be notified
  const teamMembers = await payload.find({
    collection: 'users',
    where: {
      role: { in: ['admin', 'editor'] },
      emailNotifications: { equals: true },
    },
  });

  for (const member of teamMembers.docs) {
    await emailService.sendEmail({
      to: member.email,
      subject: 'New Job Application Received',
      template: 'application-notification',
      variables: {
        applicantName: application.applicantName,
        jobTitle: application.job.title,
        companyName: application.job.company.name,
      },
    });
  }
}
```

### **Caching Layer**

```typescript
// src/lib/cache.ts
import { Redis } from 'redis';

class CacheService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    });
  }

  async get(key: string): Promise<any> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setex(key, ttl, serializedValue);
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Cache invalidate pattern error:', error);
    }
  }
}

export const cacheService = new CacheService();

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: (userId: string) => `user:${userId}:profile`,
  JOB_LISTING: (jobId: string, locale: string) => `job:${jobId}:${locale}`,
  BLOG_POST: (postId: string, locale: string) => `blog:${postId}:${locale}`,
  SEARCH_RESULTS: (query: string, filters: string) => `search:${query}:${filters}`,
  APPLICATION_COUNT: (jobId: string) => `applications:${jobId}:count`,
};
```

---

## 🔄 State Management

### **Server-Side State**

```typescript
// Server-side authentication and user management
interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export async function getCurrentUser(request: Request): Promise<AuthenticatedUser | null> {
  try {
    const session = await getServerSession(getAuthConfig(payload));

    if (!session?.user) {
      return null;
    }

    const user = await payload.findByID({
      collection: 'users',
      id: session.user.id,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar?.url,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAuth(request: Request, allowedRoles?: string[]): Promise<AuthenticatedUser> {
  const user = await getCurrentUser(request);

  if (!user) {
    throw new Error('Authentication required');
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }

  return user;
}
```

### **Global State (Context)**

```typescript
// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name!,
        role: session.user.role,
        avatar: session.user.avatar,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await fetch('/api/auth/signout', {
      method: 'POST',
    });
  };

  const hasRole = (roles: string[]) => {
    return user ? roles.includes(user.role) : false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading: status === 'loading',
      login,
      logout,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### **API State Management**

```typescript
// src/lib/api/auth.ts
export async function signIn(email: string, password: string) {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Sign in failed');
  }

  return response.json();
}

export async function signUp(userData: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Sign up failed');
  }

  return response.json();
}

export async function updateProfile(userId: string, profileData: Partial<User>) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Profile update failed');
  }

  return response.json();
}
```

---

## 🧪 Testing Scenarios

### **Unit Tests**

```typescript
// tests/lib/auth.test.ts
describe('Authentication Service', () => {
  test('validates user credentials', async () => {
    // Test credential validation
  });

  test('generates JWT tokens', async () => {
    // Test token generation
  });

  test('enforces role-based access', async () => {
    // Test role validation
  });
});
```

### **Integration Tests**

```typescript
// tests/integration/shared-infrastructure.test.ts
describe('Shared Infrastructure Integration', () => {
  test('user registration and login flow', async () => {
    // Test complete auth flow
  });

  test('media upload and optimization', async () => {
    // Test file upload pipeline
  });

  test('email sending and tracking', async () => {
    // Test email service
  });
});
```

---

## 📋 Dependencies & Assumptions

### **Dependencies**
- [ ] PayloadCMS installation and configuration
- [ ] Database setup (MongoDB/PostgreSQL)
- [ ] Redis for caching
- [ ] SMTP server for email
- [ ] File storage (AWS S3 or similar)
- [ ] SSL certificate for HTTPS

### **Assumptions**
- [ ] Infrastructure services are available
- [ ] Security requirements are met
- [ ] Performance requirements are achievable
- [ ] Scalability requirements are realistic

---

## 🎯 Success Metrics

### **Functional Success**
- [ ] User authentication works flawlessly
- [ ] Media management is efficient
- [ ] Email delivery is reliable
- [ ] Role-based access is enforced
- [ ] Audit logging captures all activities

### **Performance Success**
- [ ] Authentication response < 500ms
- [ ] Media upload completes within 10 seconds
- [ ] Email delivery within 5 seconds
- [ ] Cache hit rate > 90%

### **Quality Success**
- [ ] Security audit passes
- [ ] GDPR compliance verified
- [ ] Accessibility compliance met
- [ ] Error handling comprehensive

---

## 📝 Implementation Notes

### **Security Considerations**
1. Implement rate limiting for authentication
2. Encrypt sensitive data at rest
3. Use secure session management
4. Implement CSRF protection
5. Regular security audits

### **Performance Optimization**
1. Implement database indexing
2. Use connection pooling
3. Implement caching strategies
4. Optimize media processing
5. Monitor performance metrics

### **Scalability Planning**
1. Design for horizontal scaling
2. Implement proper caching layers
3. Use CDN for media assets
4. Plan for database sharding
5. Implement monitoring and alerting

### **Compliance Requirements**
1. GDPR data protection
2. Accessibility compliance
3. Security standards
4. Data retention policies
5. Audit trail requirements

---

## 🔗 Related Stories

### **Enables**
- [ ] Blog CMS Shard
- [ ] Blog Frontend Shard
- [ ] Job Portal CMS Shard
- [ ] Job Portal Frontend Shard

### **Related**
- [ ] Security Hardening
- [ ] Performance Monitoring
- [ ] Backup and Recovery
- [ ] Disaster Recovery

---

**Story Created:** August 27, 2025
**Last Updated:** August 27, 2025
**Status:** Ready for Implementation
**Assigned To:** Backend Development Team
 
 
