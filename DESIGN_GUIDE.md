# KanBan3D Design Guide

## Overview
This design guide outlines the visual language and implementation details for the KanBan3D application. Follow these specifications to maintain consistency across all interfaces and components.

---

## Color Palette

### Dark Mode (Default)
```css
/* Background Colors */
--bg-page: #0F1419;           /* Main page background - Dark Navy */
--bg-card: #151B28;           /* Card/Column backgrounds */
--bg-input: #1A2235;          /* Input fields, search bars */
--bg-elevated: #1D2538;       /* Elevated elements (modals, dropdowns) */

/* Brand Colors */
--color-primary: #5051F9;     /* Primary Purple - Main CTAs */
--color-secondary: #1EA7FF;   /* Cyan - Secondary actions */

/* Semantic Colors */
--color-success: #22C55E;     /* Green - Success states, high priority */
--color-warning: #F59E0B;     /* Orange - Warnings, medium priority */
--color-danger: #FF6B6B;      /* Red - Errors, low priority */

/* Text Colors */
--text-primary: #FFFFFF;      /* Primary text */
--text-secondary: #94A3B8;    /* Secondary text, labels */
--text-muted: #64748B;        /* Muted text, placeholders */

/* Border & Divider */
--border-color: #2D3748;      /* Borders, dividers */
```

### Light Mode
```css
/* Background Colors */
--bg-page: #FFFFFF;           /* Main page background - White */
--bg-card: #F4F7FE;           /* Card/Column backgrounds */
--bg-input: #EEEFF5;          /* Input fields */
--bg-elevated: #FFFFFF;       /* Elevated elements */

/* Text Colors */
--text-primary: #1E293B;      /* Primary text */
--text-secondary: #475569;    /* Secondary text */
--text-muted: #94A3B8;        /* Muted text */

/* Border & Divider */
--border-color: #E2E8F0;      /* Borders, dividers */
```

---

## Typography

### Font Families
```css
--font-primary: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
--font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Font Sizes
```css
--font-size-xs: 0.75rem;      /* 12px - Small labels */
--font-size-sm: 0.875rem;     /* 14px - Body text */
--font-size-base: 1rem;       /* 16px - Base size */
--font-size-lg: 1.125rem;     /* 18px - Headings */
--font-size-xl: 1.25rem;      /* 20px - Large headings */
--font-size-2xl: 1.5rem;      /* 24px - Page titles */
```

---

## Spacing System
Use the 8px grid system for consistent spacing:

```css
--spacing-xs: 0.25rem;        /* 4px */
--spacing-sm: 0.5rem;         /* 8px */
--spacing-md: 1rem;           /* 16px */
--spacing-lg: 1.5rem;         /* 24px */
--spacing-xl: 2rem;           /* 32px */
--spacing-2xl: 3rem;          /* 48px */
```

---

## 3D Effects & Shadows

### Neumorphic Shadows
The app uses neumorphic design with dual shadows for depth:

```css
/* Raised Elements (Default State) */
box-shadow: 
  8px 8px 16px var(--neu-shadow-dark),    /* Dark shadow - bottom right */
  -8px -8px 16px var(--neu-shadow-light);  /* Light shadow - top left */

/* Dark Mode Shadow Colors */
--neu-shadow-light: #1D2538;  /* Lighter than background */
--neu-shadow-dark: #080A0F;   /* Darker than background */

/* Hover State */
box-shadow: 
  12px 12px 24px var(--neu-shadow-dark),
  -12px -12px 24px var(--neu-shadow-light);

/* Pressed State */
box-shadow: 
  inset 4px 4px 8px var(--neu-shadow-dark),
  inset -4px -4px 8px var(--neu-shadow-light);
```

### Card 3D Effect (Task Cards)
Hybrid shadow system combining inset highlights with drop shadows:

```css
box-shadow:
  /* Inset highlights - simulate light reflection */
  inset 1px 1px 2px rgba(255, 255, 255, 0.05),
  inset -1px -1px 2px rgba(0, 0, 0, 0.3),
  
  /* Drop shadow - creates depth */
  0 4px 12px rgba(0, 0, 0, 0.15),
  0 2px 4px rgba(0, 0, 0, 0.1);
```

---

## Premium Glow Effect

### Implementation
The signature glow effect uses three-layer radial gradients with backdrop blur:

#### Layer Structure
```css
/* Container Setup */
position: relative;
overflow: hidden;
backdrop-filter: blur(10px);
```

#### Glow Layers (Purple Theme)
```css
/* Outer Glow - Widest, most subtle */
.glow-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 150%;
  background: radial-gradient(
    ellipse at center,
    rgba(140, 100, 230, 0.6) 0%,
    rgba(100, 60, 200, 0.35) 40%,
    transparent 70%
  );
  filter: blur(20px);
  pointer-events: none;
}

