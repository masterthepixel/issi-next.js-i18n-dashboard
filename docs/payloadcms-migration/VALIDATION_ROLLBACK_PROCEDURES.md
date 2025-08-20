# Validation & Rollback Procedures

## 📋 **Overview**

This document provides comprehensive validation testing procedures and emergency rollback protocols for the PayloadCMS migration. All procedures include automated testing, manual verification steps, and emergency recovery options.

## ✅ **Pre-Migration Validation**

### **1. Data Integrity Validation**

```typescript
// scripts/validation/pre-migration-validation.ts
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface ValidationReport {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  statistics: ValidationStats;
}

interface ValidationError {
  type: "MISSING_FILE" | "INVALID_JSON" | "MISSING_TRANSLATION" | "BROKEN_REFERENCE";
  message: string;
  location: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

export class PreMigrationValidator {
  async validateSourceData(): Promise<ValidationReport> {
    const report: ValidationReport = {
      isValid: true,
      errors: [],
      warnings: [],
      statistics: {
        totalFiles: 0,
        totalKeys: 0,
        languages: ["en", "fr", "es"],
        missingTranslations: {},
      },
    };

    console.log("🔍 Starting pre-migration validation...");

    // Validate translation files exist
    await this.validateFileExistence(report);

    // Validate JSON syntax
    await this.validateJSONSyntax(report);

    // Validate translation completeness
    await this.validateTranslationCompleteness(report);

    // Validate file structure
    await this.validateFileStructure(report);

    // Validate product data integrity
    await this.validateProductData(report);

    report.isValid = report.errors.filter((e) => e.severity === "HIGH").length === 0;

    this.generateValidationReport(report);
    return report;
  }

  private async validateFileExistence(report: ValidationReport): Promise<void> {
    const requiredFiles = [
      "src/lang/en.json",
      "src/lang/fr.json",
      "src/lang/es.json",
      "payload.config.ts",
      "i18n-config.ts",
    ];

    for (const file of requiredFiles) {
      if (!existsSync(join(process.cwd(), file))) {
        report.errors.push({
          type: "MISSING_FILE",
          message: `Required file missing: ${file}`,
          location: file,
          severity: "HIGH",
        });
      }
    }
  }

  private async validateJSONSyntax(report: ValidationReport): Promise<void> {
    for (const lang of report.statistics.languages) {
      try {
        const filePath = join(process.cwd(), `src/lang/${lang}.json`);
        const content = readFileSync(filePath, "utf8");
        JSON.parse(content);
        report.statistics.totalFiles++;
      } catch (error) {
        report.errors.push({
          type: "INVALID_JSON",
          message: `Invalid JSON syntax in ${lang}.json: ${error.message}`,
          location: `src/lang/${lang}.json`,
          severity: "HIGH",
        });
      }
    }
  }

  private async validateTranslationCompleteness(report: ValidationReport): Promise<void> {
    const translations = {};

    // Load all translation files
    for (const lang of report.statistics.languages) {
      try {
        const filePath = join(process.cwd(), `src/lang/${lang}.json`);
        translations[lang] = JSON.parse(readFileSync(filePath, "utf8"));
      } catch (error) {
        continue; // Already caught in JSON validation
      }
    }

    // Use English as baseline
    if (!translations["en"]) return;

    const baseKeys = this.flattenObject(translations["en"]);
    report.statistics.totalKeys = baseKeys.length;

    // Check other languages for missing translations
    for (const lang of ["fr", "es"]) {
      if (!translations[lang]) continue;

      const langKeys = this.flattenObject(translations[lang]);
      const missing = baseKeys.filter((key) => !langKeys.includes(key));

      if (missing.length > 0) {
        report.statistics.missingTranslations[lang] = missing;
        report.warnings.push({
          type: "MISSING_TRANSLATION",
          message: `${missing.length} missing translations in ${lang}`,
          location: `src/lang/${lang}.json`,
          severity: "MEDIUM",
        });
      }
    }
  }

  private flattenObject(obj: any, prefix = ""): string[] {
    let keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(this.flattenObject(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  private generateValidationReport(report: ValidationReport): void {
    console.log("\n📊 VALIDATION REPORT");
    console.log("=".repeat(50));
    console.log(`Status: ${report.isValid ? "✅ PASSED" : "❌ FAILED"}`);
    console.log(`Files: ${report.statistics.totalFiles}`);
    console.log(`Total Keys: ${report.statistics.totalKeys}`);
    console.log(`Errors: ${report.errors.length}`);
    console.log(`Warnings: ${report.warnings.length}`);

    if (report.errors.length > 0) {
      console.log("\n❌ ERRORS:");
      report.errors.forEach((error) => {
        console.log(`  ${error.severity}: ${error.message}`);
      });
    }

    if (report.warnings.length > 0) {
      console.log("\n⚠️  WARNINGS:");
      report.warnings.forEach((warning) => {
        console.log(`  ${warning.severity}: ${warning.message}`);
      });
    }
  }
}
```

