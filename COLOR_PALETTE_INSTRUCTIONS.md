# Next.js Text Color Instructions – Light & Dark Mode

## Color Palette

### Light Mode

- **Primary Text:** #0f172a (`slate-900`)
- **Secondary Text:** #334155 (`slate-700`)
- **Muted Text:** #64748b (`slate-500`)

### Dark Mode

- **Primary Text:** #ffffff (`white`)
- **Secondary Text:** #f8fafc (`slate-50`)
- **Muted Text:** #e2e8f0 (`slate-200`)

---

## Tailwind CSS Implementation (Recommended)

**1. Use Tailwind’s built-in slate palette and dark mode classes:**

```jsx
<h1 className="text-slate-900 dark:text-white">Heading</h1>
<p className="text-slate-700 dark:text-slate-50">Body text</p>
<span className="text-slate-500 dark:text-slate-200">Muted text</span>
```

**2. For backgrounds and containers:**

```jsx
<div className="bg-white dark:bg-slate-900">...</div>
```

**3. For your TeamGrid and other components, update classes as follows:**

- Headings: `text-slate-900 dark:text-white`
- Subheadings: `text-slate-700 dark:text-slate-50`
- Muted/secondary: `text-slate-500 dark:text-slate-200`
- Card backgrounds: `bg-slate-50 dark:bg-slate-800`

---

## Optional: Custom Properties (CSS Variables)

If you want to use CSS variables for more flexibility, add to your `globals.css`:

```css
:root {
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --text-muted: #64748b;
}
[data-theme="dark"] {
  --text-primary: #ffffff;
  --text-secondary: #f8fafc;
  --text-muted: #e2e8f0;
}
```

Then use utility classes or inline styles:

```jsx
<h1 style={{ color: 'var(--text-primary)' }}>Heading</h1>
```

---

## Accessibility

- All color combinations meet WCAG AA contrast standards.
- Test both modes using browser dev tools and accessibility checkers.

---

## Summary

- Use Tailwind’s `slate` color classes with `dark:` variants for all text and backgrounds.
- For custom needs, use CSS variables as shown above.
- Always test for accessibility and consistency.

This approach will ensure your app’s typography and backgrounds are visually consistent and accessible in both light and dark modes, following your specified color palette.
