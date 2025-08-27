# Sharded Story: Job Portal CMS Shard

## Story Overview
**As a content administrator,**  
**I want to manage job postings through a CMS**  
**So that I can create, update, and publish job opportunities**

---

## 📋 Story Details

### **Shard Information**
- **Shard ID:** JOB-CMS-001
- **Shard Name:** Job Portal CMS
- **Epic:** Job Portal Implementation
- **Priority:** High
- **Estimated Effort:** 4-6 days

### **Business Context**
Content administrators need a powerful yet user-friendly CMS to manage job postings.
The system must support multiple languages, rich content for job descriptions,
application tracking, and seamless integration with the frontend job portal.
This shard focuses on the backend content management capabilities that power the job portal.

### **Stakeholders**
- **Primary:** Content Administrators, HR Team
- **Secondary:** Developers, SEO Specialist
- **Supporting:** Product Owner, IT Security

---

## 🎯 Acceptance Criteria

### **Functional Requirements**
- [ ] **Job Collection**: Complete CRUD operations for job postings
- [ ] **Rich Text Editor**: Slate.js integration for job descriptions
- [ ] **Multi-language Support**: Localized job content and metadata
- [ ] **Application Tracking**: Link to application submissions
- [ ] **SEO Optimization**: Meta fields for search engine optimization
- [ ] **Media Management**: Company logos, images, and documents
- [ ] **Publishing Workflow**: Draft, review, and publish states
- [ ] **Category Management**: Job categories and tags
- [ ] **Location Support**: Remote, on-site, hybrid options
- [ ] **Salary Information**: Structured salary data with privacy options

### **Non-Functional Requirements**
- [ ] **Performance**: CMS loads within 2 seconds
- [ ] **Scalability**: Support for 500+ active job postings
- [ ] **Security**: Role-based access control and data protection
- [ ] **Usability**: Intuitive admin interface
- [ ] **Data Integrity**: Validation and referential integrity

---

## 🏗️ Technical Implementation

### **PayloadCMS Collections**

#### **Jobs Collection**

```typescript
// src/collections/Jobs.ts
import { CollectionConfig } from 'payload/types';
import { slateEditor } from '@payloadcms/richtext-slate';

const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'location', 'status', 'publishedAt'],
    group: 'Job Portal',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Remote', value: 'remote' },
            { label: 'On-site', value: 'onsite' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          localized: true,
          admin: {
            condition: (data) => data.location?.type !== 'remote',
          },
        },
        {
          name: 'country',
          type: 'text',
          localized: true,
          admin: {
            condition: (data) => data.location?.type !== 'remote',
          },
        },
      ],
    },
    {
      name: 'employmentType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'fulltime' },
        { label: 'Part-time', value: 'parttime' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Internship', value: 'internship' },
      ],
      required: true,
    },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Entry Level', value: 'entry' },
        { label: 'Mid Level', value: 'mid' },
        { label: 'Senior Level', value: 'senior' },
        { label: 'Lead/Principal', value: 'lead' },
        { label: 'Executive', value: 'executive' },
      ],
      required: true,
    },
    {
      name: 'salary',
      type: 'group',
      fields: [
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'min',
          type: 'number',
        },
        {
          name: 'max',
          type: 'number',
        },
        {
          name: 'period',
          type: 'select',
          options: [
            { label: 'Hourly', value: 'hourly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ],
        },
        {
          name: 'isPublic',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'blockquote',
            'strong',
            'em',
            'underline',
            'strikethrough',
            'code',
            'link',
            'ol',
            'ul',
            'indent',
            'upload',
          ],
          leaves: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
          ],
        },
      }),
      required: true,
      localized: true,
    },
    {
      name: 'requirements',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [
            'h1',
            'h2',
            'h3',
            'blockquote',
            'strong',
            'em',
            'underline',
            'code',
            'link',
            'ol',
            'ul',
            'upload',
          ],
        },
      }),
      localized: true,
    },
    {
      name: 'benefits',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [
            'h1',
            'h2',
            'h3',
            'blockquote',
            'strong',
            'em',
            'underline',
            'code',
            'link',
            'ol',
            'ul',
            'upload',
          ],
        },
      }),
      localized: true,
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'job-tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Generate slug if not provided
          if (!data.slug && data.title) {
            const slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            data.slug = slug;
          }

          // Set published date for published jobs
          if (data._status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date();
          }
        }
        return data;
      },
    ],
  },
};

export default Jobs;
```

