# Ambati Tharun Sai — 3D Personal Developer & AI Portfolio

A production-ready, interactive 3D developer portfolio for **Ambati Tharun Sai** (Computer Science Student, Software Developer & AI/ML Enthusiast from Andhra Pradesh, India) that blends a procedural Three.js WebGL neural-core showcase with an editorial-grade software engineering portfolio, live GitHub repository synchronization, and a built-in Client-Side Studio Editor for maintaining verified credentials without fabricated data.

## User Review & Critical Decisions

> [!IMPORTANT]
> All core architectural and interactive choices have been aligned based on your preferences and strict authenticity requirements:

- **Confirmed Decision 1 — 3D Centerpiece (`Three.js` Studio PBR Scene)**: **Interactive 3D Neural Core & Tech Artifact Showcase** assembled as a multi-part procedural `THREE.Group` (10+ distinct geometric sub-assemblies including a faceted icosahedral core, counter-rotating gyroscopic telemetry rings, extruded orbital compute nodes, lathe-turned magnetic conduits, and an instanced synaptic particle lattice) with studio `RoomEnvironment` PBR reflections, warm/cool lighting contrast, and aGrounded radial contact shadow.
- **Confirmed Decision 2 — Spatial & Editorial Integration**: **Hybrid Architecture** featuring a full-viewport (`100vw × 100vh`) interactive 3D Hero stage with a collapsible bottom control dock and a one-click **Zen 3D Mode** (`H` shortcut or dock button) that smoothly retracts all UI overlays for unobstructed 3D inspection, transitioning seamlessly into structured editorial sections below the fold.
- **Confirmed Decision 3 — Content & Credential Management**: **Client-Side Studio Editor** with persistent `localStorage` state, live inline/drawer editing for all profile fields, education, hackathons (HacXLerate 2026), achievements, certificates, experience, and resume PDF upload/preview, plus one-click **JSON Export / Import** and **Reset to Verified Defaults**.
- **Strict Authenticity Policy**: Zero fabricated phone numbers, college names, CGPAs, graduation dates, awards, or unverified metrics. Missing optional records render as clean, honest *"Verification Pending / Editable in Studio"* states that can be populated anytime via the Studio Editor.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Ambati Tharun Sai's engineering identity across software development, AI/ML systems, full-stack web, mobile (Flutter), and IoT solutions. Visitors can inspect a real-time 3D neural core in the hero viewport, explore 8+ curated projects plus live public repositories fetched directly from `github.com/ambatitharunsai-tech`, filter skills and certifications, preview/download a verified Indian fresher software engineer resume, and reach out via a validated contact workflow.
- **Target Audience / Persona**: Technical recruiters, hiring managers, internship coordinators, hackathon organizers, freelance clients, and engineering peers evaluating code quality, system architecture, and AI/ML execution.
- **Key Value**: Distinguishes Ambati Tharun Sai from generic student templates by pairing high-craft 3D graphics engineering (60fps damped WebGL loop, custom PBR materials, exploded-view kinematics) with rigorous, truthful documentation of real software systems (`EduNexus AI`, `LostPhoneFinder`, `CurricuForge / CourseCraft AI`, `Safe Drinking Water Web`, `AGRINOVA`, `Smart Irrigation System`, `Ticket Generator System`, and `Groq API Chatbot`).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **3D Hero & Zen Inspection Flow**: Visitor arrives at the full-viewport 3D stage displaying *"AMBATI THARUN SAI — Building Intelligent Solutions. Creating Digital Impact."* with a kinetic role cycling indicator (*Software Developer · AI/ML Enthusiast · Full-Stack Developer · Problem Solver*). Using the bottom control dock, visitors can orbit the 3D Neural Core, scrub the **Exploded Assembly Slider**, switch **Cool Material Finishes** (*Deep Cobalt Anodized, Cryo Glass & Titanium, Obsidian Neural*), toggle **Camera Presets** (*Core Isometric, Orbital Macro, Telemetry Top*), or enter **Zen Mode** to hide overlays.
2. **Project Discovery & Deep-Dive Flow**: Visitor searches and filters Featured Projects by domain (*All, AI & LLM, Full-Stack Web, Mobile & IoT, Social Impact*) or project status (*Completed, Live Production, Prototype, Concept*). Clicking any project opens a comprehensive **Project Architecture Modal** displaying the problem statement, system architecture, feature breakdown, tech stack, live iframe/link preview (including `https://safe-water-web.onrender.com/`), and direct GitHub link.
3. **Live GitHub Synchronization Flow**: The portfolio automatically queries `https://api.github.com/users/ambatitharunsai-tech/repos` (with local caching and rate-limit resilience) to enrich featured projects with real-time star/fork counts, primary languages, last updated timestamps, and dynamically lists any additional public repositories.
4. **Resume & Credential Verification Flow**: Visitor clicks **Preview Resume** or **Download Resume** to open an interactive, printable Indian Software Developer Fresher Resume modal (synced with current profile, skills, projects, and education state) or upload a custom verified `.pdf` resume file.
5. **Studio Content Management Flow**: Ambati clicks the **Studio Editor** trigger to update contact details (email, optional phone, LinkedIn, portrait image, availability status), Education details (Degree, Branch, University, CGPA, Coursework), HacXLerate 2026 hackathon outcomes/photos, Certifications (with category filters), and Achievements, then exports the updated JSON snapshot.

