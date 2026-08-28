const sharp = require('sharp');
const path = require('path');

async function compress() {
  // Logo: 1169x1045 PNG → WebP (60-100KB 目标)
  const logoIn = '/opt/saw/public/logo.png';
  const logoWebp = '/opt/saw/public/logo.webp';
  await sharp(logoIn)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(logoWebp);
  console.log('logo.webp:', (require('fs').statSync(logoWebp).size / 1024).toFixed(1), 'KB');

  // Hero poster: 1920x1080 JPEG → JPEG 压缩 (150-250KB 目标)
  const posterIn = '/opt/saw/public/hero-poster.jpg';
  const posterJpg = '/opt/saw/public/hero-poster-mini.jpg';
  await sharp(posterIn)
    .resize(1280, null, { withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true })
    .toFile(posterJpg);
  console.log('hero-poster-mini.jpg:', (require('fs').statSync(posterJpg).size / 1024).toFixed(1), 'KB');
}

compress().catch(e => { console.error(e); process.exit(1); });
