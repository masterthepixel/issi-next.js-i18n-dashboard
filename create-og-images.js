const sharp = require('sharp');
const fs = require('fs');

async function createOGImages() {
  const logoPath = 'public/images/issi_logo.webp';
  
  if (!fs.existsSync(logoPath)) {
    console.error('ISSI logo WebP not found!');
    return;
  }

  // Create a 1200x630 OpenGraph template with ISSI branding
  const ogTemplate = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 } // Dark blue background
    }
  });

  // Blog OpenGraph image
  await ogTemplate
    .composite([
      {
        input: logoPath,
        top: 215,
        left: 350,
        blend: 'over'
      },
      {
        input: Buffer.from(
          '<svg width="1200" height="630"><text x="600" y="550" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">ISSI Blog & Insights</text></svg>'
        ),
        top: 0,
        left: 0,
        blend: 'over'
      }
    ])
    .webp({ quality: 90 })
    .toFile('public/images/blog-og.webp');

  // Government Solutions OpenGraph image  
  await ogTemplate
    .composite([
      {
        input: logoPath,
        top: 215,
        left: 350,
        blend: 'over'
      },
      {
        input: Buffer.from(
          '<svg width="1200" height="630"><text x="600" y="550" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">Government Solutions</text></svg>'
        ),
        top: 0,
        left: 0,
        blend: 'over'
      }
    ])
    .webp({ quality: 90 })
    .toFile('public/images/government-solutions-og.webp');

  // Compliance OpenGraph image
  await ogTemplate
    .composite([
      {
        input: logoPath,
        top: 215,
        left: 350,
        blend: 'over'
      },
      {
        input: Buffer.from(
          '<svg width="1200" height="630"><text x="600" y="550" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">Compliance & Security</text></svg>'
        ),
        top: 0,
        left: 0,
        blend: 'over'
      }
    ])
    .webp({ quality: 90 })
    .toFile('public/images/compliance-og.webp');

  console.log('OpenGraph WebP images created successfully!');
}

createOGImages().catch(console.error);
