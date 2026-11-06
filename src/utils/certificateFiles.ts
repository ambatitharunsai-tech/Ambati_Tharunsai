import { CertificateEntry, CertificateFileFormat } from '../types/portfolio';

/**
 * Generates a high-resolution SVG certificate preview data URI for any certificate
 * when a custom raster image is not provided, and supports exporting to PNG, JPG, SVG, or PDF.
 */
export function buildCertificateSvgMarkup(cert: CertificateEntry, holderName = 'Ambati Tharun Sai'): string {
  const safeName = escapeXml(cert.name);
  const safeIssuer = escapeXml(cert.issuer);
  const safeDate = escapeXml(cert.issueDate);
  const safeId = escapeXml(cert.credentialId || 'ATS-CERT-2026');
  const safeCategory = escapeXml(cert.category.toUpperCase());
  const safeSkill = escapeXml(cert.relatedSkill);
  const safeFormat = escapeXml(cert.fileFormat || 'PDF');
  const safePath = escapeXml(
    cert.folderPath && cert.fileName ? `${cert.folderPath}/${cert.fileName}` : 'certificates/verified'
  );
  const safeHolder = escapeXml(holderName);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 840" width="1200" height="840">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141414" />
      <stop offset="50%" stop-color="#1E1E1E" />
      <stop offset="100%" stop-color="#0D0D0D" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#562f54" />
      <stop offset="50%" stop-color="#8a4f87" />
      <stop offset="100%" stop-color="#562f54" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="840" fill="url(#bgGrad)" />
  <rect width="1200" height="840" fill="url(#grid)" />

  <!-- Outer & Inner Borders -->
  <rect x="36" y="36" width="1128" height="768" rx="12" fill="none" stroke="#333333" stroke-width="2" />
  <rect x="52" y="52" width="1096" height="736" rx="8" fill="none" stroke="#562f54" stroke-width="2" />

  <!-- Top Accent Ribbon -->
  <rect x="52" y="52" width="1096" height="10" fill="url(#accentGrad)" />

  <!-- Header Metadata -->
  <text x="100" y="120" fill="#B8B8B8" font-family="monospace" font-size="15" font-weight="bold" letter-spacing="3">
    VERIFIED TECHNICAL CREDENTIAL · ${safeCategory}
  </text>
  <rect x="970" y="96" width="130" height="34" rx="6" fill="#562f54" />
  <text x="1035" y="118" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">
    ${safeFormat} FILE
  </text>

  <!-- Divider -->
  <line x1="100" y1="150" x2="1100" y2="150" stroke="#333333" stroke-width="1.5" />

  <!-- Certificate Main Heading -->
  <text x="100" y="215" fill="#858585" font-family="sans-serif" font-size="16" letter-spacing="4" font-weight="bold">
    CERTIFICATE OF COMPLETION &amp; TECHNICAL PROFICIENCY
  </text>

  <text x="100" y="275" fill="#B8B8B8" font-family="sans-serif" font-size="18">
    This is to certify that
  </text>

  <!-- Recipient Name -->
  <text x="100" y="345" fill="#F5F4F0" font-family="sans-serif" font-size="48" font-weight="bold">
    ${safeHolder}
  </text>
  <line x1="100" y1="368" x2="680" y2="368" stroke="#562f54" stroke-width="3" />

  <text x="100" y="420" fill="#B8B8B8" font-family="sans-serif" font-size="18">
    has successfully completed the verified technical program &amp; assessment in
  </text>

  <!-- Certificate Title -->
  <text x="100" y="480" fill="#EDECE8" font-family="sans-serif" font-size="34" font-weight="bold">
    ${safeName}
  </text>

  <!-- Skill & Domain Pill -->
  <rect x="100" y="515" width="1000" height="74" rx="8" fill="#252525" stroke="#333333" stroke-width="1.5" />
  <text x="128" y="546" fill="#858585" font-family="monospace" font-size="13" font-weight="bold">
    CORE COMPETENCY &amp; VERIFIED SKILL DOMAIN
  </text>
  <text x="128" y="572" fill="#F5F4F0" font-family="monospace" font-size="17" font-weight="bold">
    ${safeSkill}
  </text>

  <!-- Footer Metadata Grid -->
  <line x1="100" y1="640" x2="1100" y2="640" stroke="#333333" stroke-width="1.5" />

  <text x="100" y="678" fill="#858585" font-family="monospace" font-size="13">ISSUING ORGANIZATION</text>
  <text x="100" y="706" fill="#F5F4F0" font-family="sans-serif" font-size="20" font-weight="bold">${safeIssuer}</text>

  <text x="480" y="678" fill="#858585" font-family="monospace" font-size="13">ISSUE DATE</text>
  <text x="480" y="706" fill="#F5F4F0" font-family="monospace" font-size="18" font-weight="bold">${safeDate}</text>

  <text x="720" y="678" fill="#858585" font-family="monospace" font-size="13">CREDENTIAL ID</text>
  <text x="720" y="706" fill="#EDECE8" font-family="monospace" font-size="18" font-weight="bold">${safeId}</text>

  <!-- File Structure Path Footer -->
  <text x="100" y="756" fill="#858585" font-family="monospace" font-size="13">
    FILE STRUCTURE PATH: /${safePath}
  </text>
  <text x="1100" y="756" fill="#B8B8B8" font-family="monospace" font-size="13" text-anchor="end">
    github.com/ambatitharunsai-tech
  </text>
</svg>`;
}

export function getCertificatePreviewDataUrl(cert: CertificateEntry, holderName?: string): string {
  if (
    cert.previewUrl &&
    (cert.previewUrl.startsWith('data:image/') || cert.previewUrl.startsWith('http'))
  ) {
    return cert.previewUrl;
  }
  const svg = buildCertificateSvgMarkup(cert, holderName);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates a valid, standards-compliant single-page PDF file containing the certificate details
 * so visitors can download a real `.pdf` document for any certificate.
 */
export function buildCertificatePdfBlob(cert: CertificateEntry, holderName = 'Ambati Tharun Sai'): Blob {
  const lines = [
    'VERIFIED TECHNICAL CERTIFICATE',
    '------------------------------------------------------------',
    `Recipient:        ${holderName}`,
    `Certificate:      ${cert.name}`,
    `Issuing Body:     ${cert.issuer}`,
    `Category:         ${cert.category}`,
    `Related Skills:   ${cert.relatedSkill}`,
    `Issue Date:       ${cert.issueDate}`,
    `Credential ID:    ${cert.credentialId || 'Verified Portfolio Record'}`,
    `File Structure:   /${cert.folderPath || 'certificates'}/${cert.fileName || 'certificate.pdf'}`,
    `Original Format:  ${cert.fileFormat || 'PDF'}`,
    '------------------------------------------------------------',
    `Summary: ${cert.description || 'Verified technical completion and project competency record.'}`,
    'Portfolio: https://github.com/ambatitharunsai-tech',
  ];

  const escapedLines = lines.map((line) =>
    line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  );

  let textOps = 'BT\n/F1 18 Tf\n54 740 Td\n(AMBATI THARUN SAI - PORTFOLIO CREDENTIAL) Tj\n/F1 11 Tf\n0 -28 Td\n';
  for (const line of escapedLines) {
    textOps += `(${line}) Tj\n0 -20 Td\n`;
  }
  textOps += 'ET';

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
    `4 0 obj\n<< /Length ${textOps.length} >>\nstream\n${textOps}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

/**
 * Exports a certificate in the requested target format (PDF, PNG, JPG, SVG, WEBP)
 * and triggers a browser file download.
 */
export async function downloadCertificateInFormat(
  cert: CertificateEntry,
  targetFormat: CertificateFileFormat,
  holderName = 'Ambati Tharun Sai'
): Promise<void> {
  const baseSlug = (cert.fileName || cert.name)
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9-_]+/gi, '_')
    .replace(/^_+|_+$/g, '');

  if (targetFormat === 'PDF') {
    const blob = buildCertificatePdfBlob(cert, holderName);
    triggerBlobDownload(blob, `${baseSlug}.pdf`);
    return;
  }

  if (targetFormat === 'SVG') {
    const svg = buildCertificateSvgMarkup(cert, holderName);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    triggerBlobDownload(blob, `${baseSlug}.svg`);
    return;
  }

  // Rasterize SVG to PNG, JPG, or WEBP via HTML5 Canvas
  const svg = buildCertificateSvgMarkup(cert, holderName);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to render certificate image'));
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const mimeType =
      targetFormat === 'JPG'
        ? 'image/jpeg'
        : targetFormat === 'WEBP'
          ? 'image/webp'
          : 'image/png';
    const ext = targetFormat.toLowerCase();

    const dataUrl = canvas.toDataURL(mimeType, 0.95);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${baseSlug}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
