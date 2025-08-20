# Migration History & Change Tracking

## 📋 **Overview**

This document provides comprehensive migration history tracking, change logs, audit procedures, and version control for the PayloadCMS migration. Enables complete traceability of all migration activities and changes.

## 📚 **Migration History System**

### **1. Migration Log Structure**

```typescript
// types/migration-history.ts
export interface MigrationRecord {
  id: string;
  timestamp: Date;
  type: "FULL_MIGRATION" | "PARTIAL_MIGRATION" | "ROLLBACK" | "HOTFIX";
  version: string;
  executor: string;
  environment: "development" | "staging" | "production";
  status: "INITIATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "ROLLED_BACK";

  // Migration Details
  scope: {
    collections: string[];
    affectedItems: number;
    estimatedDuration: number;
    actualDuration?: number;
  };

  // Results
  results: {
    successful: number;
    failed: number;
    warnings: number;
    errors: MigrationError[];
  };

  // Tracking
  checkpoints: MigrationCheckpoint[];
  backupId?: string;
  rollbackId?: string;

  // Metadata
  metadata: {
    nodeVersion: string;
    payloadVersion: string;
    mongoVersion: string;
    appVersion: string;
  };
}

export interface MigrationCheckpoint {
  timestamp: Date;
  step: string;
  status: "STARTED" | "COMPLETED" | "FAILED";
  itemsProcessed: number;
  message?: string;
  duration: number;
}

export interface MigrationError {
  timestamp: Date;
  type: "VALIDATION" | "TRANSFORMATION" | "DATABASE" | "SYSTEM";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  item?: string;
  stack?: string;
  context?: Record<string, any>;
}
```

### **2. Migration Logger Implementation**