#### **Companies Collection**

```typescript
// src/collections/Companies.ts
import { CollectionConfig } from 'payload/types';

const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'website', 'industry', 'size'],
    group: 'Job Portal',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['h1', 'h2', 'h3', 'blockquote', 'strong', 'em', 'link', 'ol', 'ul'],
        },
      }),
      localized: true,
    },
    {
      name: 'website',
      type: 'text',
      validate: (value: string) => {
        if (!value) return true;
        const urlRegex = /^https?:\/\/.+/;
        return urlRegex.test(value) || 'Please enter a valid URL';
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industries',
    },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: '1-10 employees', value: '1-10' },
        { label: '11-50 employees', value: '11-50' },
        { label: '51-200 employees', value: '51-200' },
        { label: '201-500 employees', value: '201-500' },
        { label: '501-1000 employees', value: '501-1000' },
        { label: '1000+ employees', value: '1000+' },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
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
          name: 'facebook',
          type: 'text',
        },
      ],
    },
  ],
};

export default Companies;
```

#### **Job Tags Collection**

```typescript
// src/collections/JobTags.ts
import { CollectionConfig } from 'payload/types';

const JobTags: CollectionConfig = {
  slug: 'job-tags',
  admin: {
    useAsTitle: 'tag',
    defaultColumns: ['tag', 'category'],
    group: 'Job Portal',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Skill', value: 'skill' },
        { label: 'Industry', value: 'industry' },
        { label: 'Role Type', value: 'role' },
        { label: 'Location', value: 'location' },
        { label: 'Experience', value: 'experience' },
      ],
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      defaultValue: '#3B82F6',
      admin: {
        description: 'Hex color code for tag display',
      },
    },
  ],
};

export default JobTags;
```

#### **Industries Collection**

```typescript
// src/collections/Industries.ts
import { CollectionConfig } from 'payload/types';

const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    group: 'Job Portal',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Industries;
```

### **Access Control**

```typescript
// src/collections/Jobs/access.ts
import { Access } from 'payload/types';

export const canReadJobs: Access = ({ req: { user } }) => {
  // Public read access for published jobs
  return {
    _status: {
      equals: 'published',
    },
  };
};

export const canCreateJobs: Access = ({ req: { user } }) => {
  // Only authenticated users with proper roles
  return Boolean(user && (user.role === 'admin' || user.role === 'editor'));
};

export const canUpdateJobs: Access = ({ req: { user }, id }) => {
  // Users can update their own jobs or admins can update any
  if (!user) return false;
  if (user.role === 'admin') return true;

  return {
    createdBy: {
      equals: user.id,
    },
  };
};

export const canDeleteJobs: Access = ({ req: { user } }) => {
  // Only admins can delete jobs
  return Boolean(user && user.role === 'admin');
};
```

---

## 🔄 State Management

### **Server-Side State**

```typescript
// Server-side data fetching for CMS
interface JobFilters {
  status?: 'draft' | 'published';
  company?: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  tags?: string[];
  search?: string;
}

export async function getJobs(filters: JobFilters = {}) {
  const params = new URLSearchParams({
    'sort': '-publishedAt',
    'limit': '50',
  });

  if (filters.status) {
    params.append('where[_status][equals]', filters.status);
  }

  if (filters.company) {
    params.append('where[company][equals]', filters.company);
  }

  if (filters.search) {
    params.append('where[title][like]', filters.search);
  }

  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => {
      params.append('where[tags][in][]', tag);
    });
  }

  const response = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/jobs?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}
```

