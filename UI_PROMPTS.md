# Yaduvanshi School Website — Complete UI Prompts

> In prompts ka use karke aap apne project ka poora UI design / rebuild kar sakte ho.
> Har section ka alag prompt hai. Global design system sab sections par apply hoga.

---

## 🎨 GLOBAL DESIGN SYSTEM (Sab pages par common)

```
Design a premium Indian school / educational institution website UI.

COLOR PALETTE:
- Primary Navy: #10213a (headings, dark backgrounds)
- Secondary Blue: #3a5a7a (body text, subtitles)
- Accent Gold: #c4a048 (eyebrow labels, highlights, borders, CTAs)
- Light Background: #f6f8fc (alternate section backgrounds)
- White: #ffffff (main content areas)
- Gold border tint: rgba(196,160,72,0.14)

TYPOGRAPHY:
- Headings: Playfair Display (serif, bold, elegant, academic feel)
- Body: Source Sans 3 (clean, readable, modern sans-serif)
- Eyebrow labels: 10px, bold, uppercase, letter-spacing 0.28em, gold color

STYLE:
- Professional, trustworthy, academic, modern but not flashy
- Generous white space, rounded cards (8–16px radius)
- Subtle gold borders and dividers
- Smooth hover transitions (200–300ms)
- Mobile-first responsive design
- Material Symbols icons where needed

LAYOUT:
- Max content width: 1280px (5xl = 1024px for text-heavy areas)
- Section padding: py-16 px-6
- Grid gaps: 16–32px
```

---

## 📐 LAYOUT COMPONENTS

### 1. POPUP MODAL (Site load par poster slider)

```
Full-screen overlay popup modal for school announcements/posters.

STRUCTURE:
- Fixed overlay: full viewport, z-index 2000
- Dark backdrop: black 70% opacity + backdrop blur
- Centered modal: max-width 5xl, shadow-2xl
- Close button: top-right, circular, black/50 bg, white X icon

INNER CONTENT:
- Image slider (Swiper): fade effect, 50vh mobile / 75vh desktop height
- Images: object-contain, full width
- Prev/Next arrows: left-right center, glassmorphism white/10 buttons
- Pagination dots: white bullets, active = gold primary
- Slide counter: bottom-left "Slide / 03" white text
- Autoplay: 5 seconds, loop if multiple slides
- Click outside or close button to dismiss
```

### 2. NAVBAR (Header — 2 Column Layout)

```
School website sticky header navbar with TWO HORIZONTAL SECTIONS stacked vertically.

═══ SECTION 1: BRANDING BAR (nb-branding) ═══
Layout: 2 columns in a row (flex, space-between, align-center)
Padding: comfortable horizontal padding

COLUMN 1 — Logo & School Name (left):
- School logo image (120×52px approx)
- School name as H1 heading next to/below logo
- Entire block is clickable link to homepage
- Logo fallback if image fails

COLUMN 2 — Admission Poster (right):
- Admission advertisement banner image (180×55px)
- Static promotional graphic "Admission Open"

On scroll: header gets "nb-scrolled" class — slightly compact/shadowed sticky style.

═══ SECTION 2: PRIMARY NAVIGATION BAR (nav) ═══
Layout: horizontal flex row, full width
Background: navy or white depending on design

LEFT/CENTER — Menu Items (ul > li):
- "Home" link
- Dynamic category menu items from API
- Categories WITH sub-pages: dropdown using <details>/<summary>
  - Summary = category name
  - Dropdown ul = list of page links
- Categories WITHOUT pages: plain text span

RIGHT — Actions:
- "Student Admission" CTA button/link (gold accent, prominent)
- Mobile hamburger "Menu" button (visible only on mobile)

MOBILE PANEL (dialog):
- Full-screen or slide-in overlay when Menu clicked
- Close button at top
- Vertical list of all nav links
- Same links as desktop menu
```

### 3. FOOTER

