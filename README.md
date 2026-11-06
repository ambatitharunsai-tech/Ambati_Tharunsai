# Ambati Tharun Sai — Personal Developer & AI Portfolio

A modern, full-stack developer portfolio built for **Ambati Tharun Sai** (Computer Science Engineering Student, Full-Stack Developer & AI Enthusiast from Andhra Pradesh, India).

- **GitHub**: [https://github.com/ambatitharunsai-tech](https://github.com/ambatitharunsai-tech)
- **LinkedIn**: [https://www.linkedin.com/in/tharun-sai-ambati-452249428/](https://www.linkedin.com/in/tharun-sai-ambati-452249428/)
- **Email**: `ambatitharunsai@gmail.com`

---

## Featured Projects & Live Websites

1. **EduNexus AI** — Smart Campus Analytics, student success analytics, academic & placement risk indicators, and student journey tracking ([GitHub](https://github.com/ambatitharunsai-tech/edunexus-ai) | [Live Demo](https://edunexus-ai-web.onrender.com/))
2. **Safe Drinking Water Web** — Water awareness platform with hydration tracker, safety checklist, and community alerts ([GitHub](https://github.com/ambatitharunsai-tech/safe-water-web) | [Live Demo](https://safe-water-web.onrender.com/))
3. **CourseCraft AI** — AI-powered learning curriculum generator with personalized learning paths and PDF/Markdown exports ([GitHub](https://github.com/ambatitharunsai-tech/-CourseCraft) | [Live Demo](https://coursecraft-e1jx.onrender.com/))
4. **Ireagation System** — Smart agriculture application with IoT-based irrigation, crop management, weather integration, and AI agronomist ([GitHub](https://github.com/ambatitharunsai-tech/Ireagation_system))
5. **Hema AI** — NLP-based intelligent assistant featuring semantic search, intent classification, and document analysis ([GitHub](https://github.com/ambatitharunsai-tech/mini_llm))

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion (`motion`), Lucide Icons, shadcn/ui `InteractiveGridPattern`
- **Backend**: Node.js, Express (`server.ts` with `POST /api/contact` & `GET /api/health`)
- **Live Integrations**: GitHub REST API v3 (`/users/ambatitharunsai-tech/repos`), Client-Side Studio Editor with JSON Import/Export

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the full-stack development server on http://localhost:3000
npm run dev

# 3. Verify TypeScript types & production build
npm run lint
npm run build
```

---

## Deploying to Render

This repository is pre-configured for **Render** deployment (either as a Full-Stack Node Web Service or via the included `render.yaml` Blueprint):

1. Push this repository to GitHub (`https://github.com/ambatitharunsai-tech/...`).
2. In the [Render Dashboard](https://dashboard.render.com/), click **New +** → **Web Service** and connect your GitHub repository.
3. Configure the service settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Optional Environment Variables:
   - `NODE_ENV` = `production`
   - `CONTACT_WEBHOOK_URL` = *(optional webhook URL to forward contact form submissions)*
5. Click **Create Web Service**.
