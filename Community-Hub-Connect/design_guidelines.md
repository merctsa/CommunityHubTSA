# Community Resource Hub - Design Guidelines

## Design Approach
**Hybrid System**: Material Design principles for accessibility and clear information architecture, with inspiration from community-focused platforms like Nextdoor and local government portals. Emphasis on approachable, calming aesthetics that build trust and ease of use.

## Core Design Principles
- **Accessible First**: High contrast ratios, clear hierarchy, generous touch targets
- **Gentle Visual Language**: Soft edges, generous spacing, minimal harsh angles
- **Trust-Building**: Professional yet warm, community-oriented tone
- **Information Clarity**: Easy scanning, clear categorization, intuitive navigation

## Typography System
- **Primary Font**: Inter or Poppins (Google Fonts) - modern, highly legible sans-serif
- **Headings**: 
  - H1: 3xl to 4xl (48-56px desktop), semi-bold
  - H2: 2xl to 3xl (32-40px), medium weight
  - H3: xl to 2xl (24-32px), medium
- **Body**: Base to lg (16-18px), regular weight, line-height of 1.6-1.7 for readability
- **Labels/Meta**: sm to base (14-16px), medium weight

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, and 12 for consistency
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20
- Card spacing: gap-6 to gap-8
- Container: max-w-7xl with px-4 to px-8

**Grid Structure**:
- Resource cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Highlighted resources: grid-cols-1 lg:grid-cols-3
- Form layout: Single column, max-w-2xl centered
- Directory filters: Sidebar (lg+) or collapsible (mobile)

## Component Library

### Navigation
- Sticky header with logo, main navigation links, and prominent "Submit Resource" CTA
- Mobile: Hamburger menu with smooth slide-in
- Include search icon that opens directory search

### Hero Section
- Full-width banner (h-96 to h-[600px]) with community image
- Overlay gradient for text readability
- Centered headline: "Find Community Resources" or "[Community Name] Resource Hub"
- Subheading explaining purpose
- Primary CTA: "Explore Resources" with blurred background button
- Secondary search bar integrated into hero

### Resource Directory (Main Feature)
**Filter Sidebar** (desktop) / Collapsible Panel (mobile):
- Category checkboxes (Non-Profits, Support Services, Events, Health, Education)
- Service type dropdown
- Location/area filter
- Active filters display with clear badges

**Resource Cards**:
- Rounded-xl borders with subtle shadow
- Organization logo or icon placeholder (h-12 w-12)
- Title (text-lg font-medium)
- 2-3 line description
- Service tags (pill-shaped badges)
- Contact info (phone/email icons with text)
- "Learn More" link
- Hover: subtle lift effect (translate-y-1)

**Search Bar**:
- Prominent placement, full-width above directory
- Icon prefix, placeholder text "Search resources..."
- Clear button when active

### Highlighted Resources Section
- 3-column grid showcasing featured organizations
- Enhanced cards with:
  - Organization image (aspect-ratio-video or square)
  - Title and category badge
  - 4-5 line detailed description
  - Impact statistics (e.g., "Served 500+ families")
  - Primary button "Visit Resource"
  - Secondary link "View in Directory"

### Submission Form
- Clean, single-column layout (max-w-2xl)
- Grouped sections with subtle dividers
- Fields:
  - Organization Name (required)
  - Category dropdown (required)
  - Description textarea (required)
  - Contact Information (email, phone)
  - Website URL
  - Address/Location
  - Services Provided (multi-select or checkboxes)
  - Additional Notes
- Submit button with confirmation message
- Helper text for each field

### Additional Content Sections
**About This Hub**:
- 2-column layout (text + image)
- Mission statement
- How the hub helps the community

**How to Use**:
- 3-step process with numbered icons
- Clear, concise instructions

**Community Impact**:
- Statistics grid (4 columns): Total resources, Categories, Users helped, Partner organizations
- Large numbers with descriptive labels

**Footer**:
- 4-column grid: About, Resources, Quick Links, Contact
- Newsletter signup form
- Social media links
- Copyright and credits (TSA chapter/school if applicable)

## Interaction Patterns
- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Filter Animation**: Fade-in/out for resource cards when filters change
- **Form Validation**: Inline error messages, green checkmarks for valid fields
- **Loading States**: Subtle skeleton screens for directory while loading
- **Hover States**: Subtle scale/shadow changes on cards
- **No Distracting Animations**: Keep movements purposeful and minimal

## Images

### Required Images:
1. **Hero Image**: Wide community gathering photo - people at community event, local landmark, or diverse group collaborating (1920x800px minimum)
2. **Highlighted Resource Images**: 3+ images representing featured organizations - service in action, facility photos, or team photos (800x600px each)
3. **About Section Image**: Community members or volunteers working together (1200x800px)
4. **Organization Logos/Icons**: Placeholder icons for each resource card if logos unavailable

All images should convey warmth, community connection, and accessibility. Use authentic, diverse photography rather than stock corporate imagery.

## Accessibility Requirements
- ARIA labels on all interactive elements
- Keyboard navigation support throughout
- Focus indicators on all focusable elements (ring-2 with appropriate offset)
- Form labels explicitly associated with inputs
- Alt text for all images
- Minimum touch target: 44x44px
- Semantic HTML structure with proper heading hierarchy

## Responsive Behavior
- Mobile: Single column, stacked sections, collapsible filters
- Tablet: 2-column resource grid, maintained sidebar for filters
- Desktop: Full 3-column grid, persistent filter sidebar
- All breakpoints: Readable line lengths (max-w-prose for text content)