```
School website footer with 4-column grid + bottom bar.

═══ MAIN FOOTER (4 columns on desktop, stacked on mobile) ═══

COLUMN 1 — Brand:
- School logo (wide, ~500×50)
- School full name (H2)
- Short name subtitle
- School motto/tagline paragraph
- Social media links row: YouTube, Instagram, Twitter, LinkedIn (icon buttons)

COLUMN 2 — Useful Links:
- Heading: "Useful Links"
- Vertical list: About Us, dynamic page links

COLUMN 3 — Quick Links:
- Heading: "Quick Links"
- Vertical list: Admissions, Gallery, Blogs, etc.

COLUMN 4 — Contact Us:
- Heading: "Contact Us"
- Address paragraph
- Email link
- Phone number link
- Use <address> semantic tag

═══ BOTTOM BAR (full width, darker bg) ═══
Layout: flex row, space-between
- Left: "© 2026 School Name. All Rights Reserved."
- Right: Privacy Policy | Terms & Conditions links
```

---

## 🏠 HOMEPAGE (Landing Page) — All Sections

### 4. TOP SLIDER / HERO SLIDER

```
Full-width hero image slider at top of homepage (below navbar).

STRUCTURE:
- Full viewport width section, no side padding
- Swiper carousel with fade transition effect
- Each slide: full-width figure with cover image (100vw)
- Optional caption overlay (figcaption) with slide name at bottom

CONTROLS:
- Previous / Next buttons (left & right, vertically centered)
- Clickable pagination dots below slides
- Slide counter badge: "01 / 05" format (only if multiple slides)
- Autoplay: 4.5 seconds, loops

STATES:
- Loading: "Loading slider..." text
- Empty: section hidden
- Images from /uploads/ API
```

### 5. WELCOME SECTION

```
Two-column welcome/intro section for school homepage.

═══ LEFT COLUMN — Text Content ═══
HEADER:
- Eyebrow: "Welcome" (gold, uppercase, small)
- H2 Title: first word in italic/emphasis, rest normal
  Example: "*Welcome* to Yaduvanshi Group"

BODY:
- Rich HTML message paragraph(s) from API
- Feature pills/tags row: "Quality Education" | "Experienced Faculty" | "Holistic Development" | "Modern Campus"
  - Small rounded badge/chip style, gold border

FOOTER (optional):
- "Learn More →" link button if Read_More_Url exists

═══ RIGHT COLUMN — Image + Badge ═══
- Large square image (460×460) with rounded corners
- OR placeholder figcaption if no image
- Floating badge overlay (bottom-right of image):
  - Large number: "26+" (years of experience)
  - Label below: "Years of Excellence"
  - Gold/navy accent card style

LAYOUT: side-by-side on desktop, stacked on mobile (text first, image second)
Background: white
```

### 6. HISTORY SECTION

```
School history/legacy content section.

HEADER (centered or left-aligned):
- Eyebrow: "Our Legacy" (gold uppercase)
- H2: "History of *Yaduvanshi*" (Yaduvanshi in italic gold)
- Badge/tag: "Est. 1998" with date styling

BODY:
- Rich HTML content from API (2-3 paragraphs about school founding)
- Clean prose typography, readable line-height

FOOTER:
- "Read More →" link with arrow SVG icon
- Links to full history page

STYLE: light background (#f6f8fc) or white, max-width prose container
```

### 7. ACHIEVEMENTS STATS SECTION (By the Numbers)

```
Animated statistics counter section — 4 stat cards in a row.

HEADER (centered):
- Eyebrow: "By the Numbers"
- H2: "Our Achievements"

STAT CARDS (4 columns, equal width):
Each card contains:
- Large animated number with suffix: "26+", "55,000+", "3000+", "255+"
- Horizontal gold divider line (hr)
- Label below: "Years of Excellence", "Students Enrolled", "Expert Faculty", "Awards Received"

ANIMATION:
- Numbers count up from 0 when scrolled into view (IntersectionObserver)
- Staggered entrance delay per card (120ms each)

STYLE:
- Dark navy background OR white with navy text
- Numbers: Playfair Display, very large (48–64px), gold or white
- Labels: Source Sans, medium weight, muted color
```

