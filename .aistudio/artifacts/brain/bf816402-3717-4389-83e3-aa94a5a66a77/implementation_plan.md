# Personal Portfolio Certificate File System & Public Viewer Experience

Transform Ambati Tharun Sai's portfolio into a pure, recruiter-ready public showcase by removing all visitor-facing editing/upload controls and introducing a structured multi-format Certificate Gallery supporting PDF, PNG, JPG, WebP, and SVG certificate files with interactive preview and download.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your clarification that this is your personal portfolio website where visitors should only view your work, inspect your credentials, visit your profiles/projects, and contact you:

- **Confirmed Decision 1 — Strictly View-Only Public Portfolio**: Remove all public editing and upload buttons (`Studio`, `Update Academic & Experience Records`, `Add Experience`, `Edit Event`, `Add Achievement`, `Add Verified Certificate`, `Upload PDF`, and `"Editable in Studio"` placeholder copy) so visitors see a polished, finished personal portfolio.
- **Confirmed Decision 2 — Multi-Format Certificate File & Folder Support (`PDF`, `PNG`, `JPG`, `SVG`, `WebP`)**: Organize certificates into structured category folders with support for PDF documents, PNG/JPG/WebP images, and vector certificates, complete with format filtering, interactive modal preview, and direct file download.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Ambati Tharun Sai's verified technical certifications, hackathon credentials, academic records, live Render deployments, GitHub repositories, and resume in a read-only executive showcase.
- **Target Audience / Persona**: Recruiters, hiring managers, engineering leads, and collaborators evaluating Ambati Tharun Sai's software engineering and AI credentials.
- **Key Value**: Eliminates distracting admin/editor controls meant for site builders while providing a comprehensive, multi-format certificate repository and viewer that handles both document (`PDF`) and image (`PNG`, `JPG`, `WebP`, `SVG`) credentials seamlessly.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Browsing Certificates by Category & Format**: Visitors navigate to the **Certifications & Licenses Gallery** and filter credentials by domain (`All`, `Artificial Intelligence`, `Machine Learning`, `Web Development`, `Programming`, `Cloud and Databases`, `Hackathons`, `Workshops`) or by file format (`All Formats`, `PDF Document`, `PNG Image`, `JPG / SVG`).
  2. **Folder Structure & Card View**: Visitors can switch between a visual **Gallery Grid** and a structured **Directory / Folder View** that groups certificate files by their category directory (`certificates/ai-ml/`, `certificates/web-fullstack/`, `certificates/programming/`, `certificates/hackathons/`).
  3. **Interactive Certificate Lightbox (PDF & Image Viewer)**: Clicking any certificate opens a full-resolution viewer modal that renders multi-page/embedded PDFs or zoomable PNG/JPG/SVG certificate images alongside issuer metadata, credential ID, related technical skills, and a **Download Certificate** button.
  4. **Clean View-Only Navigation & Credentials**: Visitors browse the Hero, About, Skills, Live Projects, GitHub Repositories, Credentials, Resume Preview/Download, and Contact sections without seeing any edit or upload buttons.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Figma Ink Wash monochromatic dark/light editorial portfolio paired with `#562f54` interactive buttons and full-color project and certificate previews.
  - *Color Palette & Mood*: Deep charcoal and concentrated ink surfaces (`#0D0D0D`, `#252525`, `#333333`) with warm ivory/silver typography (`#F5F4F0`, `#EDECE8`, `#B8B8B8`) and `#562f54` (`hover:bg-[#6b3b68]`) primary action buttons.
  - *Typography & Hierarchy*: `Outfit` for section headings, `Plus Jakarta Sans` for body copy, and `JetBrains Mono` (`tabular-nums`) for file formats, dates, directory paths, and credential IDs.
- **Interactive Feedback & Motion**: Smooth category/format filtering, zoom toggle in the certificate viewer modal, keyboard `ESC` dismissal, and instant file download.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removing All Public Admin / Studio Controls**
  - *Chosen Approach*: Strip all edit, add, and file-upload buttons from the Navbar, Credentials, and Resume sections, and replace placeholder strings (such as `"Editable in Studio"`) with clean, authoritative academic and hackathon details.
  - *Why*: A personal portfolio is a public showcase for recruiters and visitors; exposing editor buttons makes the site feel unfinished or meant for other users to edit.
- **Decision 2: Unified Multi-Format Certificate Asset Engine (`PDF`, `PNG`, `JPG`, `SVG`, `WebP`)**
  - *Chosen Approach*: Support both static certificate files organized in category subdirectories and auto-generated printable/downloadable SVG/PNG/PDF certificate previews so every certificate card can be previewed in-browser and downloaded immediately.
  - *Why*: Ensures visitors can inspect certificates whether they are stored as PDF documents, high-resolution PNG scans, or crisp vector images, without broken links or missing previews.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌─────────────────────────────────────────────────────────────────────────┐
│                Ambati Tharun Sai — Personal Portfolio UI                │
├──────────────────────┬─────────────────────────┬────────────────────────┤
│  Public Navigation   │   Credentials & Certs   │  Projects, Resume &    │
│  (View-Only Header)  │   Multi-Format System   │  Direct Contact Flow   │
└──────────┬───────────┴────────────┬────────────┴───────────┬────────────┘
           │                        │                        │
           ▼                        ▼                        ▼
┌──────────────────────┐ ┌───────────────────────┐ ┌──────────────────────┐
│ Clean Section Links  │ │ Category & File-Type  │ │ Live Render Demos,   │
│ + Contact CTA        │ │ Filter + Folder Tree  │ │ ATS Resume Preview   │
│ (No Studio Buttons)  │ │ (PDF / PNG / Image)   │ │ & Contact Form API   │
└──────────────────────┘ └──────────┬────────────┘ └──────────────────────┘
                                    │
                                    ▼
                         ┌───────────────────────┐
                         │ Certificate Lightbox  │
                         │ PDF Document Frame +  │
                         │ Image Zoom + Download │
                         └───────────────────────┘
```

- **Data Model & State**:
  - Extend `CertificateEntry` with `fileFormat` (`'PDF' | 'PNG' | 'JPG' | 'SVG' | 'WEBP'`), `filePath` (structured directory path such as `/certificates/ai-ml/...`), `fileSize`, and `fileUrl` / `previewUrl`.
  - Provide organized static certificate assets across all supported formats (`PDF`, `PNG`, `SVG`/Image) so every category and format filter works out of the box and new certificate files dropped into the certificate directories are immediately supported.
- **Interactive Component & State Mapping**:
  - **Category & Format Filters**: Client-side filtering across domain categories and file types (`PDF`, `PNG`, `Image / SVG`), plus a toggle between **Grid Cards** and **Folder Structure View**.
  - **Certificate Viewer Modal**: Detects whether the selected certificate is a PDF document or an image (`PNG`, `JPG`, `SVG`, `WEBP`), renders the appropriate interactive preview with zoom/fit controls, and provides a direct **Download** action styled in `#562f54`.
