// Renderiza README.md como página HTML estática (usado no deploy.yml).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { Marked } from "marked";

const REPO = "https://github.com/wesleymatosdev/awesome-brazil";

const md = readFileSync("README.md", "utf8");
const marked = new Marked({ gfm: true });

// Links relativos (LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md) apontam pro repo.
const html = marked
  .parse(md)
  .replace(/href="(CONTRIBUTING\.md|CODE_OF_CONDUCT\.md|LICENSE)"/g, `href="${REPO}/blob/main/$1"`);

const css = readFileSync("node_modules/github-markdown-css/github-markdown-light.css", "utf8");

const page = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Awesome Iniciativas — iniciativas brasileiras de tecnologia aberta</title>
  <meta name="description" content="Lista curada de iniciativas brasileiras de tecnologia aberta: dados abertos, civic tech, comunidades e ferramentas.">
  <style>${css}</style>
  <style>
    .markdown-body { box-sizing: border-box; min-width: 200px; max-width: 880px; margin: 0 auto; padding: 45px; }
    @media (max-width: 767px) { .markdown-body { padding: 15px; } }
  </style>
</head>
<body>
  <article class="markdown-body">${html}</article>
</body>
</html>`;

mkdirSync("_site");
writeFileSync("_site/index.html", page);
copyFileSync("README.md", "_site/README.md");
console.log("página gerada");