### 8. NOTICE SECTION (News & Notices)

```
Two-part notice board section.

HEADER:
- Eyebrow: "Latest Updates"
- H2: "News & Notices"

MAIN PANEL — Notice Board:
- Sub-heading: "Notice Board"
- Count badge: "5 notices"
- Vertical list of notice cards

Each notice list item (button/card):
- Important flag: red "!" badge if Is_Important
- Notice title (H4, bold)
- Date (formatted: "15 March 2026")
- "View Details" text/link on right
- Hover: subtle background highlight

MODAL (on click):
- Overlay dialog, centered white card
- Header: "Notice Details" + Title + Date
- Body: HTML description content
- Footer: "Close Notice" button

STYLE: split layout or single column, clean list with dividers
```

### 9. FOUNDER / LEADERSHIP MESSAGE SECTION

```
Leadership message carousel section.

HEADER:
- Eyebrow: "Message from Leadership"

SLIDER (Swiper, one slide visible):
Each slide — 2 column layout:

LEFT — Photo:
- Portrait image (340×400), rounded corners
- Role badge below image (e.g., "Chairman", "Principal")

RIGHT — Quote block:
- Blockquote styling with large quotation mark
- Leader name (H3)
- Role/title (subtitle)
- Message description paragraph (3-4 lines)
- "Read Full Message →" link footer

PAGINATION: dots below slider
AUTOPLAY: 6 seconds if multiple founders
Background: subtle gradient or light gray
```

### 10. STUDENT TOPPERS SECTION (Hall of Fame)

```
Student achievers showcase with Olympic podium layout.

HEADER (centered):
- Eyebrow: "Hall of Fame"
- H2: "Our Student Toppers"

═══ PODIUM — Top 3 Students ═══
Layout: 3 columns, center column tallest (rank 1), sides shorter (rank 2 left, rank 3 right)

Each podium card:
- Circular student photo (110×110) OR initial letter avatar
- Student name (H3)
- Class name
- Percentage score (large, gold): "98.5%"
- Batch year badge: "Batch 2025"
- Photo links to student profile page

═══ REMAINING TOPPERS — Horizontal scroll or grid ═══
Smaller cards:
- Small photo (44×44)
- Name + "#4 • 2025" rank/year text

STYLE: celebratory, gold accents, navy background option, trophy/medal visual cues
```

### 11. ACHIEVEMENT GALLERY SECTION (Homepage)

```
Photo grid of school achievements with modal detail view.

HEADER:
- H2: "Our Achievements"

GRID (responsive, 2–4 columns):
Each achievement card:
- Image thumbnail with year chip overlay (bottom-left): "2024"
- Title (H3)
- Short description (2 lines, truncated)
- "View Details" link text
- Cursor pointer, hover zoom on image

MODAL (on click):
- Dark overlay
- Large image (full width in modal)
- Title, description, year
- Close button (top-right X)

LOADING: skeleton placeholder cards (4 items)
```

### 12. FACILITY SECTION (Campus Infrastructure)

```
School facilities showcase grid with detail modal.

HEADER (centered):
- Eyebrow: "Campus Infrastructure"
- H2: "Our Facilities"
- Subtitle paragraph: "World-class infrastructure designed to support learning, growth, and overall student well-being."

GRID (2–3 columns):
Each facility card (clickable button):
- Facility image (520×320), rounded top corners
- Index badge: "#01" (top-left overlay)
- Category name (small, gold): e.g., "Sports"
- Title (H3): e.g., "Olympic Size Swimming Pool"
- Description excerpt (2 lines)
- "View Details" footer text
- Hover: card lift shadow effect

MODAL (on click):
- Full facility image (900×520)
- Category span + Title (H3)
- Full description paragraph
- Close button (header + footer)

Body scroll locked when modal open.
```

