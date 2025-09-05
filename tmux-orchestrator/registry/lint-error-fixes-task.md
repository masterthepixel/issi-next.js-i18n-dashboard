# Lint Error Fixes - ISSI Project

## Task Assignment: July 24, 2025

### 🎯 **PRIORITY: HIGH - Build Quality Gate**

The production build has **80+ lint warnings** that need immediate resolution to maintain code quality standards.

---

## 📋 **Task Categories**

### **FRONTEND AGENT (Window 1) - React Components & UI**

**Files to Fix:**

- `./src/components/GeoGlobe.tsx` (3 warnings)
- `./src/components/GeoGlobeInspira.tsx` (1 warning)
- `./src/components/Globe/DataGlobe.clean.tsx` (1 warning)
- `./src/components/Globe/DataGlobe.tsx` (1 warning)
- `./src/components/Globe/MiniDataGlobe.clean.tsx` (1 warning)
- `./src/components/Globe/MiniDataGlobe.tsx` (1 warning)
- `./src/components/HomePageGlobalHero.tsx` (3 warnings)
- `./src/components/ui/` directory (20+ files with prefer-const and unused vars)

**Specific Tasks:**

1. **React Hooks Dependencies**: Fix missing dependencies in useEffect/useCallback
2. **Unused Variables**: Add underscore prefix or remove unused variables
3. **Prefer Const**: Change `let` to `const` for non-reassigned variables
4. **Globe Components**: Clean up unused autoRotate, size parameters

---

### **QA AGENT (Window 3) - Validation & Testing**

**Responsibility:**

1. **Test After Each Fix**: Ensure no functionality is broken
2. **Run Validation Commands**:
   ```bash
   pnpm lint
   pnpm build
   npm run test:products:all
   ```
3. **Verify 90-URL Testing**: Ensure all product pages still work
4. **Document Results**: Track which fixes resolve which warnings

---

### **PROJECT MANAGER (Window 6) - Coordination**

**Tasks:**

1. **Track Progress**: Monitor completion of each category
2. **Quality Gates**: Ensure zero lint warnings before completion
3. **Git Discipline**: Coordinate 30-minute commits during work
4. **Final Validation**: Run complete build and test suite

---

## 🔧 **Technical Solutions**

### **Unused Variables Fix Pattern:**

```typescript
// Before:
const [data, setData] = useState(null);
const handleClick = (event, index) => { ... };

// After:
const [data, setData] = useState(null);
const handleClick = (event, _index) => { ... };
// OR remove if truly unused
```

### **React Hooks Dependencies:**

```typescript
// Before:
useEffect(() => {
  // uses arcs, pointsData
}, []);

// After:
useEffect(() => {
  // uses arcs, pointsData
}, [arcs, pointsData]);
```

### **Prefer Const:**

```typescript
// Before:
let mouseX = transform.x;
let mouseY = transform.y;

// After:
const mouseX = transform.x;
const mouseY = transform.y;
```

---

## 📚 Quality Standards & Documentation References

**Before starting lint fixes, review these documentation resources:**

- **[DOCUMENTATION_INDEX.md](../docs/DOCUMENTATION_INDEX.md)** - Master documentation index
- **[COMPONENT_DEVELOPMENT_GUIDE.md](../docs/COMPONENT_DEVELOPMENT_GUIDE.md)** - Code quality standards and patterns
- **[NEXTJS_15_COMPATIBILITY.md](../docs/NEXTJS_15_COMPATIBILITY.md)** - Framework-specific requirements
- **[SHADCN_MIGRATION_LESSONS.md](../docs/SHADCN_MIGRATION_LESSONS.md)** - Quality lessons from migration

**All fixes must comply with established patterns documented in COMPONENT_DEVELOPMENT_GUIDE.md**

---

## ⏰ **Timeline**

- **Start**: Immediate
- **Target Completion**: 2 hours
- **Quality Check**: 30 minutes
- **Final Validation**: 30 minutes

## 🎯 **Success Criteria**

- ✅ Zero lint warnings in build output
- ✅ All 90 product URLs still working
- ✅ No TypeScript compilation errors
- ✅ All tests passing
- ✅ Build completes successfully

---

## 📞 **Communication Protocol**

Use structured status updates every 30 minutes:

```
STATUS [Agent-Name] [Time]
Completed: [Files fixed / warnings resolved]
Current: [Working on specific file/warning type]
Blocked: [Any issues or dependencies]
ETA: [Expected completion time]
```
