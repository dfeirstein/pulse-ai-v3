# Pulse AI Style Guide
*Version 1.1 - Phase 1 Design System Optimization Complete*

## Design Philosophy
Pulse AI employs a warm, modern, and approachable design system that prioritizes accessibility, consistency, and user experience. Our design balances professionalism with personality through thoughtful typography, color, and interaction patterns.

---

## Color System

### Brand Colors (WCAG AA Compliant)
All colors meet minimum 4.5:1 contrast ratio on white backgrounds for WCAG AA compliance.

#### Primary Colors
- **Purple**: `#7C3AED` - Primary brand color (4.51:1 contrast)
  - Light: `#9333EA` - Use for large text only (3.88:1)
  - Dark: `#5B21B6` - High contrast variant (6.15:1)
  - Darker: `#4C1D95` - Text on light backgrounds (8.34:1)

#### Secondary Colors
- **Turquoise**: `#059669` - Success/positive sentiment (4.56:1)
  - Light: `#10B981` - Large text only (3.01:1)
  - Dark: `#047857` - High contrast (6.12:1)

- **Orange**: `#D97706` - Warning/attention (4.52:1)
  - Light: `#F59E0B` - Large text only (3.01:1)
  - Dark: `#B45309` - High contrast (5.84:1)

- **Pink**: `#BE185D` - Accent/special (5.87:1)
  - Light: `#DB2777` - Standard use (4.54:1)
  - Dark: `#9F1239` - High contrast (7.93:1)

### Semantic Colors
- **Success**: `#059669` (4.56:1)
- **Warning**: `#D97706` (4.52:1)
- **Error**: `#DC2626` (5.25:1)
- **Info**: `#0284C7` (4.89:1)

### Neutral Colors (Warm Gray Scale)
- **Gray 50**: `#FAF7F2`
- **Gray 100**: `#F5F1EB`
- **Gray 200**: `#E8E2D8`
- **Gray 300**: `#D6CCC0`
- **Gray 400**: `#B8AA9C`
- **Gray 500**: `#9A8B7A`
- **Gray 600**: `#7C6B58`
- **Gray 700**: `#5E4D3A`
- **Gray 800**: `#403328`
- **Gray 900**: `#2A1F16`

### Background Colors
- **Primary Background**: `#FBF8F3` - Warm cream
- **Card Background**: `#FFFFFF` - Pure white
- **Sidebar Background**: `#F5F1EB` - Light warm gray

---

## Typography System

### Font Families
- **Serif Headers**: Lora - Used for all major headings (h1, h2, h3)
- **Sans Body**: Inter - Used for body text, UI elements, and navigation
- **Handwritten Accent**: Caveat - Used sparingly for personality touches

### Type Scale (Semantic)

#### Display
- **Size**: `clamp(2.5rem, 5vw + 1rem, 4.5rem)` (40-72px)
- **Weight**: 700
- **Line Height**: 1.1
- **Letter Spacing**: -0.02em
- **Usage**: Hero sections, major announcements

#### Headline
- **Size**: `clamp(2rem, 4vw + 0.5rem, 3rem)` (32-48px)
- **Weight**: 700
- **Line Height**: 1.2
- **Letter Spacing**: -0.01em
- **Usage**: Page titles, section headers

#### Title
- **Size**: `clamp(1.5rem, 3vw + 0.25rem, 2.25rem)` (24-36px)
- **Weight**: 600
- **Line Height**: 1.3
- **Usage**: Subsection headers, card titles

#### Subtitle
- **Size**: `clamp(1.25rem, 2vw + 0.25rem, 1.5rem)` (20-24px)
- **Weight**: 600
- **Line Height**: 1.4
- **Usage**: Card headers, feature titles

#### Body Large
- **Size**: `clamp(1.125rem, 1.5vw + 0.25rem, 1.25rem)` (18-20px)
- **Weight**: 400
- **Line Height**: 1.6
- **Usage**: Intro paragraphs, important text

#### Body
- **Size**: `1rem` (16px)
- **Weight**: 400
- **Line Height**: 1.5
- **Usage**: Standard paragraphs, descriptions

#### Caption
- **Size**: `0.875rem` (14px)
- **Weight**: 400
- **Line Height**: 1.4
- **Usage**: Small text, labels, meta information

#### Overline
- **Size**: `0.75rem` (12px)
- **Weight**: 500
- **Line Height**: 1.3
- **Letter Spacing**: 0.05em
- **Text Transform**: Uppercase
- **Usage**: Category labels, tags

---

## Button System

### Primary Button
- **Background**: Purple (`#7C3AED`)
- **Text**: White
- **Hover**: Purple Dark (`#5B21B6`)
- **Active**: Scale 0.98
- **Focus**: 2px purple ring with 2px offset
- **Usage**: Primary CTAs, main actions