### 13. ADMISSION SECTION

```
Admission call-to-action section with image and message.

HEADER:
- Eyebrow: "Admissions"
- H2: "Admission Open *2025-2026*" (year span in gold highlight)

IMAGE BLOCK:
- Wide admission banner image (860×500)
- "Now Open" badge overlay (top-left, red/gold pill badge)

BODY:
- Rich HTML admission message (dates, eligibility, process)

FOOTER — Two CTA buttons side by side:
- Primary: "Apply Now" (gold filled button)
- Secondary: "Learn More" (outlined navy button)

STYLE: attention-grabbing, uses school brand colors, clear CTAs
Background: white or light gold tint
```

### 14. BLOG SECTION (Latest from Campus)

```
Blog/news preview section with featured + grid layout.

HEADER:
- Eyebrow: "News & Updates"
- H2: "Latest from Campus"

═══ FEATURED POST (large, full width) ═══
- Large cover image (800×400) with "Featured" gold badge
- Date + Author meta row
- Title (H3, large)
- Description excerpt (3 lines)
- Entire card is clickable link

═══ REMAINING POSTS (2–3 column grid) ═══
Each smaller card:
- Thumbnail image (400×250)
- Date
- Title (H3)
- Short excerpt

FOOTER:
- "View All Posts →" centered link to /blogs

STYLE: magazine/blog layout, clean cards with subtle shadows
```

### 15. FAQ SECTION (Homepage inline)

```
Frequently Asked Questions section on homepage.

CONTAINER: max-width 5xl, centered, bg #f6f8fc, py-16 px-6

HEADER (centered):
- Eyebrow: "Help Center" (gold uppercase)
- H2: "Frequently Asked Questions" (Playfair Display)

GRID: 3 equal columns on desktop, 1 column mobile

Each FAQ card:
- White background, rounded border (gold tint border)
- Padding: p-5
- Question as H3 (navy, Playfair, bold)
- Answer paragraph (blue-gray, text-sm, leading-7)

3 FAQ items about: admissions, notices, achievements/gallery
```

---

## 📄 INNER PAGES

### 16. ADMISSION FORM PAGE

```
Multi-step student admission form page.

HEADER:
- H1: "Student Admission Form"
- Subtitle: "Please enter accurate details to register your student profile."

PROGRESS STEPPER (horizontal):
3 steps: "Basic Info" | "Academic & Path" | "Address & Meta"
- Active step highlighted in gold
- Completed steps with checkmark
- Connector lines between steps

FORM (fieldset per step):

STEP 1 — Basic Info:
- Full Name* (text input)
- Father's Name* (text input)
- Mother's Name (text input)
- Email* (email input)
- Phone* (tel input)

STEP 2 — Academic:
- Class/Grade* (select dropdown)
- Date of Birth* (date picker)
- Gender* (radio: Male/Female/Other)
- Admission Date (date picker)

STEP 3 — Address:
- City (text)
- State (text)
- Additional Info (textarea)

FOOTER BUTTONS:
- "Back" button (if step > 1, outlined)
- "Next" / "Submit Admission" (gold primary, right-aligned)

SUCCESS STATE:
- Checkmark icon
- H2: "Admission Form Submitted"
- Confirmation message with student name

STYLE: clean form, labeled inputs, required field asterisks, white card on light bg
```

### 17. BLOGS LIST PAGE (/blogs)

