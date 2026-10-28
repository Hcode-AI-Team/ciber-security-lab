# Comece aqui — Imersão IA · Combio (Encontro 4)

Projeto do laboratório. **Roda só com Node 20+** — não precisa de Python, build
tools nem Chrome.

## 1. Pré-requisito único

- **Node.js 20 ou superior.** Confira com:
  ```bash
  node -v
  ```
  Não tem? Instale o Node LTS em https://nodejs.org

## 2. Rodar (dois comandos)

A partir desta pasta:

```bash
npm run setup      # instala o backend, cria o log de exemplo e popula o banco
npm run lab        # sobe a API + o painel
```

Abra no navegador: **http://localhost:3000/logs/painel**

Porta 3000 ocupada?
```bash
# macOS / Linux
PORT=3001 npm run lab
# Windows (cmd)
set PORT=3001&& npm run lab
```

## 3. O que você vai ver

O **Painel do Red Team** com três botões. Cada um dispara um ataque real contra o
endpoint de logs das UPVs e mostra o resultado na tela:

1. **Ler log** — expõe CPF/RG num log sem autenticação (LGPD · OWASP A09).
2. **Atacar (card 2)** — path traversal que vaza a credencial do banco (A01 + A05).
3. **Atacar (card 3)** — command injection que roda comando no servidor (A05).

> ⚠️ O módulo `backend/src/logs/` é **vulnerável de propósito** — é o material do
> Encontro 4. Não é código de referência e não vai para QA/PRD.

## 4. No lab você vai construir a esteira de defesa

Siga o `Encontro4_Lab.md` (seu instrutor compartilha): subagente de security, hook
que trava, guardrails no CLAUDE.md, política de 1 página e um workflow de varredura.

## Problemas?

- `npm run setup` falhou → confira `node -v` (precisa 20+); se for rede/proxy, rode de novo.
- Painel não abre → confirme que `npm run lab` está rodando e a URL é `/logs/painel`.
- Swagger da API: http://localhost:3000/api/docs
