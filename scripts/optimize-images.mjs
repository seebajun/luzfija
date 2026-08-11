import sharp from "sharp";
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync, rmSync, renameSync } from "fs";
import { join, extname, parse } from "path";
import { fileURLToPath } from "url";

const __dirname = parse(fileURLToPath(import.meta.url)).dir;
const root = join(__dirname, "..");
const targetDirs = [
  { dir: "src/assets/photos", thumbDir: "src/assets/thumbs", width: 311 },
  { dir: "src/assets/photos_gear", thumbDir: "src/assets/thumbs_gear", width: 1080 },
];
const extensions = new Set([".webp"]);
const quality = 50;
const heroQuality = 75;
const heroTargets = new Set(["photo06"]);
const heroVariants = [
  { suffix: "_1080", width: 1080 },
  { suffix: "_664", width: 664 },
  { suffix: "_480", width: 480 },
];
const thumbDir = join(root, "src", "assets", "thumbs");
const heroDir = join(root, "src", "assets", "hero");
const fondoDir = join(root, "src", "assets", "fondos");
const fondoMobileWidth = 480;
const fondoQuality = 40;

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
      if (
        stat.isFile() &&
        extensions.has(extname(entry).toLowerCase()) &&
        !/hero/i.test(entry)
      ) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
}

async function optimize(filePath, thumbDir, width) {
  const parsed = parse(filePath);
  const thumbPath = join(thumbDir, parsed.name + "_thumb.webp");

  if (existsSync(thumbPath)) {
    console.log(`  - ${parsed.base} -> ya existe thumb`);
    skipped++;
  } else {
    mkdirSync(thumbDir, { recursive: true });
    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
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
    for (const variant of heroVariants) {
      const heroPath = join(heroDir, parsed.name + "_hero" + variant.suffix + ".webp");
      if (existsSync(heroPath)) {
        console.log(`  - ${parsed.base} -> ya existe variante hero${variant.suffix || ""}`);
        skipped++;
      } else {
        await sharp(filePath)
          .resize({ width: variant.width, withoutEnlargement: true })
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
}

async function processAll() {
  for (const { dir, thumbDir, width } of targetDirs) {
    const absDir = join(root, dir);
    const absThumbDir = join(root, thumbDir);
    if (!existsSync(absDir)) {
      console.warn(`  Directorio no encontrado: ${dir}`);
      continue;
    }
    const images = getAllImages(absDir);
    console.log(`\n  ${dir} — ${images.length} imagenes encontradas`);

    for (const filePath of images) {
      try {
        await optimize(filePath, absThumbDir, width);
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

  for (const name of ["Fondo01", "Fondo02"]) {
    const srcPath = join(fondoDir, name + ".webp");
    const mobPath = join(fondoDir, name + "_480.webp");
    if (!existsSync(srcPath)) continue;
    if (existsSync(mobPath) && (await sharp(mobPath).metadata()).width === fondoMobileWidth) {
      console.log(`  - ${parse(mobPath).base} -> ya esta en ${fondoMobileWidth}px`);
      continue;
    }
    const beforeFondo = existsSync(mobPath) ? statSync(mobPath).size : 0;
    const buffer = await sharp(srcPath)
      .resize({ width: fondoMobileWidth, withoutEnlargement: true })
      .webp({ quality: fondoQuality })
      .toBuffer();
    if (existsSync(mobPath)) {
      const tmpFondo = join(fondoDir, "_fondo_tmp.webp");
      writeFileSync(tmpFondo, buffer);
      rmSync(mobPath, { force: true });
      renameSync(tmpFondo, mobPath);
    } else {
      writeFileSync(mobPath, buffer);
    }
    const afterFondo = statSync(mobPath).size;
    console.log(
      `  + ${parse(mobPath).base} (${formatBytes(beforeFondo)} -> ${formatBytes(afterFondo)})`,
    );
    converted++;
  }

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