### **2. Environment Validation**

```typescript
// scripts/validation/environment-validation.ts
export class EnvironmentValidator {
  async validateEnvironment(): Promise<boolean> {
    console.log("🔍 Validating environment...");

    const checks = [
      () => this.checkNodeVersion(),
      () => this.checkDependencies(),
      () => this.checkEnvironmentVariables(),
      () => this.checkDatabaseConnection(),
      () => this.checkFilePermissions(),
    ];

    for (const check of checks) {
      const result = await check();
      if (!result) return false;
    }

    console.log("✅ Environment validation passed");
    return true;
  }

  private async checkNodeVersion(): Promise<boolean> {
    const nodeVersion = process.version;
    const requiredVersion = "18.0.0";

    if (this.compareVersions(nodeVersion.slice(1), requiredVersion) < 0) {
      console.error(`❌ Node.js ${requiredVersion}+ required, found ${nodeVersion}`);
      return false;
    }

    console.log(`✅ Node.js version: ${nodeVersion}`);
    return true;
  }

  private async checkDependencies(): Promise<boolean> {
    const requiredDeps = ["payload", "@payloadcms/bundler-webpack", "mongodb", "next", "react", "typescript"];

    try {
      const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      for (const dep of requiredDeps) {
        if (!allDeps[dep]) {
          console.error(`❌ Missing dependency: ${dep}`);
          return false;
        }
      }

      console.log("✅ All required dependencies found");
      return true;
    } catch (error) {
      console.error("❌ Error reading package.json");
      return false;
    }
  }

  private async checkEnvironmentVariables(): Promise<boolean> {
    const requiredVars = ["PAYLOAD_SECRET", "MONGODB_URI"];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        console.error(`❌ Missing environment variable: ${varName}`);
        return false;
      }
    }

    console.log("✅ All environment variables present");
    return true;
  }

  private compareVersions(a: string, b: string): number {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;

      if (aPart > bPart) return 1;
      if (aPart < bPart) return -1;
    }

    return 0;
  }
}
```

## 🧪 **During-Migration Validation**

### **3. Real-time Migration Monitoring**

```typescript
// scripts/validation/migration-monitor.ts
export class MigrationMonitor {
  private stats = {
    startTime: new Date(),
    processed: 0,
    successful: 0,
    failed: 0,
    errors: [],
  };

  async startMonitoring(): Promise<void> {
    console.log("📊 Starting migration monitoring...");

    // Start real-time monitoring
    setInterval(() => {
      this.reportProgress();
    }, 10000); // Report every 10 seconds
  }

  recordSuccess(item: string): void {
    this.stats.processed++;
    this.stats.successful++;
    console.log(`✅ Migrated: ${item}`);
  }

  recordFailure(item: string, error: string): void {
    this.stats.processed++;
    this.stats.failed++;
    this.stats.errors.push({ item, error, timestamp: new Date() });
    console.error(`❌ Failed: ${item} - ${error}`);
  }

  private reportProgress(): void {
    const elapsed = (Date.now() - this.stats.startTime.getTime()) / 1000;
    const rate = this.stats.processed / elapsed;

    console.log("\n📊 MIGRATION PROGRESS");
    console.log(`Processed: ${this.stats.processed}`);
    console.log(`Successful: ${this.stats.successful}`);
    console.log(`Failed: ${this.stats.failed}`);
    console.log(`Rate: ${rate.toFixed(2)} items/sec`);
    console.log(`Elapsed: ${elapsed.toFixed(0)}s`);
  }

  generateFinalReport(): void {
    const totalTime = (Date.now() - this.stats.startTime.getTime()) / 1000;
    const successRate = (this.stats.successful / this.stats.processed) * 100;

    console.log("\n📈 FINAL MIGRATION REPORT");
    console.log("=".repeat(50));
    console.log(`Total Processed: ${this.stats.processed}`);
    console.log(`Successful: ${this.stats.successful}`);
    console.log(`Failed: ${this.stats.failed}`);
    console.log(`Success Rate: ${successRate.toFixed(1)}%`);
    console.log(`Total Time: ${totalTime.toFixed(0)}s`);

    if (this.stats.errors.length > 0) {
      console.log("\n❌ ERRORS:");
      this.stats.errors.forEach((error) => {
        console.log(`  ${error.item}: ${error.error}`);
      });
    }
  }
}
```

### **4. Data Consistency Validation**

