import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svgBuffer = readFileSync(join(root, 'public', 'favicon.svg'));

// Generate 32x32 PNG from SVG
const png32 = await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toBuffer();

// Generate 16x16 PNG from SVG
const png16 = await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toBuffer();

// Generate 48x48 PNG from SVG
const png48 = await sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toBuffer();

// Build ICO file manually (ICO format)
function buildIco(images) {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: 1 = ICO
  header.writeUInt16LE(images.length, 4);  // number of images

  // Each directory entry: 16 bytes
  const dirEntries = [];
  let dataOffset = 6 + images.length * 16;

  for (const { width, height, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);      // color palette
    entry.writeUInt8(0, 3);      // reserved
    entry.writeUInt16LE(1, 4);   // color planes
    entry.writeUInt16LE(32, 6);  // bits per pixel
    entry.writeUInt32LE(data.length, 8);  // image data size
    entry.writeUInt32LE(dataOffset, 12);  // offset
    dirEntries.push(entry);
    dataOffset += data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(i => i.data)]);
}

const ico = buildIco([
  { width: 16, height: 16, data: png16 },
  { width: 32, height: 32, data: png32 },
  { width: 48, height: 48, data: png48 },
]);

writeFileSync(join(root, 'app', 'favicon.ico'), ico);
console.log('✅ Generated favicon.ico (16x16, 32x32, 48x48)');
