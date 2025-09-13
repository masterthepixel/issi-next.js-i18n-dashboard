/**
 * Tests for data transformation utilities
 */

import {
    extractTextFromLexical,
    transformBenefitsToPayload,
    transformEmploymentTypeToPayload,
    transformJobFromPayload,
    validateJobData
} from '@/lib/utils/data-transforms';

describe('Data Transformation Utilities', () => {
    describe('transformJobFromPayload', () => {
        it('should transform PayloadCMS job format to frontend format', () => {
            const payloadJob = {
                id: '1',
                jobTitle: 'Software Engineer',
                employmentType: 'FULL_TIME',
                location: 'Remote',
                salaryFrom: 50000,
                salaryTo: 70000,
                jobDescription: {
                    root: {
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: 'Test description' }]
                            }
                        ]
                    }
                },
                listingDuration: 30,
                benefits: ['HEALTH_INSURANCE', 'REMOTE_WORK'],
                status: 'ACTIVE',
                applications: 5,
                company: {
                    id: '1',
                    name: 'Test Company',
                    location: 'Remote',
                    logo: { url: '/logo.png' },
                    website: 'https://test.com',
                    xAccount: '@test',
                    about: 'About test company',
                    user: 'user1',
                    createdAt: '2024-01-01T00:00:00Z',
                    updatedAt: '2024-01-01T00:00:00Z'
                },
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z'
            };

            const transformed = transformJobFromPayload(payloadJob);

            expect(transformed.id).toBe('1');
            expect(transformed.jobTitle).toBe('Software Engineer');
            expect(transformed.employmentType).toBe('full-time');
            expect(transformed.benefits).toEqual(['Health Insurance', 'Remote Work']);
            expect(transformed.company.name).toBe('Test Company');
        });
    });

    describe('transformEmploymentTypeToPayload', () => {
        it('should transform frontend employment type to PayloadCMS format', () => {
            expect(transformEmploymentTypeToPayload('full-time')).toBe('FULL_TIME');
            expect(transformEmploymentTypeToPayload('part-time')).toBe('PART_TIME');
            expect(transformEmploymentTypeToPayload('contract')).toBe('CONTRACT');
            expect(transformEmploymentTypeToPayload('internship')).toBe('INTERNSHIP');
        });
    });

    describe('transformBenefitsToPayload', () => {
        it('should transform frontend benefits to PayloadCMS format', () => {
            const benefits = ['Health Insurance', 'Remote Work', '401k'];
            const transformed = transformBenefitsToPayload(benefits);

            expect(transformed).toEqual(['HEALTH_INSURANCE', 'REMOTE_WORK', 'RETIREMENT_401K']);
        });
    });

    describe('extractTextFromLexical', () => {
        it('should extract plain text from Lexical format', () => {
            const lexicalData = {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                { text: 'Hello ' },
                                { text: 'world', format: 1 }
                            ]
                        },
                        {
                            type: 'paragraph',
                            children: [
                                { text: 'Second paragraph' }
                            ]
                        }
                    ]
                }
            };

            const text = extractTextFromLexical(lexicalData);
            expect(text).toBe('Hello world Second paragraph');
        });
    });

    describe('validateJobData', () => {
        it('should validate correct job data', () => {
            const job = {
                id: '1',
                jobTitle: 'Test Job',
                employmentType: 'FULL_TIME',
                location: 'Remote',
                jobDescription: { root: { children: [] } },
                company: { name: 'Test Company' }
            };

            const result = validateJobData(job);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect invalid job data', () => {
            const job = {
                id: '',
                jobTitle: '',
                employmentType: 'INVALID',
                location: '',
                company: { name: '' }
            };

            const result = validateJobData(job);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
        });
    });
});