```
Blog listing page with search and pagination.

HERO HEADER:
- H1: "Our Blog"
- Subtitle: "Knowledge & Insights"
- Search bar: full-width input, placeholder "Search articles...", rounded, with search icon

BLOG GRID (3 columns desktop, 1 mobile):
Each blog card (article):
- Cover image (520×320), rounded top
- Title (H2)
- Description excerpt (stripped HTML, 3 lines)
- Footer meta: "By Author Name" + date
- Hover: card shadow lift
- Entire card clickable

PAGINATION (bottom center):
- Numbered page buttons in a row
- Active page: gold filled
- Inactive: outlined

EMPTY/LOADING: "Loading articles..." or empty state message
```

### 18. BLOG DETAIL PAGE (/blogs/[id])

```
Single blog article detail page.

HERO:
- Full-width cover image (1600×620) OR gray placeholder
- Overlay gradient at bottom for text readability
- "← Back to Blogs" button (top-left, white text)
- Article title (H1, large, white on image overlay)
- Meta row: "By Author" + formatted date

CONTENT AREA (max-width prose, centered):
- Rich HTML article content (headings, paragraphs, images, lists)
- Clean typography (.bd-prose class)
- Generous line-height for readability

FOOTER:
- Divider line
- Social share buttons row: Facebook, Twitter, WhatsApp, Copy Link

STYLE: Medium/Substack-like article layout, focus on readability
```

### 19. ACHIEVEMENTS PAGE (/achievements)

```
Full achievements gallery page with search.

HERO:
- H1: "Achievements"
- Subtitle: "Browse our recognition and milestones."

ACHIEVEMENT GRID (responsive 3–4 columns):
Each card:
- Image (fill container, object-cover) OR placeholder icon
- Year chip overlay (bottom of image): "2023"
- Title (H3)
- Description excerpt
- "View Details" button (gold outline)

MODAL (detail view):
- Large image
- Title (H2)
- Detail grid (dl): Year, ID, full description
- Close button

Cards have staggered fade-in animation on load.
```

### 20. GALLERY PAGE (/gallery)

```
Photo gallery categories landing page.

HERO:
- H1: "Photo Gallery"
- Subtitle: "Explore our campus life, events and achievements"

CATEGORY GRID (3 columns):
Each category card:
- Cover image (fill, object-cover, aspect-ratio 4:3)
- Category name (H2, overlay or below image)
- Description excerpt (stripped HTML)
- "View Photos" footer link text
- Hover: image zoom + overlay darken

Entire card is clickable link to /gallery/[categoryId]
```

### 21. GALLERY CATEGORY PAGE (/gallery/[categoryId])

```
Album list within a gallery category.

HERO:
- "← All Categories" back button
- Category name (H1)
- Album count: "5 Albums"

ALBUM GRID (2–3 columns):
Each album card:
- Album name (H2)
- Description excerpt
- "View Photos" footer
- Minimal card style (no image, text-focused) OR thumbnail if available

Links to /gallery/[categoryId]/[galleryId]
```

### 22. GALLERY DETAIL / PHOTO ALBUM (/gallery/[categoryId]/[galleryId])

```
Photo album with masonry/grid and lightbox.

HERO:
- "← Back to Albums" button
- Album name (H1)
- Album description paragraph

PHOTO GRID (masonry or uniform grid, 3–4 columns):
Each photo tile:
- Square or landscape thumbnail, object-cover
- Hover: slight zoom + overlay with expand icon
- Click opens lightbox

LIGHTBOX MODAL:
- Full-screen dark overlay
- Large centered image (object-contain)
- Caption: "03 / 12" photo counter
- Previous / Next navigation arrows
- Close button (X, top-right or bottom)
- Keyboard arrow key navigation
```

### 23. TOPPER CATEGORIES PAGE (/topper-category)

```
Topper categories listing page.

HERO:
- Eyebrow: "Hall of Fame"
- H1: "Topper Categories"
- Subtitle: "Explore topper groups by stream, level, class, or academic year."
- Count: "Showing 8 Categories"

CATEGORY GRID (3 columns):
Each category card:
- Category name (H2)
- Description: "View the topper list for this category and open student profiles."
- Tag chips row: Class tag + Year tag (gold outlined pills)
- Hover: border gold highlight

Links to /topper-category/[categoryId]
```

