# Deployment & Environment Requirements

## 📋 **Overview**

This document outlines comprehensive deployment requirements, environment specifications, and infrastructure setup for the PayloadCMS migration. Covers development, staging, and production environments with detailed configuration instructions.

## 🏗️ **Infrastructure Requirements**

### **1. Server Specifications**

```yaml
# Minimum Server Requirements
production:
  cpu: "4 cores (2.4GHz+)"
  memory: "8GB RAM"
  storage: "100GB SSD"
  bandwidth: "1Gbps"
  uptime: "99.9%"

staging:
  cpu: "2 cores (2.0GHz+)"
  memory: "4GB RAM"
  storage: "50GB SSD"
  bandwidth: "100Mbps"
  uptime: "99%"

development:
  cpu: "2 cores (2.0GHz+)"
  memory: "4GB RAM"
  storage: "20GB SSD"
  bandwidth: "Local/VPN"
  uptime: "Development hours"
```

### **2. Database Requirements**

```yaml
# MongoDB Atlas Configuration
production:
  cluster_tier: "M30" # Dedicated cluster
  storage: "200GB"
  backup: "Continuous backup enabled"
  regions: "Multi-region (US, EU)"
  connections: "500 max concurrent"

staging:
  cluster_tier: "M20" # Dedicated cluster
  storage: "50GB"
  backup: "Daily snapshots"
  regions: "Single region"
  connections: "200 max concurrent"

development:
  cluster_tier: "M10" # Shared cluster
  storage: "10GB"
  backup: "Weekly snapshots"
  regions: "Single region"
  connections: "100 max concurrent"
```

## 🔧 **Environment Configuration**

### **3. Environment Variables**

```bash
# .env.production
# PayloadCMS Configuration
PAYLOAD_SECRET="your-super-secret-payload-key-min-32-chars"
PAYLOAD_PUBLIC_SERVER_URL="https://yourdomain.com"

# Database Configuration
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# File Upload Configuration
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Email Configuration (for admin notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-app-password"

# Security Configuration
CORS_ORIGINS="https://yourdomain.com,https://admin.yourdomain.com"
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="900000" # 15 minutes

# Monitoring & Logging
LOG_LEVEL="info"
SENTRY_DSN="your-sentry-dsn"
ANALYTICS_ID="your-analytics-id"

# Cache Configuration
REDIS_URL="redis://localhost:6379"
CACHE_TTL="3600" # 1 hour
```

```bash
# .env.staging
# Similar to production but with staging values
PAYLOAD_SECRET="staging-secret-key-min-32-chars"
PAYLOAD_PUBLIC_SERVER_URL="https://staging.yourdomain.com"
MONGODB_URI="mongodb+srv://staging-user:password@staging-cluster.mongodb.net/staging-db"

# Development relaxed settings
CORS_ORIGINS="*"
LOG_LEVEL="debug"
RATE_LIMIT_MAX="1000"
```

```bash
# .env.development
# Local development configuration
PAYLOAD_SECRET="dev-secret-key-min-32-chars-change-in-prod"
PAYLOAD_PUBLIC_SERVER_URL="http://localhost:3000"
MONGODB_URI="mongodb+srv://dev-user:password@dev-cluster.mongodb.net/dev-db"

# Development settings
CORS_ORIGINS="*"
LOG_LEVEL="debug"
RATE_LIMIT_MAX="unlimited"
NEXTAUTH_URL="http://localhost:3000"
```

### **4. Docker Configuration**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm install -g pnpm && pnpm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - MONGODB_URI=${MONGODB_URI}
      - PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
    depends_on:
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped

volumes:
  redis_data:
```

### **5. Nginx Configuration**

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream nextjs {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=admin:10m rate=5r/s;

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript;
        gzip_min_length 1000;

        # Static file caching
        location /_next/static/ {
            alias /app/.next/static/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://nextjs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Admin panel rate limiting
        location /admin/ {
            limit_req zone=admin burst=10 nodelay;
            proxy_pass http://nextjs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # General proxy
        location / {
            proxy_pass http://nextjs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## 🚀 **Deployment Scripts**

### **6. Automated Deployment**

```bash
#!/bin/bash
# scripts/deploy/deploy-production.sh
set -e

ENVIRONMENT="production"
APP_NAME="issi-dashboard"
BACKUP_RETENTION_DAYS=30

echo "🚀 Starting $ENVIRONMENT deployment..."

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run test:ci
npm run lint:ci
npm run type-check

# Create deployment backup
echo "📦 Creating pre-deployment backup..."
BACKUP_ID="pre-deploy-$(date +%Y%m%d-%H%M%S)"
npm run migration:backup -- --id="$BACKUP_ID"

