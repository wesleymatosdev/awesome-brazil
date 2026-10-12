# Hub de Iniciativas

Hub colaborativo de iniciativas de tecnologia — inspirado no conceito do [comitedetecnologia.com.br](https://comitedetecnologia.com.br) ("Aplicativos da Virada"), mas construído do zero com **práticas de colaboração aberta**: sem formulários fechados, sem dados travados. O catálogo inteiro vive neste repositório, e qualquer pessoa pode contribuir.

**Em produção:** _deploy via Cloudflare Pages (subdomínio a definir) — ou rode localmente, é um site 100% estático._

## Como funciona

- `index.html` + `styles.css` + `app.js` — o site (sem frameworks, sem build, sem dependências de runtime)
- [`data/apps.json`](data/apps.json) — **o catálogo**. Cada iniciativa é uma entrada aqui.
- [`data/schema.json`](data/schema.json) — o contrato dos dados, validado no CI
- [`scripts/validate.mjs`](scripts/validate.mjs) — valida schema + regras de consistência (sem duplicatas, categorias conhecidas)

## Contribuir

Leia o [CONTRIBUTING.md](CONTRIBUTING.md). Em resumo:

1. **Sabe programar?** Faça um fork, adicione sua iniciativa em `data/apps.json` e abra um PR. O CI valida automaticamente.
2. **Não mexe com código?** [Abra uma issue](https://github.com/wesleymatosdev/community-hub/issues/new?template=nova-iniciativa.yml) com o template "Nova iniciativa" e alguém da comunidade entra com o PR.

## Rodar localmente

```sh
# qualquer servidor estático serve; por exemplo:
python3 -m http.server 8080
# ou:
npx serve .
# abra http://localhost:8080
```

## Validar dados localmente

```sh
npm install
npm run validate
```

## Licença

[MIT](LICENSE) — copie, adapte e rode seu próprio hub. É para isso que ele existe.