### 24. TOPPER CATEGORY DETAIL (/topper-category/[categoryId])

```
Student toppers list within a category.

HERO:
- "← All Categories" back button
- Category name (H1)
- Subtitle: "Browse the students listed under this topper category."
- Meta chips: Class, Year
- Student count: "12 Students"

TOPPER GRID (3 columns):
Each student card:
- Student name (H2)
- Photo (fill container) OR initial letter avatar
- Rank badge overlay on photo: "Rank #1"
- Description excerpt
- Footer: "98.5% Score" + "View Profile →" link

Links to /student/[id]
```

### 25. STUDENT PROFILE PAGE (/student/[id])

```
Individual student topper profile page.

HEADER:
- "← Back to Toppers" button

PROFILE CARD (2 columns):

LEFT COLUMN:
- Large circular/square student photo (fill container)
- OR initial letter placeholder avatar
- Rank badge below photo: large "1" or "#1" with gold styling

RIGHT COLUMN:
- Eyebrow: "Student Profile"
- Student name (H1, large)
- Info grid (dl, 2 columns):
  - Class: value
  - Father's Name: value
  - Batch/Year: value
  - Marks/Percentage: value (if available)
- "About Achievement" section (H3 + description paragraph)

STYLE: clean profile card, white bg, subtle shadow, celebratory feel
```

### 26. DYNAMIC PAGE (/pages/[name]/[id])

```
Generic CMS content page for school info pages (About, etc.).

HERO:
- "← Back" button
- Eyebrow: "Page"
- Page title (H1): e.g., "About Us"

CONTENT:
- Rich HTML prose content (full width, max-width 4xl centered)
- Supports headings, paragraphs, tables, images, lists
- Clean .dp-prose typography

STATES:
- Loading: "Loading content..."
- Error: alert box with error message

STYLE: minimal, content-focused, like a documentation page
```

### 27. 404 NOT FOUND PAGE

```
Simple 404 error page.

CENTERED LAYOUT (min-height 60vh, bg #f6f8fc):
- Eyebrow: "404" (gold uppercase)
- H1: "Page not found" (Playfair Display, 4xl)
- Description: "The page may have moved, been removed, or the link may be incorrect."
- Optional: "Go to Homepage" button (not in current code but recommended)

STYLE: matches site design system, calm and helpful tone
```

---

## 📋 QUICK REFERENCE — All Pages & Routes

| Route | Component | Section Type |
|-------|-----------|--------------|
| `/` | page.js | Landing (15 sections) |
| `/admission-form` | admission-form/page.js | Multi-step form |
| `/blogs` | BlogsListClient.jsx | Blog grid + search |
| `/blogs/[id]` | BlogDetailClient.jsx | Article detail |
| `/achievements` | AchievementsPageClient.jsx | Achievement grid |
| `/gallery` | GalleryPageClient.jsx | Category grid |
| `/gallery/[categoryId]` | GalleryCategoryClient.jsx | Album list |
| `/gallery/[categoryId]/[galleryId]` | GalleryDetailClient.jsx | Photo grid + lightbox |
| `/topper-category` | TopperCategoryClient.jsx | Category list |
| `/topper-category/[categoryId]` | TopperCategoryDetailClient.jsx | Topper list |
| `/student/[id]` | StudentProfileClient.jsx | Student profile |
| `/pages/[name]/[id]` | Dynamicpage.jsx | CMS content |
| 404 | not-found.js | Error page |

## 📋 QUICK REFERENCE — Layout (All Pages)

| Component | Location | Applies To |
|-----------|----------|------------|
| Popup.jsx | layout.js | All pages (on load) |
| Navbar.jsx | layout.js | All pages (top) |
| Footer.jsx | layout.js | All pages (bottom) |

---

*Generated for Yaduvanshi Group of Institutions school website template.*