/* Inner Glow - Medium intensity */
.glow-inner {
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 80%;
  background: radial-gradient(
    ellipse at center,
    rgba(160, 120, 255, 0.7) 0%,
    rgba(130, 90, 220, 0.5) 30%,
    transparent 60%
  );
  filter: blur(25px);
  pointer-events: none;
}

/* Center Glow - Brightest, smallest */
.glow-center {
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  height: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(180, 150, 255, 0.55) 0%,
    transparent 50%
  );
  filter: blur(15px);
  pointer-events: none;
}
```

#### Button Background Gradient
```css
background: linear-gradient(
  135deg,
  rgba(80, 81, 249, 0.9) 0%,
  rgba(100, 70, 230, 0.85) 100%
);
```

#### Box Shadow Glow
```css
/* Default State */
box-shadow: 
  0 0 30px rgba(80, 81, 249, 0.18),
  0 0 60px rgba(100, 70, 230, 0.08);

/* Hover State */
box-shadow: 
  0 0 40px rgba(80, 81, 249, 0.25),
  0 0 80px rgba(100, 70, 230, 0.12);

/* Active/Pressed State */
box-shadow: 
  0 0 20px rgba(80, 81, 249, 0.15),
  0 0 40px rgba(100, 70, 230, 0.06);
```

#### Text Glow
```css
text-shadow: 
  0 0 20px rgba(255, 255, 255, 0.3),
  0 0 40px rgba(160, 120, 255, 0.2);
```

### Color Variants

#### Green Glow (Success/High Priority)
```css
/* Radial gradients */
rgba(34, 197, 94, 0.6)  /* Outer */
rgba(34, 197, 94, 0.7)  /* Inner */
rgba(34, 197, 94, 0.5)  /* Center */

/* Box shadow */
box-shadow: 
  0 0 20px rgba(34, 197, 94, 0.25),
  0 0 40px rgba(34, 197, 94, 0.15);
```

#### Orange Glow (Warning/Medium Priority)
```css
/* Radial gradients */
rgba(245, 158, 11, 0.6)  /* Outer */
rgba(245, 158, 11, 0.7)  /* Inner */
rgba(245, 158, 11, 0.5)  /* Center */

/* Box shadow */
box-shadow: 
  0 0 20px rgba(245, 158, 11, 0.25),
  0 0 40px rgba(245, 158, 11, 0.15);
```

#### Red Glow (Danger/Low Priority)
```css
/* Radial gradients */
rgba(255, 107, 107, 0.6)  /* Outer */
rgba(255, 107, 107, 0.7)  /* Inner */
rgba(255, 107, 107, 0.5)  /* Center */

/* Box shadow */
box-shadow: 
  0 0 20px rgba(255, 107, 107, 0.25),
  0 0 40px rgba(255, 107, 107, 0.15);
```

---

## Border Radius

```css
--radius-sm: 0.375rem;        /* 6px - Small elements */
--radius-md: 0.5rem;          /* 8px - Default radius */
--radius-lg: 0.75rem;         /* 12px - Cards */
--radius-xl: 1rem;            /* 16px - Large containers */
--radius-full: 9999px;        /* Fully rounded (pills, avatars) */
```

---

## Transitions & Animations

### Standard Transitions
```css
--transition-base: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
--transition-fast: 150ms ease-in-out;
```

### Common Animations
```css
/* Hover Scale */
transition: transform var(--transition-base);
transform: scale(1.02);

/* Glow Intensity */
transition: box-shadow var(--transition-base);

/* Theme Toggle Knob */
transition: 
  transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
  background-color 300ms ease;
