const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table & calculation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([len, typeAndData, crcBuf]);
}

function createPng(size, drawFn) {
  const width = size;
  const height = size;

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    raw[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      raw[pixelOffset] = r;
      raw[pixelOffset + 1] = g;
      raw[pixelOffset + 2] = b;
      raw[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function drawLogo(x, y, w, h) {
  const nx = (x - w / 2) / (w / 2);
  const ny = (y - h / 2) / (h / 2);
  const r = Math.sqrt(nx * nx + ny * ny);

  const cornerR = 0.25;
  const qx = Math.max(Math.abs(nx) - (1 - cornerR), 0);
  const qy = Math.max(Math.abs(ny) - (1 - cornerR), 0);
  const dDist = Math.sqrt(qx * qx + qy * qy);

  if (dDist > cornerR) {
    return [0, 0, 0, 0];
  }

  const bgGrad = (ny + 1) / 2;
  let bgR = Math.round(15 + 15 * bgGrad);
  let bgG = Math.round(23 + 20 * bgGrad);
  let bgB = Math.round(42 + 50 * bgGrad);

  if (r < 0.14) {
    return [97, 218, 251, 255];
  }

  const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];
  let inOrbit = false;

  for (const a of angles) {
    const cosA = Math.cos(-a);
    const sinA = Math.sin(-a);
    const rx = nx * cosA - ny * sinA;
    const ry = nx * sinA + ny * cosA;

    const aAxis = 0.58;
    const bAxis = 0.22;
    const ellipseDist = (rx * rx) / (aAxis * aAxis) + (ry * ry) / (bAxis * bAxis);
    if (Math.abs(ellipseDist - 1.0) < 0.22) {
      inOrbit = true;
      break;
    }
  }

  if (inOrbit) {
    return [97, 218, 251, 255];
  }

  return [bgR, bgG, bgB, 255];
}

const publicDir = path.resolve(__dirname, '..', 'public');

const sizes = [
  { file: 'pwa-192x192.png', size: 192 },
  { file: 'pwa-512x512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 }
];

for (const { file, size } of sizes) {
  const png = createPng(size, drawLogo);
  fs.writeFileSync(path.join(publicDir, file), png);
  console.log(`Generated ${file} (${size}x${size}, ${png.length} bytes)`);
}
