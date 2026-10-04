import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// The PNG inputs are frames extracted from the existing, owner-supplied recordings.
// This optional maintenance script is separate from the normal production build.
const input = process.argv[2] || ".cache/media";
const output = "client/public/assets/projects";
await mkdir(output, { recursive: true });
const items = [
  {
    slug: "finsight",
    frame: 5,
    crop: { left: 0, top: 80, width: 1280, height: 596 },
    title: ["FinSight"],
    label: "Role-aware knowledge · RAG + SQL",
    color: "#64D8C3",
    time: "49.84s",
  },
  {
    slug: "ai-code-review-agent",
    frame: 5,
    crop: { left: 0, top: 78, width: 1280, height: 594 },
    title: ["AI Code", "Review Agent"],
    label: "Deterministic checks · inspectable evidence",
    color: "#B6A3F6",
    time: "33.2s",
  },
  {
    slug: "factscope-ai",
    frame: 4,
    title: ["Factscope AI"],
    label: "Claim verification · source-aware verdicts",
    color: "#F1C68B",
    time: "20.43s",
  },
];
const shareImage = (title, label, color) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0B1120"/><rect x="780" y="50" width="360" height="530" rx="28" fill="#121B2D" stroke="#263347"/><path d="M860 225H1060M960 225V405M860 315H1060" fill="none" stroke="${color}" stroke-width="2"/><rect x="830" y="176" width="260" height="98" rx="15" fill="#192A39" stroke="${color}"/><rect x="830" y="300" width="260" height="98" rx="15" fill="#192A39" stroke="#3C4E61"/><rect x="830" y="424" width="260" height="65" rx="15" fill="#192A39" stroke="#3C4E61"/><g font-family="Arial, sans-serif"><text x="70" y="115" font-size="25" fill="${color}">HAMZA ALI / AI ENGINEERING</text>${title.map((line, index) => `<text x="70" y="${260 + index * 82}" font-size="68" font-weight="700" fill="#F3F6FB">${line}</text>`).join("")}<text x="70" y="465" font-size="23" fill="#B7C3D4">${label}</text><text x="70" y="545" font-size="21" fill="${color}">Architecture. Decisions. Evidence.</text><text x="870" y="235" font-size="23" fill="#F3F6FB">Retrieve</text><text x="870" y="359" font-size="23" fill="#F3F6FB">Reason</text><text x="870" y="465" font-size="23" fill="#F3F6FB">Verify</text></g></svg>`
  );
for (const item of items) {
  let frame = sharp(path.join(input, `${item.slug}-${item.frame}.png`));
  if (item.crop) frame = frame.extract(item.crop);
  const normalized = await frame
    .resize(1280, 720, { fit: "contain", background: "#0B1120" })
    .png()
    .toBuffer();
  for (const width of [480, 800, 1280])
    await sharp(normalized)
      .resize(width)
      .webp({ quality: 82 })
      .toFile(`${output}/${item.slug}-${width}.webp`);
  await sharp(shareImage(item.title, item.label, item.color))
    .jpeg({ quality: 90 })
    .toFile(`${output}/${item.slug}-share.jpg`);
  console.log(`${item.slug}: walkthrough frame at ${item.time}`);
}
await sharp(
  shareImage(
    ["Useful", "intelligence."],
    "GenAI / AI-ML Engineer · Selected work",
    "#64D8C3"
  )
)
  .jpeg({ quality: 90 })
  .toFile("client/public/assets/og-image.jpg");