### Visual Identity & Theme
- **Aesthetic Direction**: High-craft **Cool-Spectrum Technical Monograph & Spatial Showcase**—combining Apple-inspired typographic discipline, linear hairline grid geometry, and cool-toned 3D metallic/glass lighting.
- **Color Palette & Mood (60-30-10 Discipline with Dual Light/Dark Mode)**:
  - **Dark Mode (Default Cool Deep Navy/Obsidian)**:
    - *60% Dominant Canvas*: Deep Abyssal Navy `#060B16` and Midnight Slate `#0B1325`
    - *30% Structural Surfaces*: Elevated Slate `#111C33` with subtle cool hairline borders `rgba(148, 163, 184, 0.14)` and Crisp Alabaster text `#F8FAFC` / Muted Slate `#94A3B8`
    - *10% Cool Accent Budget*: Electric Cobalt `#3B82F6` and Glacial Cyan `#06B6D4` reserved for primary interactive states, active filter tabs, and 3D emissive core conduits
  - **Light Mode (Crisp Cool Alabaster & Deep Navy Ink)**:
    - *60% Dominant Canvas*: Cool Alabaster `#F8FAFC` and Pure White `#FFFFFF`
    - *30% Structural Surfaces*: Soft Ice Gray `#F1F5F9` with hairline borders `#E2E8F0` and Deep Navy Ink `#0F172A` / Slate prose `#475569`
    - *10% Cool Accent Budget*: Royal Cobalt `#2563EB` and Deep Cyan `#0891B2`
- **Typography & Hierarchy (2+1 Font System)**:
  - *Display / Headings*: **Outfit** (`600`/`700`, tight tracking `-0.02em`, `text-wrap: balance`) for architectural authority.
  - *Body Prose*: **Plus Jakarta Sans** (`400`/`500`, `15px–16px`, `1.65` line-height, `65ch` measure) for effortless readability across project case studies.
  - *Technical Metadata & Telemetry*: **JetBrains Mono** (`tabular-nums`) strictly for repository metrics, dates, version tags, and 3D coordinate readouts.
- **Zero-Pill & Anti-Slop Discipline**:
  - Static metadata (project categories, tech stack lists, dates, status labels) is rendered as clean, unboxed inline typography with middot (`·`) or slash (`/`) separators—never wrapped in decorative candy pills or badge sandwiches.
  - Interactive filter bars (Project domain filter, Certification category filter, 3D dock presets) use functional `<button>` segmented controls with crisp active states.
  - Top Navigation strictly follows the **3-Zone Top Bar Contract**: Zone 1 single-line wordmark (`Ambati Tharun Sai`), Zone 2 five single-line navigation links (`Work`, `Skills`, `Innovation`, `GitHub`, `Credentials`), and Zone 3 primary action (`Contact`). Theme switching, Resume modal trigger, and Studio Editor access are placed cleanly in the secondary workspace utility bar and Hero action group so the top bar remains uncluttered.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Procedural Multi-Part Three.js Assembly vs. External `.glb` Models**
  - *Chosen Approach*: Construct the 3D Neural Core & Tech Artifact Showcase entirely in procedural Three.js code using a 12-part hierarchical `THREE.Group` (`IcosahedronGeometry` inner core, bevel-extruded gyroscopic rings, `LatheGeometry` magnetic emitters, `TubeGeometry` data conduits, and `InstancedMesh` synaptic nodes) with `RoomEnvironment` PMREM reflections and procedural `CanvasTexture` normal/roughness maps.
  - *Why*: Guarantees zero 404 asset failures, instant load times, deterministic 60fps performance, and interactive exploded-view separation that responds directly to user slider input and project selection.
