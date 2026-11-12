// Prints the tree-ring logo in the site's inks with its print grain.
// Reads the supplied artwork (src/assets/logo-source.svg, a JPEG wrapped in an SVG), crops the disc,
// separates its three colours, reprints each in a site ink, and knocks the white grain out of the ink.
// Writes public/logo-inks.png (transparent, for the header) and public/logo-mark.png (on paper, the favicon).
// Run: node scripts/logo.mjs   (sharp comes with Astro)
import fs from 'node:fs';
import zlib from 'node:zlib';
import sharp from 'sharp';

const INKS = { rust: [168, 72, 26], must: [226, 165, 43], olive: [99, 97, 40] };
const PAPER = '#f7ecc9';
const SIZE = 384; // 8x the 48px it is shown at
const GRAIN = Number(process.env.GRAIN ?? 0.9); // how much ink a speck removes
const GRAIN_UNITS = Number(process.env.GRAIN_UNITS ?? 48); // the disc's width in the page grain's px

const svg = fs.readFileSync('src/assets/logo-source.svg', 'utf8');
const art = Buffer.from(svg.match(/base64,([^"]+)/)[1], 'base64');
const { data, info } = await sharp(art).raw().toBuffer({ resolveWithObject: true });
const d = Math.min(info.width, info.height);
const ox = (info.width - d) >> 1;
const oy = (info.height - d) >> 1;

// One ink per pixel, by hue; coverage from blue, which every colour in the artwork lacks.
const px = Buffer.alloc(d * d * 4);
for (let y = 0; y < d; y++) {
	for (let x = 0; x < d; x++) {
		const i = ((y + oy) * info.width + x + ox) * info.channels;
		const edge = d / 2 - Math.hypot(x - d / 2, y - d / 2);
		const a = Math.min(1, (255 - data[i + 2]) / 205) * Math.max(0, Math.min(1, edge));
		if (a <= 0.02) continue;
		const r = (data[i] - (1 - a) * 255) / a; // unmix from the white ground
		const g = (data[i + 1] - (1 - a) * 255) / a;
		const q = g / Math.max(1, r);
		const ink = q < 0.56 ? INKS.rust : q < 0.84 ? INKS.must : INKS.olive;
		px.set([...ink, Math.round(a * 255)], (y * d + x) * 4);
	}
}
const inks = await sharp(px, { raw: { width: d, height: d, channels: 4 } }).resize(SIZE, SIZE).png().toBuffer();

// The same grain the page uses (Layout.astro --grain), at the scale the mark is shown at.
const grain = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${GRAIN_UNITS} ${GRAIN_UNITS}"><filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 3.2 0 0 0 -1.8"/><feComponentTransfer><feFuncA type="linear" slope="${GRAIN}"/></feComponentTransfer></filter><rect width="${GRAIN_UNITS}" height="${GRAIN_UNITS}" filter="url(#g)"/></svg>`,
);
const printed = await sharp(inks).composite([{ input: grain, blend: 'dest-out' }]).png({ compressionLevel: 9 }).toBuffer();

const note = (text) => {
	const body = Buffer.concat([Buffer.from('tEXt'), Buffer.from('impeccable:prompt\0' + text, 'latin1')]);
	const len = Buffer.alloc(4);
	len.writeUInt32BE(body.length - 4);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(zlib.crc32(body) >>> 0);
	return (png) => Buffer.concat([png.subarray(0, 33), len, body, crc, png.subarray(33)]);
};
const origin =
	'ORIGIN (not generated): pre-existing brand asset, The Age Collective tree-ring logo, from the artwork the client supplied (src/assets/logo-source.svg). Cropped to its disc, its three colours separated and reprinted in the site inks rust #a8481a, mustard #e2a52b and olive #636128, with the page print grain knocked out of the ink, by scripts/logo.mjs. Drawing unchanged.';

fs.writeFileSync('public/logo-inks.png', note(origin + ' Transparent ground.')(printed));
const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><circle cx="96" cy="96" r="96" fill="${PAPER}"/></svg>`);
const favicon = await sharp(disc).composite([{ input: await sharp(printed).resize(192, 192).toBuffer() }]).png({ compressionLevel: 9 }).toBuffer();
fs.writeFileSync('public/logo-mark.png', note(origin + ' On a paper disc, 192px, for the favicon.')(favicon));