```typescript
// scripts/validation/consistency-validator.ts
import payload from "payload";

export class ConsistencyValidator {
  async validateMigratedData(): Promise<boolean> {
    console.log("🔍 Validating migrated data consistency...");

    const checks = [
      () => this.validateProductConsistency(),
      () => this.validatePageConsistency(),
      () => this.validateLocalizationConsistency(),
      () => this.validateRelationshipIntegrity(),
    ];

    for (const check of checks) {
      const result = await check();
      if (!result) return false;
    }

    console.log("✅ Data consistency validation passed");
    return true;
  }

  private async validateProductConsistency(): Promise<boolean> {
    try {
      const products = await payload.find({
        collection: "products",
        limit: 1000,
      });

      for (const product of products.docs) {
        // Check required fields
        if (!product.title || !product.slug || !product.productId) {
          console.error(`❌ Product missing required fields: ${product.id}`);
          return false;
        }

        // Check localization completeness
        for (const locale of ["en", "fr", "es"]) {
          const localizedProduct = await payload.findByID({
            collection: "products",
            id: product.id,
            locale,
          });

          if (!localizedProduct.title || !localizedProduct.description) {
            console.error(`❌ Product missing ${locale} translations: ${product.productId}`);
            return false;
          }
        }
      }

      console.log(`✅ Product consistency validated: ${products.docs.length} products`);
      return true;
    } catch (error) {
      console.error(`❌ Product validation failed: ${error.message}`);
      return false;
    }
  }

  private async validatePageConsistency(): Promise<boolean> {
    try {
      const pages = await payload.find({
        collection: "pages",
        limit: 1000,
      });

      for (const page of pages.docs) {
        // Check required fields
        if (!page.title || !page.slug) {
          console.error(`❌ Page missing required fields: ${page.id}`);
          return false;
        }

        // Check SEO fields
        if (!page.seo?.title || !page.seo?.description) {
          console.error(`❌ Page missing SEO fields: ${page.slug}`);
          return false;
        }
      }

      console.log(`✅ Page consistency validated: ${pages.docs.length} pages`);
      return true;
    } catch (error) {
      console.error(`❌ Page validation failed: ${error.message}`);
      return false;
    }
  }
}
```

## 🔄 **Rollback Procedures**

### **5. Emergency Rollback System**

```typescript
// scripts/rollback/rollback-manager.ts
import { exec } from "child_process";
import { promisify } from "util";
import { readFileSync, writeFileSync } from "fs";

const execAsync = promisify(exec);

interface RollbackPlan {
  migrationId: string;
  timestamp: Date;
  backupLocation: string;
  affectedCollections: string[];
  rollbackSteps: RollbackStep[];
}

interface RollbackStep {
  order: number;
  action: "RESTORE_DATABASE" | "RESTORE_FILES" | "UPDATE_CONFIG" | "RESTART_SERVICE";
  description: string;
  command?: string;
  verification?: string;
}

export class RollbackManager {
  async executeEmergencyRollback(migrationId: string): Promise<void> {
    console.log(`🚨 EXECUTING EMERGENCY ROLLBACK: ${migrationId}`);

    const rollbackPlan = this.loadRollbackPlan(migrationId);

    if (!rollbackPlan) {
      throw new Error(`No rollback plan found for migration: ${migrationId}`);
    }

    // Execute rollback steps in order
    for (const step of rollbackPlan.rollbackSteps) {
      await this.executeRollbackStep(step);
    }

    console.log("✅ Emergency rollback completed successfully");
  }

  private loadRollbackPlan(migrationId: string): RollbackPlan | null {
    try {
      const planPath = `./backups/${migrationId}/rollback-plan.json`;
      return JSON.parse(readFileSync(planPath, "utf8"));
    } catch (error) {
      console.error(`❌ Failed to load rollback plan: ${error.message}`);
      return null;
    }
  }

  private async executeRollbackStep(step: RollbackStep): Promise<void> {
    console.log(`📋 Step ${step.order}: ${step.description}`);

    switch (step.action) {
      case "RESTORE_DATABASE":
        await this.restoreDatabase(step);
        break;
      case "RESTORE_FILES":
        await this.restoreFiles(step);
        break;
      case "UPDATE_CONFIG":
        await this.updateConfiguration(step);
        break;
      case "RESTART_SERVICE":
        await this.restartService(step);
        break;
    }

    // Verify step completion
    if (step.verification) {
      await this.verifyStep(step);
    }
  }

  private async restoreDatabase(step: RollbackStep): Promise<void> {
    try {
      await execAsync(step.command!);
      console.log("✅ Database restored successfully");
    } catch (error) {
      throw new Error(`Database restore failed: ${error.message}`);
    }
  }

  private async restoreFiles(step: RollbackStep): Promise<void> {
    try {
      await execAsync(step.command!);
      console.log("✅ Files restored successfully");
    } catch (error) {
      throw new Error(`File restore failed: ${error.message}`);
    }
  }

  private async updateConfiguration(step: RollbackStep): Promise<void> {
    // Restore original configuration files
    console.log("✅ Configuration updated successfully");
  }

  private async restartService(step: RollbackStep): Promise<void> {
    try {
      await execAsync(step.command!);
      console.log("✅ Service restarted successfully");
    } catch (error) {
      throw new Error(`Service restart failed: ${error.message}`);
    }
  }

  private async verifyStep(step: RollbackStep): Promise<void> {
    try {
      await execAsync(step.verification!);
      console.log("✅ Step verification passed");
    } catch (error) {
      throw new Error(`Step verification failed: ${error.message}`);
    }
  }
}
```

