# Contributing / Como contribuir

Obrigado pelo interesse! Esta lista existe para ser construída em comunidade.

## Adicionar uma iniciativa

### Opção A — Pull Request (recomendado)

1. Faça um fork e crie uma branch: `git checkout -b minha-iniciativa`
2. Adicione sua iniciativa na **seção e ordem alfabética corretas** do `README.md`, seguindo o formato:

```md
- [Nome](https://site-da-iniciativa.org) — Descrição em uma frase, focada no que ela faz e para quem. ([código](https://github.com/org/repo))
```

Regras do formato:

- Uma iniciativa por linha, ordem alfabética dentro da seção.
- Descrição objetiva (1 frase), sem marketing ("melhor do que", "incrível" fora).
- Link principal HTTPS; link de `[código]` opcional mas recomendado quando o projeto é open source.
- Sem duplicatas.

3. Valide localmente:

```sh
npm install
npm test        # awesome-lint + verificação de links
```

4. Abra o PR descrevendo a iniciativa. O CI roda a mesma validação.

### Opção B — Issue (sem código)

Use o template **"Nova iniciativa"** ao [criar uma issue](https://github.com/wesleymatosdev/awesome-iniciativas/issues/new?template=nova-iniciativa.yml). Alguém da comunidade transforma sua sugestão em PR.

## Sugerir uma nova seção

Seções novas passam por discussão primeiro: abra uma issue com a proposta, explique o escopo e cite 3+ iniciativas que entrariam nela. Com consenso, um PR cria a seção e atualiza o índice.

## Outras contribuições

- **Correções** (descrição errada, link quebrado, projeto descontinuado): PR ou issue — ambos bem-vindos.
- **Reportar conteúdo indevido**: issue com a label `report`; a entrada sai da lista até esclarecimento.

## Critérios de aceitação

1. Iniciativa real, acessível e ativa (ou com relevância histórica clara).
2. Relação com tecnologia aberta, dados abertos ou colaboração no Brasil.
3. Sem duplicatas.
4. Link HTTPS funcionando (o CI verifica, mas teste antes também).

## Código de conduta

Ao participar, você concorda com o [Código de Conduta](CODE_OF_CONDUCT.md).

## Revisão

PRs que passam no CI e seguem as regras são mergeados normalmente em poucos dias. Mantenedor: [@wesleymatosdev](https://github.com/wesleymatosdev).
