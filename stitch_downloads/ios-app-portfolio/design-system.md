# Silicon Slate

Asset: `assets/22d6cf7cb55745e5a85e421317bc41e4`
Version: `1`

## Design System Documentation: The Precision Portfolio

### 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Architect."**

To design for a mobile app developer is to design for someone who understands the poetry of a pixel. This system moves beyond a standard "portfolio template" by adopting an editorial, high-end mobile OS aesthetic. It prioritizes intentionality over decoration. We break the "template" look by using aggressive whitespace (breathe), asymmetric content grouping (focus), and a "Z-axis" depth model that makes the interface feel like a premium physical device.

The goal is a signature visual identity that feels like a bespoke IDE, dark, focused, and punctuated by "Electric Blue" and "Sunset Orange" to represent the energy of active code and successful launches.

### 2. Colors & Surface Philosophy
The palette is rooted in a "Pure Dark" environment, utilizing high-contrast accents to guide the eye toward conversion points.

#### The "No-Line" Rule
Designers are prohibited from using `1px` solid borders for sectioning. Structural boundaries must be defined solely through background color shifts or tonal transitions. To separate a hero section from a project gallery, shift the background from `surface` (`#0e0e10`) to `surface-container-low` (`#131315`).

#### Surface Hierarchy & Nesting
- Base Layer: `surface` (`#0e0e10`)
- Secondary Sections: `surface-container-low` (`#131315`)
- Interactive Cards: `surface-container-high` (`#1f1f22`)
- Active Overlays: `surface-container-highest` (`#252528`)

#### The "Glass & Gradient" Rule
Use glassmorphism for floating headers or navigation bars. Use `surface_bright` at 60% opacity with `20px` backdrop blur.

For main CTAs, use a linear gradient from `primary` (`#85adff`) to `primary-container` (`#6c9fff`) instead of a flat color.

### 3. Typography
- Display: `display-lg` (`3.5rem`) with tight letter spacing
- Headline: `headline-md` (`1.75rem`)
- Body: `body-lg` (`1rem`) with `1.6` line-height
- Labels: `label-md` (`0.75rem`), all caps, `+0.05em` tracking

Primary text should use `on_surface` (`#fefbfe`) and secondary text should use `on_surface_variant` (`#acaaad`).

### 4. Elevation & Depth
Depth is achieved through tonal layering instead of traditional drop shadows.

#### Ambient Shadows
- Blur: `40px - 60px`
- Opacity: `8%` of `surface_container_lowest`
- Spread: `-5px`

#### Ghost Border Fallback
If a container lacks contrast, use `outline-variant` (`#48474a`) at `15%` opacity.

### 5. Components
#### Project Showcase Cards
- No borders
- `xl` squircle corners
- Background: `surface-container-high`
- Large typography overlapping project imagery
- Hover: scale to `1.02` and shift background to `surface_bright`

#### Buttons
- Primary: gradient `primary` to `primary-container`, pill radius
- Secondary: transparent ghost style with ghost border and `primary` text
- Tertiary: text-only with `secondary` (`#ff7353`)

#### Chips
- Background: `surface-container-highest`
- No border
- Small corner radius

#### Input Fields
- Background: `surface-container-low`
- No underline
- Active state uses primary ghost border at higher opacity

### 6. Do's and Don'ts
#### Do
- Use asymmetric margins
- Use large squircle corners for major containers
- Use `primary_dim` (`#0070eb`) for interactive states

#### Don't
- Don't use dividers or horizontal rules
- Don't use pure black except for `surface_container_lowest`
- Don't use heavy Web 2.0-style shadows