- **Decision 2: Live GitHub API Integration with Curated Verification Layer**
  - *Chosen Approach*: Combine a curated, truthful specification of all 8 named projects (`EduNexus AI`, `LostPhoneFinder`, `CurricuForge / CourseCraft AI`, `Safe Drinking Water Web`, `AGRINOVA`, `Smart Irrigation System`, `Ticket Generator System`, `Groq API Chatbot`) with a live `fetch` layer to `https://api.github.com/users/ambatitharunsai-tech` and `/repos`.
  - *Why*: Ensures every project mentioned in the prompt has rich architectural documentation and accurate status labels (*Live Production*, *Completed*, *Prototype*, *Concept*), while automatically linking matching GitHub repositories, displaying real star/fork/language data, and surfacing newly created public repos—even if GitHub API rate limits are reached.
- **Decision 3: Client-Side Studio CMS with JSON Portability**
  - *Chosen Approach*: Store portfolio state in a structured TypeScript data store backed by `localStorage`, paired with an in-app **Studio Editor Drawer** that supports editing every section, uploading base64/blob Resume PDFs and Certificate previews, and exporting/importing a portable `portfolio-data.json` file.
  - *Why*: Allows Ambati Tharun Sai to immediately fill in private or newly verified fields (email, phone, college name, CGPA, HacXLerate 2026 results, certificates) in the browser and export the exact JSON configuration without needing external database credentials.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO APPLICATION SHELL                            │
│  ┌───────────────────────┬───────────────────────────┬─────────────────────┐  │
│  │ Zone 1: Brand Title   │ Zone 2: 5 Nav Links       │ Zone 3: Contact CTA │  │
│  └───────────────────────┴───────────────────────────┴─────────────────────┘  │
├───────────────────────────────────────────────────────────────────────────────┤
│  HERO VIEWPORT (100vw x 100vh Hybrid Stage & Zen 3D Mode)                     │
│  ┌───────────────────────────────────────┬─────────────────────────────────┐  │
│  │ Semantic DOM Hero Overlay             │ Isolated WebGL Ref Container    │  │
│  │ • Headline & Kinetic Role Typer       │ • 12-Part Procedural Neural Core│  │
│  │ • Availability Badge (Editable)       │ • RoomEnvironment + Studio Rig  │  │
│  │ • Explore Work / Resume / Contact     │ • Damped OrbitControls & Raycast│  │
│  │ • Theme Toggle & Studio Editor Button │ • Software-WebGL Pacing Guard   │  │
│  └───────────────────────────────────────┴─────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │ Collapsible Bottom 3D Control Dock (Exploded View · Finishes · Cameras) │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
├───────────────────────────────────────────────────────────────────────────────┤
│  EDITORIAL PORTFOLIO SECTIONS (Smooth Scroll + Filterable Views)              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌───────────────┐  │
│  │ About & Lifecycle       │  │ Categorized Technical   │  │ Featured      │  │
│  │ • 9 Core Passions       │  │ Skills (8 Domains)      │  │ Projects (8+) │  │
│  │ • Editable Journey      │  │ • Clean Unboxed Layout  │  │ • Search/Tab  │  │
│  │   Timeline              │  │ • Interactive Highlight │  │ • Detail Modal│  │
│  └─────────────────────────┘  └─────────────────────────┘  └───────────────┘  │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌───────────────┐  │
│  │ Innovation & Technical  │  │ Live GitHub Explorer    │  │ Credentials & │  │
│  │ Exploration (8 Areas)   │  │ • ambatitharunsai-tech  │  │ Records       │  │
│  │ • Problem / Approach /  │  │ • Live Repos + Fallback │  │ • HacXLerate  │  │
│  │   Stack / Applications  │  │ • Language & Activity   │  │ • Certs & Edu │  │
│  └─────────────────────────┘  └─────────────────────────┘  └───────────────┘  │
│  ┌───────────────────────────────────────┬─────────────────────────────────┐  │
│  │ Interactive Resume Preview & Download │ Validated Contact Workflow      │  │
│  │ • Printable Indian Fresher Format     │ • Name/Email/Subject/Message    │  │
│  │ • Custom PDF Upload & Viewer          │ • Mailto & Local Outbox Log     │  │
│  └───────────────────────────────────────┴─────────────────────────────────┘  │
├───────────────────────────────────────────────────────────────────────────────┤
│  PORTFOLIO STATE & STUDIO ENGINE (React Context + localStorage + GitHub API)  │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │ • Verified Default Seed Data (Zero Fabricated Credentials)              │  │
│  │ • Studio Editor Drawer (Profile, Education, Projects, Certs, Events)    │  │
│  │ • JSON Import / Export Engine & Custom Route / 404 Handler              │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Profile & Branding Store**: Full name (`Ambati Tharun Sai`), headlines, introduction paragraphs, location (`Andhra Pradesh, India`), GitHub URL (`https://github.com/ambatitharunsai-tech`), editable email, optional phone, LinkedIn URL, availability status (defaults to *"Status Configurable in Studio"* without assuming availability), portrait image URL/upload, and custom Resume PDF data URI.
- **Featured Projects Store (8 Core + Dynamic GitHub)**:
  1. **EduNexus AI** (*AI-powered Student Success Platform* — Python, FastAPI, AI/LLM, Supabase; Status: *Completed / Prototype*)
  2. **LostPhoneFinder** (*Mobile Application / Device Tracking* — Flutter, Dart, Python, Flask, REST APIs, Google Maps, SQLite; Status: *Completed / Prototype*)
  3. **CurricuForge / CourseCraft AI** (*Generative AI / Education Technology* — Python, Flask, Generative AI, JSON Schema, ReportLab; Status: *Completed*)
  4. **Safe Drinking Water Web** (*Social Impact / Web Development* — Live URL: `https://safe-water-web.onrender.com/`; Status: *Live Production*)
  5. **AGRINOVA** (*Smart Agriculture / AI / IoT* — Flutter, Supabase, AI, IoT; Status: *Concept & Architecture*)
  6. **Smart Irrigation System** (*IoT / Agriculture* — Sensor telemetry, automation logic, GitHub repo integration; Status: *Completed / Prototype*)
  7. **Ticket Generator System** (*Software Development* — Automated ticket creation, validation, backend workflow; Status: *Completed*)
  8. **Groq API Chatbot** (*AI Application* — High-speed LLM inference using Groq API, context management, prompt engineering; Status: *Completed*)
