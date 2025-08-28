# PayloadCMS Blog Backend Setup

This directory contains the PayloadCMS backend configuration for the ISSI blog functionality.

## 📁 Directory Structure

```
cms/
├── access/           # Access control functions
│   └── index.ts     # User permissions and roles
├── collections/     # Data collections
│   ├── Categories.ts # Blog categories
│   ├── Media.ts     # Image/file uploads  
│   ├── Posts.ts     # Blog posts
│   └── Users.ts     # CMS users
├── seed/           # Sample data
│   └── index.ts    # Seed script for initial content
└── styles/         # Admin panel styling
    └── admin.css   # Custom CMS admin styles
```

## 🚀 Getting Started

### 1. Environment Setup

Create a `.env.local` file in the project root with the following variables:

```bash
# Required - Database connection
DATABASE_URI=mongodb://localhost:27017/issi-cms

# Required - PayloadCMS secret key
PAYLOAD_SECRET=your-secret-key-here

# Required - Server URL
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional - AWS S3 for production file uploads
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=us-east-1
S3_BUCKET=
```

### 2. Install Dependencies

PayloadCMS dependencies are already included in package.json:

```bash
pnpm install
```

### 3. Start MongoDB

Ensure MongoDB is running locally:

```bash
# macOS with Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use MongoDB Atlas cloud service
```

### 4. Test Connection

Test the PayloadCMS setup:

```bash
npm run test:payload
```

### 5. Start Development

```bash
npm run dev
```

Access the CMS admin at: `http://localhost:3000/admin`

## 📊 Collections Overview

### Posts Collection

The main blog posts collection with the following fields:

- **title** (localized text) - Blog post title
- **slug** (localized text) - URL-friendly slug (auto-generated)  
- **content** (localized rich text) - Main post content
- **excerpt** (localized textarea) - Post summary
- **author** (relationship to users) - Post author
- **featuredImage** (relationship to media) - Featured image
- **publishedAt** (date) - Publication date
- **status** (select: draft/published) - Publication status
- **categories** (relationship to categories) - Post categories

### Categories Collection

Simple category taxonomy:

- **title** (localized text) - Category name

### Media Collection  

File upload collection for images:

- **alt** (localized text) - Alt text for accessibility
- **caption** (localized rich text) - Image caption
- **focalPoint** (point) - Focal point for cropping

Automatic image sizes generated:
- **thumbnail**: 400x300px
- **card**: 768x432px  
- **hero**: 1200x600px

### Users Collection

CMS user management:

- **firstName/lastName** - User names
- **email** - Login email
- **role** (admin/editor/translator/viewer) - User permissions
- **preferences** - Language and theme settings

## 🔐 Access Control

The system implements role-based access control:

### User Roles

1. **Admin** - Full access to all collections and settings
2. **Editor** - Can create, edit, and publish blog posts
3. **Translator** - Can edit localized content
4. **Viewer** - Read-only access

### Collection Permissions

- **Posts**: Editors can create/edit, public can read published posts
- **Categories**: Logged-in users can manage, public can read
- **Media**: Logged-in users can upload, public can read
- **Users**: Only admins can manage

## 🌐 Internationalization

All content is localized for English, French, and Spanish:

```javascript
// Supported locales
locales: ['en', 'fr', 'es']
defaultLocale: 'en'
fallback: true
```

Localized fields automatically create inputs for each language.

## 🎨 Admin Panel Customization

The admin panel includes:

- **Custom branding** - ISSI colors and styling
- **Responsive design** - Mobile-friendly admin interface
- **Rich text editor** - Full formatting capabilities
- **Media gallery** - Drag-and-drop file uploads

## 🔧 Development Scripts

```bash
# Test PayloadCMS connection
npm run test:payload

# Generate TypeScript types
npm run generate:types

# Access PayloadCMS CLI
npm run payload

# Standard development
npm run dev
```

## 📝 Sample Data

The system includes seed data that creates:

- **Admin user**: admin@issi.com / password123!
- **3 sample categories**: Technology, Business, Innovation
- **3 sample blog posts**: 2 published, 1 draft

Seed data runs automatically on first startup if no users exist.

## 🔍 API Usage

### Frontend Integration

The blog pages use the PayloadCMS Local API:

```typescript
// Get blog posts
const payload = await getPayload();
const result = await payload.find({
  collection: 'posts',
  where: {
    status: { equals: 'published' },
    publishedAt: { less_than_equal: new Date() }
  },
  locale: 'en',
  depth: 2
});
```

### REST API Endpoints

PayloadCMS automatically generates REST endpoints:

- `GET /api/posts` - List blog posts
- `GET /api/posts/:id` - Get single post  
- `GET /api/categories` - List categories
- `GET /api/media` - List media files
- `GET /api/users` - List users (admin only)

### GraphQL API

GraphQL playground available at: `http://localhost:3000/api/graphql`

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB connection error**
   - Ensure MongoDB is running
   - Check DATABASE_URI in .env.local
   - Verify network access to MongoDB

2. **Admin login issues**  
   - Check if seed data created admin user
   - Verify PAYLOAD_SECRET is set
   - Try clearing browser cookies

3. **File upload errors**
   - Check public/media directory permissions
   - For production, verify S3 configuration
   - Ensure sufficient disk space

4. **TypeScript errors**
   - Run `npm run generate:types` to create payload-types.ts
   - Check all collection imports

### Debug Mode

Enable PayloadCMS debug logging:

```javascript
// In payload.config.ts
debug: process.env.NODE_ENV === 'development'
```

## 🔄 Deployment

### Production Checklist

- [ ] Set strong PAYLOAD_SECRET
- [ ] Configure S3 for file uploads  
- [ ] Set up MongoDB Atlas or managed database
- [ ] Update CORS and CSRF origins
- [ ] Enable SSL/HTTPS
- [ ] Set up automated backups

### Environment Variables for Production

```bash
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/issi-cms
PAYLOAD_SECRET=your-production-secret
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
S3_BUCKET=your-s3-bucket
# ... S3 credentials
```

## 📚 Additional Resources

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [PayloadCMS Examples](https://github.com/payloadcms/payload/tree/master/examples)
- [MongoDB Setup Guide](https://docs.mongodb.com/manual/installation/)
- [AWS S3 Configuration](https://docs.aws.amazon.com/s3/)