```typescript
// lib/migration-history/migration-logger.ts
import { writeFileSync, appendFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export class MigrationHistoryLogger {
  private historyFile: string;
  private currentMigration: MigrationRecord | null = null;

  constructor() {
    this.historyFile = join(process.cwd(), "migration-history.json");
    this.ensureHistoryFile();
  }

  startMigration(config: {
    type: MigrationRecord["type"];
    version: string;
    executor: string;
    environment: MigrationRecord["environment"];
    scope: MigrationRecord["scope"];
  }): string {
    const migrationId = `migration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.currentMigration = {
      id: migrationId,
      timestamp: new Date(),
      type: config.type,
      version: config.version,
      executor: config.executor,
      environment: config.environment,
      status: "INITIATED",
      scope: config.scope,
      results: {
        successful: 0,
        failed: 0,
        warnings: 0,
        errors: [],
      },
      checkpoints: [],
      metadata: {
        nodeVersion: process.version,
        payloadVersion: this.getPackageVersion("payload"),
        mongoVersion: "Unknown", // Will be updated during migration
        appVersion: this.getPackageVersion("next"),
      },
    };

    this.recordCheckpoint("MIGRATION_INITIATED", "STARTED", 0);
    this.saveToHistory();

    console.log(`📝 Migration started: ${migrationId}`);
    return migrationId;
  }

  recordCheckpoint(
    step: string,
    status: MigrationCheckpoint["status"],
    itemsProcessed: number,
    message?: string
  ): void {
    if (!this.currentMigration) return;

    const checkpoint: MigrationCheckpoint = {
      timestamp: new Date(),
      step,
      status,
      itemsProcessed,
      message,
      duration: this.calculateStepDuration(),
    };

    this.currentMigration.checkpoints.push(checkpoint);
    this.currentMigration.status = status === "FAILED" ? "FAILED" : "IN_PROGRESS";

    this.saveToHistory();
    console.log(`📍 Checkpoint: ${step} - ${status} (${itemsProcessed} items)`);
  }

  recordSuccess(item: string): void {
    if (!this.currentMigration) return;

    this.currentMigration.results.successful++;
    this.saveToHistory();
  }

  recordFailure(item: string, error: string, type: MigrationError["type"] = "SYSTEM"): void {
    if (!this.currentMigration) return;

    this.currentMigration.results.failed++;
    this.currentMigration.results.errors.push({
      timestamp: new Date(),
      type,
      severity: "HIGH",
      message: error,
      item,
      context: { migrationId: this.currentMigration.id },
    });

    this.saveToHistory();
  }

  completeMigration(backupId?: string): void {
    if (!this.currentMigration) return;

    this.currentMigration.status = "COMPLETED";
    this.currentMigration.scope.actualDuration = this.calculateTotalDuration();
    if (backupId) this.currentMigration.backupId = backupId;

    this.recordCheckpoint("MIGRATION_COMPLETED", "COMPLETED", this.currentMigration.results.successful);
    this.saveToHistory();

    console.log(`✅ Migration completed: ${this.currentMigration.id}`);
    this.generateMigrationReport();
  }

  failMigration(error: string): void {
    if (!this.currentMigration) return;

    this.currentMigration.status = "FAILED";
    this.recordCheckpoint("MIGRATION_FAILED", "FAILED", this.currentMigration.results.successful, error);
    this.saveToHistory();

    console.log(`❌ Migration failed: ${this.currentMigration.id}`);
  }

  recordRollback(originalMigrationId: string, rollbackId: string): void {
    const rollbackMigration: MigrationRecord = {
      id: rollbackId,
      timestamp: new Date(),
      type: "ROLLBACK",
      version: "rollback",
      executor: "system",
      environment: this.currentMigration?.environment || "production",
      status: "COMPLETED",
      scope: {
        collections: ["all"],
        affectedItems: 0,
        estimatedDuration: 0,
        actualDuration: 0,
      },
      results: {
        successful: 1,
        failed: 0,
        warnings: 0,
        errors: [],
      },
      checkpoints: [
        {
          timestamp: new Date(),
          step: "ROLLBACK_EXECUTED",
          status: "COMPLETED",
          itemsProcessed: 1,
          duration: 0,
        },
      ],
      metadata: {
        nodeVersion: process.version,
        payloadVersion: this.getPackageVersion("payload"),
        mongoVersion: "Unknown",
        appVersion: this.getPackageVersion("next"),
      },
    };

    const history = this.loadHistory();
    history.migrations.push(rollbackMigration);
    this.writeHistory(history);

    console.log(`🔄 Rollback recorded: ${rollbackId} for migration ${originalMigrationId}`);
  }

  private ensureHistoryFile(): void {
    if (!existsSync(this.historyFile)) {
      const initialHistory = {
        version: "1.0.0",
        created: new Date().toISOString(),
        migrations: [],
      };
      writeFileSync(this.historyFile, JSON.stringify(initialHistory, null, 2));
    }
  }

  private saveToHistory(): void {
    if (!this.currentMigration) return;

    const history = this.loadHistory();
    const existingIndex = history.migrations.findIndex((m) => m.id === this.currentMigration!.id);

    if (existingIndex >= 0) {
      history.migrations[existingIndex] = this.currentMigration;
    } else {
      history.migrations.push(this.currentMigration);
    }

    this.writeHistory(history);
  }

  private loadHistory(): any {
    try {
      return JSON.parse(readFileSync(this.historyFile, "utf8"));
    } catch (error) {
      return { version: "1.0.0", created: new Date().toISOString(), migrations: [] };
    }
  }

  private writeHistory(history: any): void {
    writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
  }

  private calculateStepDuration(): number {
    if (!this.currentMigration || this.currentMigration.checkpoints.length === 0) return 0;

    const lastCheckpoint = this.currentMigration.checkpoints[this.currentMigration.checkpoints.length - 1];
    return Date.now() - lastCheckpoint.timestamp.getTime();
  }

  private calculateTotalDuration(): number {
    if (!this.currentMigration) return 0;
    return Date.now() - this.currentMigration.timestamp.getTime();
  }

  private getPackageVersion(packageName: string): string {
    try {
      const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
      return packageJson.dependencies[packageName] || packageJson.devDependencies[packageName] || "Unknown";
    } catch {
      return "Unknown";
    }
  }

  private generateMigrationReport(): void {
    if (!this.currentMigration) return;

    const report = {
      migrationId: this.currentMigration.id,
      summary: {
        status: this.currentMigration.status,
        totalTime: this.formatDuration(this.currentMigration.scope.actualDuration || 0),
        successful: this.currentMigration.results.successful,
        failed: this.currentMigration.results.failed,
        successRate: (
          (this.currentMigration.results.successful /
            (this.currentMigration.results.successful + this.currentMigration.results.failed)) *
          100
        ).toFixed(1),
      },
      timeline: this.currentMigration.checkpoints.map((cp) => ({
        step: cp.step,
        status: cp.status,
        timestamp: cp.timestamp.toISOString(),
        duration: this.formatDuration(cp.duration),
      })),
    };

    const reportFile = join(process.cwd(), `migration-report-${this.currentMigration.id}.json`);
    writeFileSync(reportFile, JSON.stringify(report, null, 2));

    console.log(`📄 Migration report saved: ${reportFile}`);
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}
```

## 📊 **Change Tracking System**

### **3. Data Change Auditing**

```typescript
// lib/migration-history/change-tracker.ts
export interface DataChangeRecord {
  id: string;
  migrationId: string;
  timestamp: Date;
  collection: string;
  itemId: string;
  changeType: "CREATE" | "UPDATE" | "DELETE" | "TRANSFORM";

