import sharp from "sharp";
import { readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { join, extname, parse } from "path";
import { fileURLToPath } from "url";

const __dirname = parse(fileURLToPath(import.meta.url)).dir;
const root = join(__dirname, "..");
const targetDirs = ["src/assets/photos"];
const extensions = new Set([".webp"]);
const thumbWidth = 400;
const quality = 72;
const heroWidth = 1400;
const heroQuality = 75;
const heroTargets = new Set(["photo06"]);

let converted = 0;
let skipped = 0;
let failed = 0;

function getAllImages(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isFile() && extensions.has(extname(entry).toLowerCase())) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
}

async function optimize(filePath, thumbDir) {
  const parsed = parse(filePath);
  const thumbPath = join(thumbDir, parsed.name + "_thumb.webp");

  if (existsSync(thumbPath)) {
    console.log(`  - ${parsed.base} -> ya existe thumb`);
    skipped++;
  } else {
    mkdirSync(thumbDir, { recursive: true });
    await sharp(filePath)
      .resize({ width: thumbWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(thumbPath);

    const before = statSync(filePath).size;
    const after = statSync(thumbPath).size;
    console.log(
      `  + ${parsed.base} -> ${parse(thumbPath).base} (${formatBytes(before)} -> ${formatBytes(after)})`,
    );
    converted++;
  }

  if (heroTargets.has(parsed.name)) {
    const heroPath = join(parsed.dir, parsed.name + "_hero.webp");
    if (existsSync(heroPath)) {
      console.log(`  - ${parsed.base} -> ya existe variante hero`);
      skipped++;
    } else {
      await sharp(filePath)
        .resize({ width: heroWidth, withoutEnlargement: true })
        .webp({ quality: heroQuality })
        .toFile(heroPath);
      const heroAfter = statSync(heroPath).size;
      console.log(
        `  + ${parsed.base} -> ${parse(heroPath).base} (${formatBytes(heroAfter)})`,
      );
      converted++;
    }
  }
}

async function processAll() {
  for (const relDir of targetDirs) {
    const absDir = join(root, relDir);
    if (!existsSync(absDir)) {
      console.warn(`  Directorio no encontrado: ${relDir}`);
      continue;
    }
    const thumbDir = join(absDir, "thumbs");
    const images = getAllImages(absDir);
    console.log(`\n  ${relDir} — ${images.length} imagenes encontradas`);

    for (const filePath of images) {
      try {
        await optimize(filePath, thumbDir);
      } catch (err) {
        console.log(`  X ${parse(filePath).base}: ${err.message.split("\n")[0]}`);
        failed++;
      }
    }
  }

  console.log("\n=================================");
  console.log(`Generados: ${converted}`);
  console.log(`Omitidos (ya existian): ${skipped}`);
  console.log(`Fallidos: ${failed}`);
  console.log("=================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

processAll();