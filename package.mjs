import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";

// Explicit allowlist: never package the repository, environment, or reviewer credentials.
const root = resolve(import.meta.dirname);
const manifest = JSON.parse(readFileSync(join(root, "plugin.json"), "utf8"));
const mcp = JSON.parse(readFileSync(join(root, "mcp.json"), "utf8"));
const ui = manifest.extensions["com.openai"].interface;
for (const [key, limit] of [["displayName", 30], ["shortDescription", 30], ["longDescription", 4000]]) {
  if (!ui[key]?.trim() || ui[key].length > limit) throw new Error(`Invalid ${key}`);
}
for (const key of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
  const url = new URL(ui[key]);
  if (url.protocol !== "https:" || url.username || url.password) throw new Error(`Invalid ${key}`);
}
const cases = manifest.extensions["com.openai"].review.test_cases;
if (cases.positive.length !== 5 || cases.negative.length !== 3) throw new Error("Need five positive and three negative cases");
const server = mcp.mcpServers["frontkom-sites"];
if (Object.keys(mcp.mcpServers).length !== 1 || server.url !== "https://sites.frontkom.io/mcp" || server.type !== "streamable-http" || server.headers || server.extensions["com.openai"].auth.client.mode !== "dcr") throw new Error("Unexpected MCP configuration");
const files = ["plugin.json", "mcp.json", ...readdirSync(join(root, "assets")).map((f) => `assets/${f}`)];
for (const file of files) {
  if (!/^(plugin\.json|mcp\.json|assets\/[a-z0-9-]+\.(svg|png))$/.test(file)) throw new Error(`Unexpected package file: ${file}`);
  const text = readFileSync(join(root, file), "utf8");
  if (/frs[okrc]_|sb_secret_|clientSecret|test_credentials|reviewer_instructions/.test(text)) throw new Error(`Possible credential in ${file}`);
}
for (const key of ["logo", "composerIcon"]) {
  if (!files.includes(ui[key].replace(/^\.\//, ""))) throw new Error(`Missing ${key}`);
}
const out = resolve(import.meta.dirname, "out");
mkdirSync(out, { recursive: true });
const archive = join(out, `frontkom-sites-${manifest.version}.zip`);
// Remove an earlier archive before rebuilding so removed files cannot survive in it.
execFileSync("python3", ["-c", "import sys,zipfile,pathlib; root=pathlib.Path(sys.argv[1]); z=zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED); [z.write(root/f,f) for f in sys.argv[3:]]; z.close()", root, archive, ...files]);
console.log(archive);
console.log("Package checks passed. Portal checks and reviewer walkthrough remain separate requirements.");