  before?: any;
  after?: any;
  transformation?: {
    source: string;
    target: string;
    rules: string[];
  };

  metadata: {
    locale?: string;
    fieldPath?: string;
    validator?: string;
  };
}

export class DataChangeTracker {
  private changes: DataChangeRecord[] = [];
  private migrationId: string;

  constructor(migrationId: string) {
    this.migrationId = migrationId;
  }

  recordCreate(collection: string, itemId: string, data: any, locale?: string): void {
    this.changes.push({
      id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      migrationId: this.migrationId,
      timestamp: new Date(),
      collection,
      itemId,
      changeType: "CREATE",
      after: data,
      metadata: { locale },
    });
  }

  recordUpdate(collection: string, itemId: string, before: any, after: any, fieldPath?: string): void {
    this.changes.push({
      id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      migrationId: this.migrationId,
      timestamp: new Date(),
      collection,
      itemId,
      changeType: "UPDATE",
      before,
      after,
      metadata: { fieldPath },
    });
  }

  recordTransformation(
    collection: string,
    itemId: string,
    sourceKey: string,
    targetField: string,
    sourceValue: any,
    transformedValue: any,
    rules: string[]
  ): void {
    this.changes.push({
      id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      migrationId: this.migrationId,
      timestamp: new Date(),
      collection,
      itemId,
      changeType: "TRANSFORM",
      before: sourceValue,
      after: transformedValue,
      transformation: {
        source: sourceKey,
        target: targetField,
        rules,
      },
      metadata: {},
    });
  }

  exportChanges(): DataChangeRecord[] {
    return [...this.changes];
  }

  saveChangesToFile(): void {
    const changesFile = join(process.cwd(), `data-changes-${this.migrationId}.json`);
    writeFileSync(changesFile, JSON.stringify(this.changes, null, 2));
    console.log(`💾 Data changes saved: ${changesFile}`);
  }

  generateChangesSummary(): any {
    const summary = {
      migrationId: this.migrationId,
      totalChanges: this.changes.length,
      byType: {
        CREATE: this.changes.filter((c) => c.changeType === "CREATE").length,
        UPDATE: this.changes.filter((c) => c.changeType === "UPDATE").length,
        DELETE: this.changes.filter((c) => c.changeType === "DELETE").length,
        TRANSFORM: this.changes.filter((c) => c.changeType === "TRANSFORM").length,
      },
      byCollection: {},
      timeRange: {
        start: this.changes.length > 0 ? this.changes[0].timestamp : null,
        end: this.changes.length > 0 ? this.changes[this.changes.length - 1].timestamp : null,
      },
    };

    // Group by collection
    this.changes.forEach((change) => {
      if (!summary.byCollection[change.collection]) {
        summary.byCollection[change.collection] = 0;
      }
      summary.byCollection[change.collection]++;
    });

    return summary;
  }
}
```

### **4. Version Control Integration**

```typescript
// lib/migration-history/version-control.ts
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class VersionControlIntegration {
  async createMigrationBranch(migrationId: string): Promise<string> {
    const branchName = `migration/${migrationId}`;

    try {
      await execAsync(`git checkout -b ${branchName}`);
      console.log(`🌿 Created migration branch: ${branchName}`);
      return branchName;
    } catch (error) {
      console.error(`❌ Failed to create branch: ${error.message}`);
      throw error;
    }
  }

  async commitMigrationFiles(migrationId: string, message: string): Promise<void> {
    try {
      await execAsync("git add migration-history.json");
      await execAsync(`git add migration-report-${migrationId}.json`);
      await execAsync(`git add data-changes-${migrationId}.json`);
      await execAsync(`git commit -m "${message}"`);
      console.log(`📝 Committed migration files for: ${migrationId}`);
    } catch (error) {
      console.error(`❌ Failed to commit migration files: ${error.message}`);
      throw error;
    }
  }

  async tagMigration(migrationId: string, version: string): Promise<void> {
    const tagName = `migration-${version}-${migrationId}`;

    try {
      await execAsync(`git tag -a ${tagName} -m "Migration ${migrationId} completed"`);
      console.log(`🏷️  Created migration tag: ${tagName}`);
    } catch (error) {
      console.error(`❌ Failed to create tag: ${error.message}`);
      throw error;
    }
  }

  async getCurrentCommit(): Promise<string> {
    try {
      const { stdout } = await execAsync("git rev-parse HEAD");
      return stdout.trim();
    } catch (error) {
      return "unknown";
    }
  }

  async getDiffStats(): Promise<any> {
    try {
      const { stdout } = await execAsync("git diff --stat");
      return {
        hasChanges: stdout.length > 0,
        stats: stdout,
      };
    } catch (error) {
      return {
        hasChanges: false,
        stats: "",
      };
    }
  }
}
```

## 📈 **Migration Analytics**

### **5. Performance Metrics**

```typescript
// lib/migration-history/analytics.ts
export interface PerformanceMetrics {
  migrationId: string;

