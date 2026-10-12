// Valida data/apps.json contra data/schema.json + regras de consistência.
// Roda no CI (validate.yml) e localmente: `npm run validate` ou `node scripts/validate.mjs`.
import { readFileSync } from "node:fs";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const schema = JSON.parse(readFileSync("data/schema.json", "utf8"));
const data = JSON.parse(readFileSync("data/apps.json", "utf8"));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

if (!validate(data)) {
  for (const e of validate.errors) console.error(`✗ ${e.instancePath} ${e.message}`);
  process.exit(1);
}

const catIds = new Set(data.categories.map((c) => c.id));
const names = new Set();
const urls = new Set();

for (const i of data.initiatives) {
  if (!catIds.has(i.category)) fail(`categoria desconhecida "${i.category}" em "${i.name}"`);
  const key = i.name.toLowerCase();
  if (names.has(key)) fail(`iniciativa duplicada: ${i.name}`);
  if (urls.has(i.url)) fail(`URL duplicada: ${i.url}`);
  names.add(key);
  urls.add(i.url);
}

console.log(`✓ ${data.initiatives.length} iniciativas em ${data.categories.length} categorias — dados válidos`);