```

### Reduced Motion
Always respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Guidelines

### Primary Button
- **Size**: `height: 2.5rem` (40px), `padding: 0 1.5rem`
- **Typography**: `font-weight: 600`, `font-size: 0.875rem`
- **Border Radius**: `var(--radius-lg)` (12px)
- **3D Effect**: Three-layer glow + backdrop blur + box shadow glow
- **Hover**: Scale 1.02, increase glow opacity by ~40%
- **Active**: Scale 0.98, reduce glow opacity by ~50%

### Task Card
- **Background**: `var(--bg-card)` with hybrid inset + drop shadows
- **Border Radius**: `var(--radius-lg)` (12px)
- **Padding**: `1rem` (16px)
- **Hover**: Lift effect with increased shadow
- **Drag State**: Reduced opacity (0.5), ghost appearance

### Priority Tags
- **Size**: Small inline pills with glow effect
- **Border Radius**: `var(--radius-full)` (fully rounded)
- **Padding**: `0.25rem 0.75rem`
- **Colors**: Red (Low), Orange (Medium), Green (High)
- **Effect**: Color-coded glow matching priority color

### Kanban Columns
- **Background**: `var(--bg-card)`
- **Border Radius**: `var(--radius-xl)` (16px)
- **Padding**: `1.5rem` (24px)
- **Min Width**: `280px`
- **Gap**: `1rem` between cards

### Theme Toggle
- **Size**: `width: 3.5rem`, `height: 2rem`
- **Border Radius**: `9999px` (pill shape)
- **Knob**: Circular, slides with 300ms cubic-bezier
- **Glow**: Subtle purple glow (0.12/0.18 opacity)
- **Icons**: Sun (☀️) for light, Moon (🌙) for dark
- **Knob Colors**: Gold (#FFB800) in light, Blue (#64B5F6) in dark

---

## Z-Index System

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

---

## Implementation Checklist

When implementing this design system:

✅ **Colors**
- [ ] Use CSS custom properties for all colors
- [ ] Implement both light and dark themes
- [ ] Add `[data-theme="light"]` and `[data-theme="dark"]` selectors

✅ **3D Effects**
- [ ] Apply neumorphic shadows to raised elements
- [ ] Use hybrid inset + drop shadows for cards
- [ ] Implement three-layer glow for premium buttons

✅ **Glow System**
- [ ] Create three pseudo-elements (::before with glow layers)
- [ ] Add backdrop-filter: blur(10px) to button container
- [ ] Use radial gradients with progressive opacity
- [ ] Apply box-shadow glow (two layers)
- [ ] Add text-shadow for glowing text

✅ **Typography**
- [ ] Import DM Sans and Inter fonts
- [ ] Use font-weight: 600 for buttons
- [ ] Apply appropriate font sizes from scale

✅ **Spacing**
- [ ] Follow 8px grid system
- [ ] Use spacing variables consistently

✅ **Accessibility**
- [ ] Support prefers-reduced-motion
- [ ] Ensure proper color contrast (WCAG AA minimum)
- [ ] Add ARIA labels where needed
- [ ] Support keyboard navigation

✅ **Theme Persistence**
- [ ] Store theme preference in localStorage
- [ ] Check system preference as fallback
- [ ] Apply theme on page load before render

---

## Code Example: Premium Button

```jsx
// Button.jsx
import { useState } from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`neu-button neu-button--${variant}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      {...props}
    >
      {variant === 'primary' && (
        <>
          <div className="neu-button__glow-outer" />
          <div className="neu-button__glow-inner" />
          <div className="neu-button__glow-center" />
        </>
      )}
      <span className="neu-button__content">{children}</span>
    </button>
  );
}
```

```css
/* Button.css */
.neu-button--primary {
  position: relative;
  overflow: hidden;
  padding: 0 1.5rem;
  height: 2.5rem;
  border: none;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(80, 81, 249, 0.9) 0%, rgba(100, 70, 230, 0.85) 100%);
  color: white;
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 30px rgba(80, 81, 249, 0.18),
    0 0 60px rgba(100, 70, 230, 0.08);
  transition: 
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.neu-button--primary:hover {
  box-shadow: 
    0 0 40px rgba(80, 81, 249, 0.25),
    0 0 80px rgba(100, 70, 230, 0.12);
}

.neu-button--primary:active {
  transform: scale(0.98) !important;
  box-shadow: 
    0 0 20px rgba(80, 81, 249, 0.15),
    0 0 40px rgba(100, 70, 230, 0.06);
}

.neu-button__content {
  position: relative;
  z-index: 1;
  text-shadow: 
    0 0 20px rgba(255, 255, 255, 0.3),
    0 0 40px rgba(160, 120, 255, 0.2);
}

/* Glow layers - see Premium Glow Effect section above */
```

---

## Resources

### Recommended Tools
- **Color Picker**: Use browser DevTools eyedropper for exact color matching
- **Shadow Generator**: [shadows.brumm.af](https://shadows.brumm.af)
- **Gradient Editor**: [cssgradient.io](https://cssgradient.io)
- **Font Pairing**: DM Sans (headings/UI) + Inter (body text)

### Browser Support
- Chrome/Edge 88+
- Firefox 103+
- Safari 15.4+
- Requires `backdrop-filter` support

---

## Notes

- All measurements use `rem` units for accessibility (respects user font size preferences)
- Glow effects are positioned using absolute positioning with percentage-based transforms
- Theme switching uses CSS custom property reassignment via `[data-theme]` attribute
- Backdrop blur may have performance implications on lower-end devices
- Always test glow effects on both light and dark backgrounds

---

**Version**: 1.0  
**Last Updated**: December 4, 2025  
**Maintained by**: KanBan3D Design Team