  // Timing Metrics
  totalDuration: number;
  averageItemTime: number;
  throughputPerMinute: number;

  // Resource Metrics
  peakMemoryUsage: number;
  averageMemoryUsage: number;
  cpuUsagePercentage: number;

  // Database Metrics
  databaseConnections: number;
  queryCount: number;
  averageQueryTime: number;

  // Error Metrics
  errorRate: number;
  retryCount: number;
  timeouts: number;

  // Success Metrics
  completionRate: number;
  dataIntegrityScore: number;
  validationPassRate: number;
}

export class MigrationAnalytics {
  private metrics: PerformanceMetrics;
  private startTime: number;
  private queryTimes: number[] = [];
  private memoryReadings: number[] = [];

  constructor(migrationId: string) {
    this.metrics = {
      migrationId,
      totalDuration: 0,
      averageItemTime: 0,
      throughputPerMinute: 0,
      peakMemoryUsage: 0,
      averageMemoryUsage: 0,
      cpuUsagePercentage: 0,
      databaseConnections: 0,
      queryCount: 0,
      averageQueryTime: 0,
      errorRate: 0,
      retryCount: 0,
      timeouts: 0,
      completionRate: 0,
      dataIntegrityScore: 0,
      validationPassRate: 0,
    };

    this.startTime = Date.now();
    this.startMonitoring();
  }

  private startMonitoring(): void {
    // Monitor memory usage every 10 seconds
    const memoryInterval = setInterval(() => {
      const memUsage = process.memoryUsage();
      const memoryMB = memUsage.heapUsed / 1024 / 1024;
      this.memoryReadings.push(memoryMB);

      if (memoryMB > this.metrics.peakMemoryUsage) {
        this.metrics.peakMemoryUsage = memoryMB;
      }
    }, 10000);

    // Clear interval on process exit
    process.on("exit", () => clearInterval(memoryInterval));
  }

  recordQuery(duration: number): void {
    this.queryTimes.push(duration);
    this.metrics.queryCount++;
    this.metrics.averageQueryTime = this.queryTimes.reduce((a, b) => a + b, 0) / this.queryTimes.length;
  }

  recordError(): void {
    // Error tracking is handled by main logger
  }

  recordRetry(): void {
    this.metrics.retryCount++;
  }

  recordTimeout(): void {
    this.metrics.timeouts++;
  }

  finalize(totalItems: number, successfulItems: number, failedItems: number): PerformanceMetrics {
    this.metrics.totalDuration = Date.now() - this.startTime;
    this.metrics.completionRate = (successfulItems / totalItems) * 100;
    this.metrics.errorRate = (failedItems / totalItems) * 100;
    this.metrics.averageItemTime = this.metrics.totalDuration / totalItems;
    this.metrics.throughputPerMinute = (totalItems / this.metrics.totalDuration) * 60000;

    if (this.memoryReadings.length > 0) {
      this.metrics.averageMemoryUsage = this.memoryReadings.reduce((a, b) => a + b, 0) / this.memoryReadings.length;
    }

    return this.metrics;
  }

  exportMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}
```

## 📋 **Audit Reports**

### **6. Automated Report Generation**

```typescript
// scripts/generate-migration-audit.ts
import { MigrationHistoryLogger } from "../lib/migration-history/migration-logger";
import { readFileSync, writeFileSync } from "fs";

