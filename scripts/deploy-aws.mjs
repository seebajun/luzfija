import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");

const bucket = process.env.AWS_S3_BUCKET || process.env.npm_config_bucket;
const distributionId = process.env.AWS_CF_DISTRIBUTION_ID || process.env.npm_config_distribution;

function run(args) {
  const cmd = args
    .map((a) => (/\s/.test(a) ? `"${a}"` : a))
    .join(" ");
  console.log(`\n$ aws ${cmd}`);
  execSync(`aws ${cmd}`, { cwd: root, stdio: "inherit", shell: true });
}

if (!bucket) {
  console.error(
    "Falta el bucket S3. Usa: npm run deploy --bucket=tu-bucket (o AWS_S3_BUCKET=...)",
  );
  process.exit(1);
}

if (!existsSync(distDir)) {
  console.error(`No existe ${distDir}. Corre primero 'npm run build'.`);
  process.exit(1);
}

console.log(`================ DEPLOY S3 ================\n`);
console.log(`Bucket: ${bucket}`);

run([
  "s3", "sync", `${distDir}/`, `s3://${bucket}/`,
  "--delete",
  "--cache-control", "public, max-age=31536000, immutable",
  "--exclude", "index.html",
  "--exclude", "404.html",
]);

run([
  "s3", "sync", `${distDir}/`, `s3://${bucket}/`,
  "--exclude", "*",
  "--include", "index.html",
  "--include", "404.html",
  "--cache-control", "no-cache",
]);

if (distributionId) {
  run([
    "cloudfront", "create-invalidation",
    "--distribution-id", distributionId,
    "--paths", "/*",
  ]);
} else {
  console.log(
    "\nSaltando invalidacion de CloudFront (define AWS_CF_DISTRIBUTION_ID o --distribution=...)",
  );
}

console.log("\nDeploy completado.");