### **CMS State Management**

```typescript
// src/hooks/useJobManagement.ts
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useJobManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createJob = useCallback(async (jobData: Partial<Job>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      const job = await response.json();
      router.push(`/admin/jobs/${job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const updateJob = useCallback(async (id: string, jobData: Partial<Job>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      const job = await response.json();
      return job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const publishJob = useCallback(async (id: string) => {
    return updateJob(id, {
      _status: 'published',
      publishedAt: new Date(),
    });
  }, [updateJob]);

  const unpublishJob = useCallback(async (id: string) => {
    return updateJob(id, {
      _status: 'draft',
    });
  }, [updateJob]);

  return {
    createJob,
    updateJob,
    publishJob,
    unpublishJob,
    isLoading,
    error,
  };
}
```

---

## 🧪 Testing Scenarios

### **Unit Tests**

```typescript
// tests/collections/Jobs.test.ts
describe('Jobs Collection', () => {
  test('generates slug from title', async () => {
    // Test slug generation hook
  });

  test('sets published date on publish', async () => {
    // Test published date hook
  });

  test('validates required fields', async () => {
    // Test field validation
  });
});
```

### **Integration Tests**

```typescript
// tests/integration/job-cms.test.ts
describe('Job CMS Integration', () => {
  test('creates job with all required fields', async () => {
    // Test full job creation flow
  });

  test('publishes job successfully', async () => {
    // Test publishing workflow
  });

  test('filters jobs by criteria', async () => {
    // Test filtering functionality
  });
});
```

---

## 📋 Dependencies & Assumptions

### **Dependencies**
- [ ] Users collection with role-based access
- [ ] Media collection for file uploads
- [ ] Rich text editor (Slate.js)
- [ ] Authentication system
- [ ] Email service for notifications
- [ ] Search functionality

### **Assumptions**
- [ ] PayloadCMS is properly configured
- [ ] Database connections are established
- [ ] File storage is configured
- [ ] User roles are properly defined
- [ ] Rich text editor is installed and configured

---

## 🎯 Success Metrics

### **Functional Success**
- [ ] All CRUD operations work correctly
- [ ] Rich text editor functions properly
- [ ] Multi-language support is working
- [ ] Access control is properly enforced
- [ ] Publishing workflow is smooth

### **Performance Success**
- [ ] CMS loads within 2 seconds
- [ ] Job creation takes less than 5 seconds
- [ ] Search and filtering is fast
- [ ] File uploads complete quickly

### **Quality Success**
- [ ] Data validation prevents invalid entries
- [ ] Error handling is comprehensive
- [ ] User interface is intuitive
- [ ] All business rules are enforced

---

## 📝 Implementation Notes

### **Security Considerations**
1. Implement proper access controls
2. Validate all user inputs
3. Sanitize rich text content
4. Protect sensitive salary information
5. Audit all job modifications

### **Performance Optimization**
1. Implement database indexing
2. Use caching for frequently accessed data
3. Optimize image uploads
4. Implement pagination for large datasets

### **Data Integrity**
1. Enforce referential integrity
2. Validate data consistency
3. Implement proper error handling
4. Create data backup strategies

### **User Experience**
1. Intuitive admin interface
2. Clear workflow for job creation
3. Helpful validation messages
4. Efficient bulk operations

---

## 🔗 Related Stories

### **Depends On**
- [ ] Shared Infrastructure Shard
- [ ] Authentication System
- [ ] User Management

### **Enables**
- [ ] Job Portal Frontend Shard
- [ ] Job Application Management
- [ ] Company Profile Management

### **Related**
- [ ] Job Search and Filtering
- [ ] Application Tracking System
- [ ] Analytics and Reporting

---

**Story Created:** August 27, 2025
**Last Updated:** August 27, 2025
**Status:** Ready for Implementation
**Assigned To:** Backend Development Team