# ESLint Warnings Resolution Guide

This technical guide provides step-by-step instructions for resolving the ESLint warnings in the ISSI Next.js Multilingual Website codebase.

## 1. Fixing Unused Variables

### Problem

Variables and function parameters defined but never used in the code.

### Solution

Prefix all unused variables with an underscore to indicate they're intentionally unused.

### Implementation Steps

1. **Function Parameters**:

   ```typescript
   // Before
   function handleClick(event) {
     console.log('Clicked');
   }

   // After
   function handleClick(_event) {
     console.log('Clicked');
   }
   ```

2. **Destructured Props**:

   ```typescript
   // Before
   export default function Component({ title, description, color }) {
     return <div>{title}</div>; // description and color unused
   }

   // After
   export default function Component({ title, _description, _color }) {
     return <div>{title}</div>;
   }
   ```

3. **Interface Methods**:

   ```typescript
   // Before
   interface FormatterService {
     formatMessage(key: string, params: any): string;
     formatDate(date: Date, options: any): string;
   }

   // After
   interface FormatterService {
     formatMessage(_key: string, _params: any): string;
     formatDate(_date: Date, _options: any): string;
   }
   ```

## 2. Converting `let` to `const`

### Problem

Variables declared with `let` but never reassigned.

### Solution

Use `const` for all variables that don't need reassignment.

### Implementation Steps

1. **Simple Variables**:

   ```typescript
   // Before
   let mouseX = useMotionValue(0);
   let mouseY = useMotionValue(0);

   // After
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);
   ```

2. **Computed Values**:

   ```typescript
   // Before
   let left = event.clientX - rect.left;
   let top = event.clientY - rect.top;
   
   // After
   const left = event.clientX - rect.left;
   const top = event.clientY - rect.top;
   ```

## 3. Fixing React Hooks Dependency Arrays

### Problem

Incomplete dependency arrays in `useEffect`, `useCallback`, and other hooks.

### Solution

Add all referenced variables to dependency arrays.

### Implementation Steps

1. **useEffect**:

   ```typescript
   // Before
   useEffect(() => {
     setPoints(pointsData);
     setArcs(arcs);
   }, []); // Missing dependencies

   // After
   useEffect(() => {
     setPoints(pointsData);
     setArcs(arcs);
   }, [pointsData, arcs]);
   ```

2. **useCallback**:

   ```typescript
   // Before
   const handleGlobeClick = useCallback((coords) => {
     if (isNearHeadquarters(coords, headquarters)) {
       setSelectedLocation('HQ');
     }
   }, []); // Missing dependency

   // After
   const handleGlobeClick = useCallback((coords) => {
     if (isNearHeadquarters(coords, headquarters)) {
       setSelectedLocation('HQ');
     }
   }, [headquarters]);
   ```

3. **Using useMemo to Fix Array Dependencies**:

   ```typescript
   // Before
   const pointsData = locations.map(loc => ({
     lat: loc.latitude,
     lng: loc.longitude,
     color: loc.color
   }));
   
   useEffect(() => {
     globeRef.current.pointsData(pointsData);
   }, [globeRef]); // pointsData recreated every render

   // After
   const pointsData = useMemo(() => 
     locations.map(loc => ({
       lat: loc.latitude,
       lng: loc.longitude,
       color: loc.color
     }))
   , [locations]);
   
   useEffect(() => {
     globeRef.current.pointsData(pointsData);
   }, [globeRef, pointsData]);
   ```

## 4. Adding Proper React Imports

### Problem

TypeScript files using React types or JSX without importing React.

### Solution

Add `import React from 'react';` to all relevant files.

### Implementation Steps

1. **Type Definition Files**:

   ```typescript
   // Before
   export interface ComponentProps {
     children: React.ReactNode;
     className?: string;
   }

   // After
   import React from 'react';
   
   export interface ComponentProps {
     children: React.ReactNode;
     className?: string;
   }
   ```

2. **Component Files**:

   ```typescript
   // Before
   export default function MyComponent({ children }: { children: React.ReactNode }) {
     return <div>{children}</div>;
   }

   // After
   import React from 'react';
   
   export default function MyComponent({ children }: { children: React.ReactNode }) {
     return <div>{children}</div>;
   }
   ```

## Recommended Approach

To effectively address all ESLint warnings:

1. **Start with Type Files**: Fix the core type definitions first since they affect many components.
2. **Fix Components by Category**: Address similar components together (e.g., all globe-related components).
3. **Run Incremental Checks**: Use `pnpm lint -- --quiet` periodically to check progress.
4. **Documentation**: Document complex fixes in code comments where necessary.

This methodical approach will gradually improve code quality while maintaining application functionality.
