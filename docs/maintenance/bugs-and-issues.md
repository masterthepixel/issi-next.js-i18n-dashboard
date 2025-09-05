# PayloadCMS Implementation - Bugs & Issues (DO NOT DO)

## Critical Issues Encountered ❌

### 1. Revalidation Hook Errors
**Problem**: Next.js revalidation hooks failing during seeding operations
- `revalidatePath()` and `revalidateTag()` require Next.js request context
- Seeding scripts don't have access to Next.js runtime
- Caused 500 Internal Server errors and failed post creation

**Error Messages**:
```
Error: An error occurred while revalidating /posts/[slug]
Error: Route /posts/scalable-web-applications-javascript not found
```

**Root Cause**: Revalidation hooks (`revalidatePost`, `revalidateDelete`) trying to access Next.js cache outside of request context

**Solution Found**: Use `context: { disableRevalidate: true }` in payload operations during seeding

---

### 2. Collection Schema Mismatches
**Problem**: Validation errors due to missing or incorrect field references
- Posts collection missing `tags` field initially
- Author field validation failing due to wrong collection reference
- Meta field validation errors

**Error Messages**:
```
ValidationError: The following field is invalid: Authors
ValidationError: The following fields are invalid: Meta > Category, Meta > Author
```

**Root Cause**: 
- Posts collection didn't include tags relationship field
- Trying to reference non-existent user indices
- Incorrect field structure expectations

**Fix Applied**: Added tags field to Posts collection and corrected user references

---

### 3. TypeScript Import Issues
**Problem**: Module resolution errors when running seeding scripts
```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'payload.config.js'
```

**Root Cause**: Node.js doesn't handle TypeScript files natively
**Solution**: Use `npx tsx` instead of `node` for TypeScript execution

---

### 4. User Reference Errors
**Problem**: Attempting to reference non-existent users in author arrays
```
ValidationError: The following field is invalid: Authors
```

**Root Cause**: Seeding script tried to access `users.docs[2]` when only 2 users existed (indices 0-1)
**Fix**: Changed references to use existing user indices only

---

### 5. API Access Permissions
**Problem**: Unable to access API endpoints returning 500 errors
```
Invoke-WebRequest : The remote server returned an error: (500) Internal Server Error
```

**Root Cause**: Some API endpoints have authentication requirements or server errors from hook failures
**Resolution**: Server worked correctly after fixing hook bypass issues

---

## Anti-Patterns to Avoid 🚫

### 1. DON'T Run Seeding Without Hook Bypass
```javascript
// ❌ WRONG - Will cause revalidation errors
await payload.create({
  collection: 'posts',
  data: postData,
})

// ✅ CORRECT - Bypass revalidation during seeding
await payload.create({
  collection: 'posts',
  data: postData,
  context: { disableRevalidate: true }
})
```

### 2. DON'T Assume User Indices Exist
```javascript
// ❌ WRONG - May reference non-existent user
authors: [users.docs[2]?.id]  // When only 2 users exist

// ✅ CORRECT - Check array bounds or use modulo
authors: [users.docs[Math.min(userIndex, users.docs.length - 1)]?.id]
```

### 3. DON'T Forget Collection Dependencies
```javascript
// ❌ WRONG - Missing required field in collection
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
}
// Missing tags field!

// ✅ CORRECT - Include all required relationship fields
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
},
{
  name: 'tags',
  type: 'relationship', 
  relationTo: 'tags',
}
```

### 4. DON'T Use Node.js for TypeScript Files
```bash
# ❌ WRONG - Node.js can't handle .ts imports
node seed-script.mjs

# ✅ CORRECT - Use tsx for TypeScript support
npx tsx seed-script.mjs
```

### 5. DON'T Seed Collections Out of Order
```javascript
// ❌ WRONG - Posts depend on categories, users, and tags
seedPosts() // Fails if dependencies don't exist
seedCategories()
seedUsers()
seedTags()

// ✅ CORRECT - Seed dependencies first
seedCategories()
seedUsers() 
seedTags()
seedPosts() // Now has all required references
```

## Debugging Strategies That Worked 🔍

1. **Incremental Testing**: Test each collection separately
2. **Error Log Analysis**: Read full error messages for context clues
3. **API Verification**: Check data exists before referencing
4. **Hook Isolation**: Identify which hooks are causing issues
5. **TypeScript Debugging**: Use tsx instead of node for better error messages

## Never Do These Again ⛔

1. Run seeding without checking existing hook implementations
2. Reference array indices without bounds checking
3. Assume API endpoints work without authentication context
4. Skip validation of field relationships before seeding
5. Use Node.js directly for TypeScript configuration files
6. Create posts before ensuring all referenced collections exist
7. Ignore PayloadCMS validation errors - they always indicate real issues

## Time Savers for Future Projects ⏰

1. Always implement `disableRevalidate` context for seeding operations
2. Create a pre-seeding validation script to check dependencies
3. Use tsx by default for any PayloadCMS scripting
4. Implement bounds checking for all array access operations
5. Test API endpoints independently before bulk operations
