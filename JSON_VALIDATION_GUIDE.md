# JSON Validation and Linting Guide

This document explains the JSON validation and linting rules implemented to prevent JSON syntax errors like the one encountered with structured data schemas.

## Overview

We've implemented a comprehensive validation system that includes:

1. **ESLint Rules** - Prevent common JavaScript/TypeScript issues that can lead to JSON problems
2. **JSON Validation Script** - Custom validation for JSON files and structured data
3. **Pre-commit Hooks** - Automatic validation before code commits
4. **VS Code Integration** - Real-time validation and formatting

## ESLint Rules Added

### Core JSON Safety Rules

- `no-invalid-regexp`: Prevents invalid regular expressions that could break JSON
- `no-irregular-whitespace`: Catches problematic whitespace characters
- `no-useless-escape`: Warns about unnecessary escape characters
- `no-template-curly-in-string`: Prevents template literal syntax in regular strings

### Object and String Safety

- `quote-props`: Ensures consistent property quoting in objects
- `object-curly-spacing`: Maintains consistent spacing in object literals
- `comma-dangle`: Prevents trailing commas that break JSON

### Runtime Error Prevention

- `no-unsafe-optional-chaining`: Prevents optional chaining that could cause runtime errors
- `eqeqeq`: Enforces strict equality to prevent type coercion issues

## JSON Validation Script

The custom validation script (`scripts/validate-json.js`) performs:

### Automatic Checks

- **JSON Syntax Validation**: Parses all JSON files to catch syntax errors
- **Structured Data Schema Validation**: Validates Schema.org structured data
- **Character Validation**: Detects problematic characters like unescaped `#`, quotes, or whitespace
- **Trailing Comma Detection**: Finds trailing commas that break JSON parsing

### Files Validated

- All language files (`src/lang/*.json`)
- Package configuration files
- Pages with structured data schemas
- Component files with JSON operations

## Pre-commit Hooks

The system automatically runs validation before each commit:

```bash
# Runs automatically on git commit
npm run pre-commit

# Manual execution
npm run validate:json
npm run lint
```

## VS Code Integration

### Settings Applied

- **Format on Save**: Automatically formats JSON and TypeScript files
- **ESLint Integration**: Real-time linting with auto-fix
- **JSON Validation**: Built-in JSON syntax checking
- **Problem Highlighting**: Visual indicators for errors and warnings

### Recommended Extensions

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- JSON Tools (eriklynd.json-tools)

## Common Issues Prevented

### 1. Street Address Characters

**Problem**: `"streetAddress": "7337 Hanover Pkwy, Suite# A"`
**Solution**: Use `"Suite A"` instead of `"Suite# A"`

**Explanation**: The `#` character can cause JSON parsing issues in some environments and should be avoided in address strings. This was resolved across all language files (`en.json`, `fr.json`, `es.json`) by replacing "Suite# A" with "Suite A".

**Status**: ✅ **RESOLVED** - All instances fixed as of 2025-07-01

### 2. Unescaped Quotes

**Problem**: `"description": "ISSI's award-winning software"`
**Solution**: `"description": "ISSI's award-winning software"` or escape properly

### 3. Trailing Commas

**Problem**:

```json
{
  "name": "ISSI",
  "type": "Organization",  // <- Trailing comma
}
```

**Solution**: Remove the trailing comma

### 4. Template Literals in JSON

**Problem**: Using template literals where JSON strings are expected
**Solution**: Use proper string concatenation or JSON.stringify

## Running Validations

### During Development

```bash
# Run JSON validation only
npm run validate:json

# Run all linting
npm run lint

# Run both (pre-commit check)
npm run pre-commit
```

### In CI/CD Pipeline

The build process now includes validation:

```bash
npm run build  # Automatically runs validate:json first
```

### Manual Debugging

Use the VS Code debugger with the "Validate JSON" configuration to step through validation logic.

## Best Practices

### 1. Structured Data Schemas

- Always include `@context` and `@type` properties
- Use consistent property naming
- Validate against Schema.org standards
- Avoid special characters in address fields

### 2. JSON Files

- Use double quotes for all strings
- No trailing commas
- Proper escaping of special characters
- Consistent formatting

### 3. Code Quality

- Use TypeScript for type safety
- Validate JSON.stringify inputs
- Handle potential parsing errors
- Use const assertions for schema objects

## Troubleshooting

### Common Validation Errors

1. **"Unexpected non-whitespace character after JSON"**
   - Check for trailing commas
   - Verify proper JSON syntax
   - Look for unescaped characters

2. **"Missing required property"**
   - Ensure all required schema properties are present
   - Check property name spelling

3. **"Problematic character detected"**
   - Replace `#` with proper alternatives
   - Escape quotes and special characters
   - Remove or escape whitespace characters

### Getting Help

1. Check the validation output for specific line numbers
2. Use VS Code's JSON validation features
3. Run the validation script with debugging enabled
4. Review the ESLint output for detailed error messages

## Configuration Files

- **ESLint**: `.eslintrc.json` and `eslint.config.js`
- **Validation Script**: `scripts/validate-json.js`
- **Git Hooks**: `.husky/pre-commit`
- **VS Code**: `.vscode/settings.json` and `.vscode/launch.json`
- **Package Scripts**: `package.json`

This comprehensive system ensures that JSON-related errors are caught early in the development process, preventing runtime issues and improving code quality.
