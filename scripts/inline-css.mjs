import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const htmlPath = join(distDir, "index.html");

function inlineCss() {
  let html = readFileSync(htmlPath, "utf8");
  const linkRegex = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g;
  let matches = 0;
  html = html.replace(linkRegex, (fullTag, href) => {
    const hrefPath = href.replace(/^\/[^/]+/, "");
    const filePath = join(distDir, hrefPath);
    const css = readFileSync(filePath, "utf8");
    matches++;
    return `<style>${css}</style>`;
  });
  if (matches === 0) {
    console.warn("inline-css: ningun <link rel=stylesheet> encontrado");
    return;
  }
  writeFileSync(htmlPath, html);
  console.log(`inline-css: ${matches} hoja(s) de estilo inlinadas en index.html`);
}

inlineCss();