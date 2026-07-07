import sharp from "sharp";
import { execSync } from "child_process";
import { readdirSync, statSync, unlinkSync, existsSync } from "fs";
import { join, extname, parse } from "path";
import { fileURLToPath } from "url";

const __dirname = parse(fileURLToPath(import.meta.url)).dir;
const root = join(__dirname, "..");
const targetDirs = ["src/assets/photos", "src/assets/photos_gear"];
const extensions = new Set([".jpeg", ".jpg", ".png", ".heic", ".HEIC"]);
const quality = 80;

let converted = 0;
let skipped = 0;
let failed = 0;
let totalSaved = 0;
let totalOriginal = 0;

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

async function convertWithSharp(filePath, outputPath) {
  const inputSize = statSync(filePath).size;
  await sharp(filePath).webp({ quality }).toFile(outputPath);
  return inputSize;
}

function convertWithPython(filePath, outputPath) {
  // Escape paths for Python
  const pyScript = `
from PIL import Image
import pillow_heif
pillow_heif.register_heif_opener()
img = Image.open(r"${filePath}")
img.save(r"${outputPath}", "WEBP", quality=${quality})
print(img.size[0])
`;

  const result = execSync("python", {
    input: pyScript,
    encoding: "utf-8",
    timeout: 30000,
  });

  if (!existsSync(outputPath) || statSync(outputPath).size === 0) {
    throw new Error("Python conversion produced empty output");
  }
  return statSync(filePath).size;
}

async function processAll() {
  for (const relDir of targetDirs) {
    const absDir = join(root, relDir);
    if (!existsSync(absDir)) {
      console.warn(`  Directorio no encontrado: ${relDir}`);
      continue;
    }

    const images = getAllImages(absDir);
    console.log(`\n  ${relDir} — ${images.length} imagenes encontradas`);

    for (const filePath of images) {
      const parsed = parse(filePath);
      const outputPath = join(parsed.dir, parsed.name + ".webp");

      if (existsSync(outputPath)) {
        console.log(`  - ${parsed.base} -> ya existe .webp`);
        skipped++;
        continue;
      }

      try {
        const inputSize = await convertWithSharp(filePath, outputPath);
        finishConversion(filePath, outputPath, inputSize, parsed.base);
      } catch (sharpErr) {
        if (parsed.ext.toLowerCase() === ".heic") {
          try {
            const inputSize = convertWithPython(filePath, outputPath);
            finishConversion(filePath, outputPath, inputSize, parsed.base);
          } catch (pyErr) {
            console.log(`  X ${parsed.base}: sharp y python fallaron`);
            failed++;
          }
        } else {
          console.log(`  X ${parsed.base}: ${sharpErr.message.split("\n")[0]}`);
          failed++;
        }
      }
    }
  }

  console.log("\n=================================");
  console.log(`Convertidos: ${converted}`);
  console.log(`Omitidos (ya existian): ${skipped}`);
  console.log(`Fallidos: ${failed}`);
  if (totalOriginal > 0) {
    const pct = ((totalSaved / totalOriginal) * 100).toFixed(1);
    console.log(`Espacio original: ${formatBytes(totalOriginal)}`);
    console.log(`Espacio ahorrado: ${formatBytes(totalSaved)} (${pct}%)`);
  }
  console.log("=================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

function finishConversion(filePath, outputPath, inputSize, base) {
  const outputSize = statSync(outputPath).size;
  const saved = inputSize - outputSize;
  totalSaved += saved;
  totalOriginal += inputSize;

  unlinkSync(filePath);
  console.log(`  + ${base} -> ${parse(outputPath).name}.webp (${formatBytes(inputSize)} -> ${formatBytes(outputSize)}, ahorrado ${formatBytes(saved)})`);
  converted++;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

processAll();
