import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredContactMessage {
  receiptId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-submissions.json');

function saveSubmissionToDisk(entry: StoredContactMessage): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: StoredContactMessage[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.unshift(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist contact submission to disk:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  // Healthcheck endpoint for Render deployment
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'ambati-tharun-sai-portfolio',
      timestamp: new Date().toISOString(),
    });
  });

  // Real Backend Contact Submission Endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const name = String(req.body?.name || '').trim();
      const email = String(req.body?.email || '').trim();
      const subject = String(req.body?.subject || 'Portfolio Inquiry').trim();
      const message = String(req.body?.message || '').trim();

      if (name.length < 2) {
        res.status(400).json({
          ok: false,
          error: 'Please enter your name (at least 2 characters).',
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          ok: false,
          error: 'Please provide a valid email address.',
        });
        return;
      }

      if (message.length < 10) {
        res.status(400).json({
          ok: false,
          error: 'Please write a message of at least 10 characters.',
        });
        return;
      }

      const receiptId = `ATS-${Date.now().toString(36).toUpperCase()}`;
      const receivedAt = new Date().toISOString();

      const record: StoredContactMessage = {
        receiptId,
        name,
        email,
        subject,
        message,
        receivedAt,
      };

      saveSubmissionToDisk(record);

      // Optional webhook forwarding if CONTACT_WEBHOOK_URL is configured on Render
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
          });
        } catch (webhookErr) {
          console.warn('Webhook forwarding failed:', webhookErr);
        }
      }

      res.status(201).json({
        ok: true,
        receiptId,
        receivedAt,
        recipient: 'ambatitharunsai@gmail.com',
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: error instanceof Error ? error.message : 'Internal server error processing inquiry.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
