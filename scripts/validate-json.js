#!/usr/bin/env node

/**
 * JSON Validation Script
 * Validates JSON structures and structured data schemas to prevent runtime errors
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Validate JSON string for common syntax issues
 */
function validateJsonString(jsonString, filename) {
  const issues = [];
  
  try {
    // Try to parse the JSON
    JSON.parse(jsonString);
  } catch (error) {
    issues.push({
      type: 'syntax',
      message: `JSON syntax error: ${error.message}`,
      line: getLineFromError(error, jsonString)
    });
  }
  
  // Check for common problematic characters
  const lines = jsonString.split('\n');
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check for unescaped special characters in string values
    if (line.includes('"') && line.includes('#') && line.includes('Suite')) {
      issues.push({
        type: 'warning',
        message: 'Street address contains "#" character which may cause JSON parsing issues',
        line: lineNum,
        suggestion: 'Consider using "Suite" instead of "Suite#"'
      });
    }
    
    // Check for unescaped newlines or tabs
    if (line.includes('\\n') || line.includes('\\t') || line.includes('\\r')) {
      issues.push({
        type: 'warning',
        message: 'String contains escaped whitespace characters',
        line: lineNum,
        suggestion: 'Ensure proper escaping in JSON strings'
      });
    }
    
    // Check for trailing commas (common issue)
    if (line.trim().endsWith(',}') || line.trim().endsWith(',]')) {
      issues.push({
        type: 'error',
        message: 'Trailing comma detected',
        line: lineNum,
        suggestion: 'Remove trailing comma before closing bracket'
      });
    }
  });
  
  return issues;
}

/**
 * Extract line number from JSON parse error
 */
function getLineFromError(error, jsonString) {
  const match = error.message.match(/position (\d+)/);
  if (match) {
    const position = parseInt(match[1]);
    const lines = jsonString.substring(0, position).split('\n');
    return lines.length;
  }
  return null;
}

/**
 * Validate structured data schema
 */
function validateStructuredDataSchema(schemaObj, filename) {
  const issues = [];
  
  if (!schemaObj['@context']) {
    issues.push({
      type: 'error',
      message: 'Missing required "@context" property in structured data schema',
      suggestion: 'Add "@context": "https://schema.org"'
    });
  }
  
  if (!schemaObj['@type']) {
    issues.push({
      type: 'error',
      message: 'Missing required "@type" property in structured data schema',
      suggestion: 'Add "@type" property (e.g., "Organization", "LocalBusiness")'
    });
  }
  
  // Validate Organization schema
  if (schemaObj['@type'] === 'Organization') {
    if (!schemaObj.name) {
      issues.push({
        type: 'warning',
        message: 'Organization schema missing "name" property'
      });
    }
    if (!schemaObj.url) {
      issues.push({
        type: 'warning',
        message: 'Organization schema missing "url" property'
      });
    }
  }
  
  // Validate LocalBusiness schema
  if (schemaObj['@type'] === 'LocalBusiness') {
    if (!schemaObj.address) {
      issues.push({
        type: 'warning',
        message: 'LocalBusiness schema missing "address" property'
      });
    }
    if (!schemaObj.telephone) {
      issues.push({
        type: 'warning',
        message: 'LocalBusiness schema missing "telephone" property'
      });
    }
  }
  
  return issues;
}

/**
 * Validate TypeScript/JavaScript files for JSON-related issues
 */
function validateTsJsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for JSON.stringify calls with potentially problematic data
  const jsonStringifyRegex = /JSON\.stringify\s*\(\s*([^)]+)\s*\)/g;
  let match;
  
  while ((match = jsonStringifyRegex.exec(content)) !== null) {
    const jsonStringifyCall = match[0];
    const argument = match[1];
    
    // Check if the argument contains structured data schemas
    if (argument.includes('Schema') || argument.includes('@context') || argument.includes('@type')) {
      // Extract the line number
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      issues.push({
        type: 'info',
        message: 'JSON.stringify call detected with structured data',
        line: lineNumber,
        suggestion: 'Ensure the data being stringified is valid JSON'
      });
    }
  }
  
  // Check for structured data schema definitions
  const schemaRegex = /const\s+(\w*[Ss]chema\w*)\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
  
  while ((match = schemaRegex.exec(content)) !== null) {
    const schemaName = match[1];
    const schemaContent = match[2];
    
    try {
      // Try to evaluate the schema object (basic validation)
      if (schemaContent.includes('@context') && schemaContent.includes('@type')) {
        // Schema looks valid
        const beforeMatch = content.substring(0, match.index);
        const lineNumber = beforeMatch.split('\n').length;
        
        issues.push({
          type: 'info',
          message: `Structured data schema '${schemaName}' found`,
          line: lineNumber,
          suggestion: 'Validate schema properties according to schema.org standards'
        });
      }
    } catch (error) {
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      issues.push({
        type: 'warning',
        message: `Potential issue in schema '${schemaName}': ${error.message}`,
        line: lineNumber
      });
    }
  }
  
  return issues;
}

/**
 * Main validation function
 */
function validateProject() {
  log('cyan', '🔍 Starting JSON and Structured Data validation...\n');
  
  let totalIssues = 0;
  let totalFiles = 0;
  
  // Validate JSON files
  const jsonFiles = [
    'src/lang/en.json',
    'src/lang/fr.json',
    'src/lang/es.json',
    'package.json'
  ];
  
  jsonFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      totalFiles++;
      log('blue', `📄 Validating ${filePath}...`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      const issues = validateJsonString(content, filePath);
      
      if (issues.length === 0) {
        log('green', '  ✅ No issues found');
      } else {
        issues.forEach(issue => {
          totalIssues++;
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          const color = issue.type === 'error' ? 'red' : issue.type === 'warning' ? 'yellow' : 'cyan';
          
          log(color, `  ${icon} Line ${issue.line || '?'}: ${issue.message}`);
          if (issue.suggestion) {
            log('magenta', `      💡 ${issue.suggestion}`);
          }
        });
      }
      console.log();
    }
  });
  
  // Validate TypeScript/JavaScript files with structured data
  const tsFiles = [
    'src/app/[lang]/about/page.tsx',
    'src/app/[lang]/products/page.tsx',
    'src/app/[lang]/services/page.tsx'
  ];
  
  tsFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      totalFiles++;
      log('blue', `📄 Validating ${filePath}...`);
      
      const issues = validateTsJsFile(filePath);
      
      if (issues.length === 0) {
        log('green', '  ✅ No issues found');
      } else {
        issues.forEach(issue => {
          if (issue.type !== 'info') totalIssues++;
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          const color = issue.type === 'error' ? 'red' : issue.type === 'warning' ? 'yellow' : 'cyan';
          
          log(color, `  ${icon} Line ${issue.line || '?'}: ${issue.message}`);
          if (issue.suggestion) {
            log('magenta', `      💡 ${issue.suggestion}`);
          }
        });
      }
      console.log();
    }
  });
  
  // Summary
  log('cyan', '📊 Validation Summary:');
  log('blue', `   Files checked: ${totalFiles}`);
  
  if (totalIssues === 0) {
    log('green', '   ✅ No issues found! All JSON structures are valid.');
  } else {
    log('yellow', `   ⚠️  Total issues found: ${totalIssues}`);
    log('magenta', '   💡 Please review and fix the issues above.');
  }
  
  console.log();
  
  // Exit with error code if there are critical issues
  const hasErrors = totalIssues > 0;
  if (hasErrors) {
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  validateProject();
}

module.exports = { validateProject, validateJsonString, validateStructuredDataSchema };