- **Innovation & Technical Exploration Store**: Structured technical breakdowns (Problem, Engineering Approach, Technologies Used, Real-World Applications) across all 8 required innovation tracks.
- **Editable Credentials Store**:
  - **Education**: Degree (`B.Tech / B.E. in Computer Science — Editable`), Branch (`Computer Science & Engineering`), College/University, Start/Graduation Years, CGPA, Coursework, and Academic Highlights—all strictly unassumed until entered by the user.
  - **Hackathons & Events**: Pre-configured editable entry for **HacXLerate 2026 Hackathon** (participation details, team info, project developed, uploadable certificate/photos, verified outcome).
  - **Certifications Gallery**: Filterable by *Programming, Artificial Intelligence, Machine Learning, Web Development, Cloud and Databases, Hackathons, Workshops, Other*, with empty-state guidance and one-click addition in the Studio Editor.
  - **Achievements & Experience**: Categorized support for Internships, Freelance, Volunteering, Leadership, Communities, and Open-Source contributions.

### Interactive Component & State Mapping
- **3D Viewport & Bottom Control Dock**:
  - *Exploded View Slider (`0%` to `100%`)*: Smoothly interpolates radial separation of the outer gyroscopic rings, orbital compute nodes, and conduit shells using `THREE.MathUtils.damp`.
  - *Material Finish Switcher*: Updates PBR `metalness`, `roughness`, `transmission`, and emissive accent hues across the 12-part neural core assembly.
  - *Camera Preset Selector & Raycast Node Selection*: Smoothly damps camera position/target to inspect specific sub-assemblies; clicking orbital nodes highlights corresponding engineering domains.
  - *Zen Mode Toggle*: Collapses the bottom dock and fades hero text overlay so the 3D scene occupies 100% of the viewport cleanly.
- **Project Explorer & Detail Modal**:
  - Real-time search input + category & status filter tabs.
  - Clicking any card opens a full-screen accessible modal (or dedicated detail view via URL hash `#project/:id`) with complete architecture notes, live preview launcher for `Safe Drinking Water Web`, and repository deep links.
- **Interactive Resume Modal**:
  - Displays either a formatted, print-ready Indian Software Developer Fresher Resume generated dynamically from the verified store (`window.print()` / PDF save ready) or the user's uploaded PDF file.
- **Studio Editor Drawer**:
  - Tabbed editor (*Profile & Contact, Education, Projects, Hackathons & Certs, Experience, Backup JSON*) with instant validation, file-to-DataURL converters for images/PDFs, and `localStorage` persistence.