# Build application
echo "🏗️  Building application..."
npm run build

# Database migration (if needed)
if [ -f "pending-migrations.txt" ]; then
    echo "🔄 Running database migrations..."
    npm run migration:run
    rm pending-migrations.txt
fi

# Deploy to production
echo "📤 Deploying to production..."
if command -v docker &> /dev/null; then
    # Docker deployment
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d --build
else
    # PM2 deployment
    pm2 stop $APP_NAME || true
    pm2 start ecosystem.config.js --env production
fi

# Health check
echo "🔍 Running health checks..."
sleep 30
curl -f https://yourdomain.com/api/health || {
    echo "❌ Health check failed, rolling back..."
    npm run rollback:latest
    exit 1
}

# Verify deployment
echo "✅ Running post-deployment verification..."
npm run test:integration:production

# Cleanup old backups
echo "🧹 Cleaning up old backups..."
find ./backups -name "pre-deploy-*" -mtime +$BACKUP_RETENTION_DAYS -delete

echo "✅ Production deployment completed successfully!"
```

```javascript
// ecosystem.config.js - PM2 Configuration
module.exports = {
  apps: [
    {
      name: "issi-dashboard",
      script: "npm",
      args: "start",
      cwd: "/path/to/app",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      max_memory_restart: "2G",
      node_args: "--max-old-space-size=4096",
    },
  ],
};
```

### **7. CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Run linting
        run: npm run lint:ci

      - name: Type checking
        run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
          MONGODB_URI: ${{ secrets.MONGODB_URI }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-files
          path: .next/

  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-files
          path: .next/

      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /path/to/app
            git pull origin main
            npm ci --production
            pm2 reload ecosystem.config.js --env production
```

## 📊 **Monitoring & Health Checks**

### **8. Health Check Endpoints**

```typescript
// src/app/api/health/route.ts
import { NextRequest, NextResponse } from "next/server";
import payload from "payload";

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  version: string;
  checks: {
    database: boolean;
    payloadCMS: boolean;
    fileSystem: boolean;
    memory: {
      used: number;
      free: number;
      percentage: number;
    };
  };
  uptime: number;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  const healthStatus: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    checks: {
      database: false,
      payloadCMS: false,
      fileSystem: false,
      memory: {
        used: 0,
        free: 0,
        percentage: 0,
      },
    },
    uptime: process.uptime(),
  };

  try {
    // Check database connection
    await payload.find({
      collection: "products",
      limit: 1,
    });
    healthStatus.checks.database = true;
    healthStatus.checks.payloadCMS = true;
  } catch (error) {
    healthStatus.status = "unhealthy";
    healthStatus.checks.database = false;
    healthStatus.checks.payloadCMS = false;
  }

  // Check file system
  try {
    const fs = require("fs");
    fs.accessSync("./package.json", fs.constants.R_OK);
    healthStatus.checks.fileSystem = true;
  } catch (error) {
    healthStatus.status = "unhealthy";
    healthStatus.checks.fileSystem = false;
  }

  // Memory usage
  const memUsage = process.memoryUsage();
  healthStatus.checks.memory = {
    used: Math.round(memUsage.heapUsed / 1024 / 1024),
    free: Math.round((memUsage.heapTotal - memUsage.heapUsed) / 1024 / 1024),
    percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
  };

  const responseTime = Date.now() - startTime;

  return NextResponse.json(
    { ...healthStatus, responseTime },
    { status: healthStatus.status === "healthy" ? 200 : 503 }
  );
}
```

### **9. Performance Monitoring**

```typescript
// src/lib/monitoring.ts
import { NextRequest } from "next/server";

export class PerformanceMonitor {
  static trackPageLoad(pageName: string, loadTime: number): void {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_load_time", {
        page_name: pageName,
        load_time: loadTime,
      });
    }
  }

  static trackAPICall(endpoint: string, duration: number, status: number): void {
    if (process.env.NODE_ENV === "production") {
      console.log(`API: ${endpoint} - ${duration}ms - ${status}`);
    }
  }

  static async measureAsync<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    const start = Date.now();
    try {
      const result = await operation();
      const duration = Date.now() - start;
      this.trackAPICall(operationName, duration, 200);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.trackAPICall(operationName, duration, 500);
      throw error;
    }
  }
}
```

## 🔒 **Security Configuration**

### **10. Security Headers & Settings**

```typescript
// next.config.mjs security configuration
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];

export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
```

---

**Document Created**: August 11, 2025  
**Status**: Production-Ready Deployment Guide  
**Coverage**: Complete infrastructure, deployment, and monitoring setup  
**Dependencies**: Docker, Nginx, PM2, MongoDB Atlas, GitHub Actions