export class MigrationAuditGenerator {
  async generateComprehensiveAudit(): Promise<void> {
    console.log("📊 Generating comprehensive migration audit...");

    const historyData = this.loadMigrationHistory();
    const report = {
      generatedAt: new Date().toISOString(),
      summary: this.generateSummarySection(historyData),
      migrations: this.generateMigrationsSection(historyData),
      trends: this.generateTrendsSection(historyData),
      recommendations: this.generateRecommendations(historyData),
    };

    const reportFile = `migration-audit-${Date.now()}.json`;
    writeFileSync(reportFile, JSON.stringify(report, null, 2));

    // Generate HTML report
    await this.generateHTMLReport(report, reportFile.replace(".json", ".html"));

    console.log(`📄 Audit report generated: ${reportFile}`);
  }

  private loadMigrationHistory(): any {
    try {
      return JSON.parse(readFileSync("migration-history.json", "utf8"));
    } catch (error) {
      return { migrations: [] };
    }
  }

  private generateSummarySection(historyData: any): any {
    const migrations = historyData.migrations || [];

    return {
      totalMigrations: migrations.length,
      successful: migrations.filter((m) => m.status === "COMPLETED").length,
      failed: migrations.filter((m) => m.status === "FAILED").length,
      rolledBack: migrations.filter((m) => m.type === "ROLLBACK").length,

      timeRange: {
        first: migrations.length > 0 ? migrations[0].timestamp : null,
        last: migrations.length > 0 ? migrations[migrations.length - 1].timestamp : null,
      },

      environments: {
        production: migrations.filter((m) => m.environment === "production").length,
        staging: migrations.filter((m) => m.environment === "staging").length,
        development: migrations.filter((m) => m.environment === "development").length,
      },
    };
  }

  private generateMigrationsSection(historyData: any): any {
    return historyData.migrations.map((migration) => ({
      id: migration.id,
      timestamp: migration.timestamp,
      type: migration.type,
      status: migration.status,
      environment: migration.environment,
      duration: migration.scope?.actualDuration || 0,
      itemsProcessed: migration.results?.successful + migration.results?.failed || 0,
      errorCount: migration.results?.errors?.length || 0,
    }));
  }

  private generateTrendsSection(historyData: any): any {
    const migrations = historyData.migrations.filter((m) => m.status === "COMPLETED");

    return {
      averageDuration: migrations.reduce((sum, m) => sum + (m.scope?.actualDuration || 0), 0) / migrations.length,
      successRate: (migrations.length / historyData.migrations.length) * 100,

      performanceTrend: this.calculatePerformanceTrend(migrations),
      frequencyByMonth: this.calculateFrequencyByMonth(migrations),
      errorPatterns: this.analyzeErrorPatterns(historyData.migrations),
    };
  }

  private generateRecommendations(historyData: any): string[] {
    const recommendations = [];
    const migrations = historyData.migrations;

    // Analyze failure rate
    const failureRate = migrations.filter((m) => m.status === "FAILED").length / migrations.length;
    if (failureRate > 0.1) {
      recommendations.push("High failure rate detected. Review validation procedures.");
    }

    // Analyze performance
    const avgDuration = migrations.reduce((sum, m) => sum + (m.scope?.actualDuration || 0), 0) / migrations.length;
    if (avgDuration > 3600000) {
      // 1 hour
      recommendations.push("Long migration durations detected. Consider batch size optimization.");
    }

    // Analyze rollback frequency
    const rollbackRate = migrations.filter((m) => m.type === "ROLLBACK").length / migrations.length;
    if (rollbackRate > 0.05) {
      recommendations.push("Frequent rollbacks detected. Enhance pre-migration validation.");
    }

    return recommendations;
  }

  private calculatePerformanceTrend(migrations: any[]): string {
    if (migrations.length < 2) return "insufficient_data";

    const recent = migrations.slice(-5);
    const older = migrations.slice(-10, -5);

    const recentAvg = recent.reduce((sum, m) => sum + (m.scope?.actualDuration || 0), 0) / recent.length;
    const olderAvg = older.reduce((sum, m) => sum + (m.scope?.actualDuration || 0), 0) / older.length;

    if (recentAvg < olderAvg * 0.9) return "improving";
    if (recentAvg > olderAvg * 1.1) return "degrading";
    return "stable";
  }

  private calculateFrequencyByMonth(migrations: any[]): Record<string, number> {
    const frequency = {};

    migrations.forEach((migration) => {
      const month = new Date(migration.timestamp).toISOString().substr(0, 7);
      frequency[month] = (frequency[month] || 0) + 1;
    });

    return frequency;
  }