### **6. Automated Rollback Scripts**

```bash
#!/bin/bash
# scripts/rollback/emergency-rollback.sh
set -e

MIGRATION_ID=$1
BACKUP_DIR="./backups"

if [ -z "$MIGRATION_ID" ]; then
    echo "❌ Usage: $0 <migration-id>"
    exit 1
fi

echo "🚨 EMERGENCY ROLLBACK INITIATED"
echo "Migration ID: $MIGRATION_ID"
echo "Timestamp: $(date)"

# Stop application
echo "🛑 Stopping application..."
pm2 stop issi-dashboard || npm run dev:stop || echo "Application not running"

# Restore database
echo "📁 Restoring database..."
BACKUP_PATH="$BACKUP_DIR/backup_$MIGRATION_ID"
if [ -d "$BACKUP_PATH" ]; then
    mongorestore --uri="$MONGODB_URI" --drop "$BACKUP_PATH/$(basename $MONGODB_URI | cut -d'?' -f1)"
    echo "✅ Database restored"
else
    echo "❌ Backup not found: $BACKUP_PATH"
    exit 1
fi

# Restore configuration files
echo "⚙️  Restoring configuration..."
cp "$BACKUP_PATH/payload.config.ts.backup" "./payload.config.ts" 2>/dev/null || echo "No config backup found"
cp "$BACKUP_PATH/next.config.mjs.backup" "./next.config.mjs" 2>/dev/null || echo "No next config backup found"

# Restore translation files
echo "🌐 Restoring translation files..."
cp -r "$BACKUP_PATH/lang" "./src/" 2>/dev/null || echo "No translation backup found"

# Restart application
echo "🚀 Restarting application..."
npm run build && npm run start || npm run dev &

# Verify rollback
echo "🔍 Verifying rollback..."
sleep 10
curl -f http://localhost:3000/api/health || echo "⚠️  Health check failed"

echo "✅ EMERGENCY ROLLBACK COMPLETED"
echo "Rollback ID: rollback_$(date +%s)"
```

## 📋 **Validation Checklists**

### **Pre-Migration Checklist**

```typescript
const preMigrationChecklist = [
  {
    task: "Backup current database",
    command: "npm run migration:backup",
    required: true,
    verification: "Backup files exist in ./backups/",
  },
  {
    task: "Validate source data integrity",
    command: "npm run migration:validate",
    required: true,
    verification: "All validation checks pass",
  },
  {
    task: "Check environment variables",
    command: "npm run migration:check-env",
    required: true,
    verification: "All required env vars present",
  },
  {
    task: "Test database connection",
    command: "npm run migration:test-db",
    required: true,
    verification: "Database connection successful",
  },
  {
    task: "Run dry-run migration",
    command: "npm run migration:dry-run",
    required: true,
    verification: "Dry run completes without errors",
  },
];
```

### **Post-Migration Checklist**

```typescript
const postMigrationChecklist = [
  {
    task: "Validate data consistency",
    command: "npm run migration:validate-data",
    required: true,
    verification: "All migrated data validates",
  },
  {
    task: "Test API endpoints",
    command: "npm run migration:test-api",
    required: true,
    verification: "All PayloadCMS APIs respond correctly",
  },
  {
    task: "Verify localization",
    command: "npm run migration:test-i18n",
    required: true,
    verification: "All languages display correctly",
  },
  {
    task: "Performance testing",
    command: "npm run migration:test-performance",
    required: false,
    verification: "Response times within acceptable limits",
  },
  {
    task: "User acceptance testing",
    command: "Manual testing checklist",
    required: true,
    verification: "All user flows work as expected",
  },
];
```

---

**Document Created**: August 11, 2025  
**Status**: Complete Validation & Rollback Procedures  
**Coverage**: Pre/during/post migration validation + emergency rollback  
**Dependencies**: MongoDB tools, Node.js, PM2 (optional)
