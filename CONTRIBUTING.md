# Contributing / Como contribuir

Obrigado pelo interesse! Este projeto existe para ser construído em comunidade. Contribution guidelines in pt-BR (project language) with English welcome.

## Tipos de contribuição

### 1. Adicionar uma iniciativa ao hub

**Opção A — Pull Request (recomendado):**

1. Faça um fork do repositório e crie uma branch: `git checkout -b minha-iniciativa`
2. Edite `data/apps.json` e adicione sua entrada no array `initiatives`:

```json
{
  "name": "Nome da iniciativa",
  "description": "O que ela faz, em uma ou duas frases (10–280 caracteres).",
  "url": "https://site-da-iniciativa.org",
  "repo": "https://github.com/org/repo",
  "category": "ferramentas",
  "tags": ["tag1", "tag2"],
  "added": "2026-10-12"
}
```

3. Valide localmente: `npm install && npm run validate`
4. Abra o PR descrevendo a iniciativa. O CI roda a mesma validação.

**Opção B — Issue (sem código):**
Use o template **"Nova iniciativa"** ao [criar uma issue](https://github.com/wesleymatosdev/community-hub/issues/new?template=nova-iniciativa.yml). Alguém da comunidade transformará sua sugestão em PR.

### 2. Outras contribuições

- **Correções** (descrição errada, link quebrado, iniciativa descontinuada): PR ou issue — os dois são bem-vindos.
- **Melhorias no site**: PRs de acessibilidade, performance e design são muito bem-vindos. Sem framework/build — mantenha simples.
- **Reportar conteúdo indevido**: abra uma issue com a label `report`; a entrada será removida até esclarecimento.

## Regras do catálogo

- Só iniciaativas **reais e acessíveis** — nada de páginas em construção.
- `url` deve ser **HTTPS**.
- Sem duplicatas (validado no CI).
- A categoria precisa existir em `data/apps.json` → `categories`. Precisa de uma nova? Adicione-a no mesmo PR e explique o porquê.
- Conteúdo de ódio, desinformação ou ilegal → recusado e removido.

## Código de conduta

Ao participar, você concorda com o [Código de Conduta](CODE_OF_CONDUCT.md).

## Revisão

PRs que passam no CI e seguem as regras acima são mergeados por um mantenedor, normalmente em até alguns dias. Mantenedores: [@wesleymatosdev](https://github.com/wesleymatosdev).