  private analyzeErrorPatterns(migrations: any[]): any {
    const errorTypes = {};
    const errorMessages = {};

    migrations.forEach((migration) => {
      if (migration.results?.errors) {
        migration.results.errors.forEach((error) => {
          errorTypes[error.type] = (errorTypes[error.type] || 0) + 1;

          const shortMessage = error.message.substring(0, 50);
          errorMessages[shortMessage] = (errorMessages[shortMessage] || 0) + 1;
        });
      }
    });

    return {
      byType: errorTypes,
      commonMessages: Object.entries(errorMessages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([msg, count]) => ({ message: msg, count })),
    };
  }

  private async generateHTMLReport(report: any, filename: string): Promise<void> {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Migration Audit Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; }
        .metrics { display: flex; gap: 20px; }
        .metric { background: #e3f2fd; padding: 15px; border-radius: 5px; flex: 1; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .success { color: green; }
        .failed { color: red; }
        .warning { color: orange; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Migration Audit Report</h1>
        <p>Generated: ${report.generatedAt}</p>
    </div>
    
    <div class="section">
        <h2>Summary</h2>
        <div class="metrics">
            <div class="metric">
                <h3>Total Migrations</h3>
                <p>${report.summary.totalMigrations}</p>
            </div>
            <div class="metric">
                <h3>Success Rate</h3>
                <p>${((report.summary.successful / report.summary.totalMigrations) * 100).toFixed(1)}%</p>
            </div>
            <div class="metric">
                <h3>Failed</h3>
                <p class="failed">${report.summary.failed}</p>
            </div>
            <div class="metric">
                <h3>Rollbacks</h3>
                <p class="warning">${report.summary.rolledBack}</p>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Recent Migrations</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Status</th>
                <th>Environment</th>
                <th>Duration</th>
                <th>Items</th>
                <th>Errors</th>
            </tr>
            ${report.migrations
              .slice(-10)
              .map(
                (m) => `
            <tr>
                <td>${m.id}</td>
                <td>${new Date(m.timestamp).toLocaleString()}</td>
                <td>${m.type}</td>
                <td class="${m.status.toLowerCase()}">${m.status}</td>
                <td>${m.environment}</td>
                <td>${this.formatDuration(m.duration)}</td>
                <td>${m.itemsProcessed}</td>
                <td>${m.errorCount}</td>
            </tr>
            `
              )
              .join("")}
        </table>
    </div>
    
    <div class="section">
        <h2>Recommendations</h2>
        <ul>
            ${report.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
        </ul>
    </div>
</body>
</html>`;

    writeFileSync(filename, html);
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}
```

## 🔄 **Usage Examples**

### **Migration with Full Tracking**

```typescript
// Example usage in migration script
import { MigrationHistoryLogger } from "./lib/migration-history/migration-logger";
import { DataChangeTracker } from "./lib/migration-history/change-tracker";
import { MigrationAnalytics } from "./lib/migration-history/analytics";

async function runTrackedMigration() {
  const logger = new MigrationHistoryLogger();

  const migrationId = logger.startMigration({
    type: "FULL_MIGRATION",
    version: "1.0.0",
    executor: "admin",
    environment: "production",
    scope: {
      collections: ["products", "pages"],
      affectedItems: 150,
      estimatedDuration: 3600000, // 1 hour
    },
  });

  const changeTracker = new DataChangeTracker(migrationId);
  const analytics = new MigrationAnalytics(migrationId);

  try {
    logger.recordCheckpoint("VALIDATION_STARTED", "STARTED", 0);
    // Run validation...
    logger.recordCheckpoint("VALIDATION_COMPLETED", "COMPLETED", 0);

    logger.recordCheckpoint("PRODUCT_MIGRATION_STARTED", "STARTED", 0);
    // Migrate products with tracking...
    for (const product of products) {
      try {
        const result = await migrateProduct(product);
        logger.recordSuccess(product.id);
        changeTracker.recordCreate("products", result.id, result);
      } catch (error) {
        logger.recordFailure(product.id, error.message);
      }
    }
    logger.recordCheckpoint("PRODUCT_MIGRATION_COMPLETED", "COMPLETED", products.length);

    logger.completeMigration("backup_123");
    changeTracker.saveChangesToFile();

    const metrics = analytics.finalize(150, 147, 3);
    console.log("Migration metrics:", metrics);
  } catch (error) {
    logger.failMigration(error.message);
  }
}
```

---

**Document Created**: August 11, 2025  
**Status**: Complete Migration History & Tracking System  
**Coverage**: Full audit trail, change tracking, version control, analytics  
**Dependencies**: Git, Node.js file system APIs