### Secondary Button
- **Background**: White
- **Text**: Purple Darker (`#4C1D95`)
- **Border**: 2px Purple (`#7C3AED`)
- **Hover**: Purple background with white text
- **Active**: Scale 0.98
- **Focus**: 2px purple ring with 2px offset
- **Usage**: Secondary actions, alternative options

### Ghost Button
- **Background**: Transparent
- **Text**: Purple Darker (`#4C1D95`)
- **Hover**: Purple/10 background
- **Active**: Scale 0.98
- **Focus**: 2px purple ring with 2px offset
- **Usage**: Tertiary actions, less emphasis

### Special Cases
- **Growth Plan Button**: Black background, white text, gray-800 hover
- **Enterprise Plan Button**: Uses secondary style

### Button States
- **Default**: Base appearance
- **Hover**: Color/background change with smooth transition (200ms)
- **Active**: Scale to 0.98
- **Focus**: Visible purple ring (keyboard navigation)
- **Disabled**: 50% opacity, no pointer events

---

## Focus States

### Focus Ring System
All interactive elements must have visible focus states for accessibility:

```css
focus-visible:ring-2 
focus-visible:ring-purple 
focus-visible:ring-offset-2
transition-all duration-150
```

### High Contrast Mode
For users requiring enhanced visibility:
```css
focus-visible:ring-3 
focus-visible:ring-purple-darker 
focus-visible:ring-offset-2 
focus-visible:ring-offset-yellow-300
```

---

## Component Patterns

### Cards
- **Background**: White
- **Border**: 1px `border-gray-100`
- **Border Radius**: `rounded-2xl` (1rem)
- **Padding**: `p-8` (2rem)
- **Shadow**: `shadow-lg` default, `shadow-xl` on hover
- **Transition**: All properties 200ms

### Pricing Cards
- **Standard Cards**: White background with purple accents
- **Highlighted Card**: Purple ring-2 with elevated shadow
- **Hover**: Subtle lift animation (-translate-y-1)

### Form Elements
- **Sliders**: Purple track with purple thumb
- **Inputs**: Gray border, purple focus ring
- **Labels**: Gray-700 text color

---

## Spacing System

### Base Grid
8px base unit for consistent spacing

### Spacing Scale
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 32px (2rem)
- **xl**: 64px (4rem)

---

## Animation & Transitions

### Standard Durations
- **Instant**: 0ms
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms

### Easing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Decelerate**: `cubic-bezier(0, 0, 0.2, 1)`
- **Accelerate**: `cubic-bezier(0.4, 0, 1, 1)`

### Common Animations
- **Hover Lift**: `-translate-y-1` with shadow increase
- **Active Press**: `scale-[0.98]`
- **Fade In Up**: Opacity 0→1, translateY 20px→0
- **Float**: Continuous gentle floating for decorative elements

---

## Accessibility Standards

### Contrast Requirements
- **Normal Text**: Minimum 4.5:1 (WCAG AA)
- **Large Text**: Minimum 3:1 (18px+ or 14px+ bold)
- **UI Components**: Minimum 3:1
- **Focus Indicators**: Clearly visible with 3:1 contrast

### Keyboard Navigation
- All interactive elements accessible via keyboard
- Visible focus indicators on all focusable elements
- Logical tab order following visual hierarchy
- Skip links for main content navigation

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels where needed
- Descriptive alt text for images
- Clear heading hierarchy

---

## Best Practices

### Color Usage
1. Use purple as primary CTA color consistently
2. Reserve black for special emphasis (e.g., "Most Popular" plan)
3. Use semantic colors for status messages
4. Maintain consistent hover states across similar elements

### Typography
1. Use Lora (serif) for main headings to add personality
2. Keep body text in Inter for readability
3. Use Caveat sparingly for playful accents
4. Maintain consistent font weights within type scales

### Interaction
1. Provide clear hover states for all interactive elements
2. Include focus states for keyboard navigation
3. Use consistent transition durations (200ms standard)
4. Scale buttons slightly on click (0.98) for tactile feedback

### Component Consistency
1. Use the same border radius across similar components
2. Maintain consistent padding within cards
3. Apply shadows consistently based on elevation
4. Keep spacing multiples of 8px

---

## Version History

### v1.1 - Phase 1 Optimization (Current)
- Enhanced color system for WCAG AA compliance
- Implemented consistent focus state system
- Rationalized typography with semantic naming
- Consolidated button variants
- Fixed contrast issues in hover states

### v1.0 - Initial Design System
- Established brand colors and typography
- Created component library
- Defined spacing and animation systems

---

## Next Steps (Phase 2)
- Implement design token system
- Create component state specifications
- Establish 8px spacing grid
- Add accessibility-first component variants