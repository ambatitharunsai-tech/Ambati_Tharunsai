# Ambati Tharun Sai – Developer Portfolio

A full-stack personal portfolio that presents projects, technical interests and contact information. The interface is built with React, TypeScript, Vite and Tailwind CSS, with an Express server for backend endpoints.

**Portfolio repository:** https://github.com/ambatitharunsai-tech/Ambati_Tharunsai  
**GitHub profile:** https://github.com/ambatitharunsai-tech  
**LinkedIn:** https://www.linkedin.com/in/tharun-sai-ambati-452249428/

## Highlights

- Responsive portfolio interface and project showcase
- Project and technology sections
- GitHub repository integration for displaying public project information
- Contact form backed by an Express API
- Contact submission validation and receipt IDs
- Health endpoint for deployment checks
- Certificate assets organized under `public/certificates/`

## Technology

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4
- Motion and Lucide icons
- Three.js
- Node.js and Express
- TypeScript runtime via `tsx`

## Run locally

Requirements: a recent Node.js version and npm.

```bash
git clone https://github.com/ambatitharunsai-tech/Ambati_Tharunsai.git
cd Ambati_Tharunsai
npm install
npm run dev
```

Open the local URL printed by Vite/Express in the terminal.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the frontend assets with Vite |
| `npm run lint` | Run the TypeScript type check |
| `npm run start` | Start the production server |
| `npm run preview` | Preview the built frontend |

Before publishing, run:

```bash
npm run lint
npm run build
```

## Backend endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns a service health response |
| `POST` | `/api/contact` | Validates and records a contact submission |

Contact submissions are written to the server's local `data/contact-submissions.json` file by the current server implementation. On hosts with ephemeral filesystems this storage may not survive redeploys or restarts; configure persistent storage or a database before relying on it for production inquiries.

## Deploy to Render

The repository includes a `render.yaml` deployment configuration. It can also be deployed as a Node web service using the repository's scripts:

- **Build command:** `npm install && npm run build`
- **Start command:** `npm run start`
- **Environment:** `NODE_ENV=production`
- **Port:** Render supplies `PORT`

Do not commit private environment values or contact-submission data.

## Certificates

See [public/certificates/README.md](public/certificates/README.md) for the directory's certificate organization.
