#!/usr/bin/env node
/**
 * Setup do laboratório — Encontro 4 (CyberSecurity).
 * Objetivo: rodar só com Node. Sem Python, sem build tools, sem Chrome.
 *
 *   node scripts/setup.mjs        (ou: npm run setup)
 *
 * O que faz:
 *   1. confere a versão do Node (>= 20)
 *   2. instala as dependências do backend (sql.js — SQLite em JS puro)
 *   3. garante o log de exemplo das UPVs
 *   4. popula o banco (seed)
 *   5. imprime os próximos passos
 *
 * Multiplataforma (Windows / macOS / Linux).
 */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const BACKEND = join(RAIZ, 'backend');
const LOG_DIR = join(BACKEND, 'logs-upv', '1');
const LOG_FILE = join(LOG_DIR, '2026-10-28.log');

const c = {
  ok: (s) => console.log('\x1b[32m✓\x1b[0m ' + s),
  info: (s) => console.log('\x1b[36m•\x1b[0m ' + s),
  erro: (s) => console.log('\x1b[31m✗ ' + s + '\x1b[0m'),
  titulo: (s) => console.log('\n\x1b[1m' + s + '\x1b[0m'),
};

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

c.titulo('Setup do laboratório — Encontro 4 (CyberSecurity)');

// 1) Node >= 20
const major = Number(process.versions.node.split('.')[0]);
if (Number.isNaN(major) || major < 20) {
  c.erro(`Node 20+ é necessário. Você tem ${process.versions.node}.`);
  c.info('Instale o Node LTS em https://nodejs.org e rode de novo.');
  process.exit(1);
}
c.ok(`Node ${process.versions.node} (>= 20) — ok`);

// 2) dependências do backend (só backend; frontend não é necessário no Enc. 4)
c.titulo('Instalando dependências do backend (sql.js, sem build nativo)…');
try {
  run('npm install', BACKEND);
  c.ok('Backend instalado');
} catch {
  c.erro('Falha no npm install do backend.');
  c.info('Verifique sua conexão / proxy e rode novamente: npm run setup');
  process.exit(1);
}

// 3) log de exemplo (com dado pessoal plantado para a demo de LGPD)
if (!existsSync(LOG_FILE)) {
  mkdirSync(LOG_DIR, { recursive: true });
  writeFileSync(
    LOG_FILE,
    [
      '2026-10-28T06:02:11Z INFO  caldeira=CB-01 pressao=18.4bar temp=312C status=OK',
      '2026-10-28T06:07:45Z WARN  caldeira=CB-01 vibracao_alta sensor=VB-7 valor=4.2mm/s',
      '2026-10-28T06:15:03Z INFO  ronda operador="João R. Meira" cpf=312.445.678-90 turno=A',
      '2026-10-28T06:31:20Z ERROR alimentador=AL-03 travamento biomassa=cavaco_umido',
      '2026-10-28T06:44:58Z INFO  acesso_terceiro empresa="Klabin" tecnico="Marina Alves" rg=28.776.112-4',
      '2026-10-28T07:10:12Z WARN  caldeira=CB-02 nivel_agua baixo acao=reposicao_automatica',
      '',
    ].join('\n'),
  );
  c.ok('Log de exemplo criado (logs-upv/1/2026-10-28.log)');
} else {
  c.ok('Log de exemplo já existe');
}

// 4) seed do banco
c.titulo('Populando o banco (seed)…');
try {
  run('npm run seed', BACKEND);
  c.ok('Banco populado');
} catch {
  c.erro('Falha no seed. Rode manualmente: cd backend && npm run seed');
}

// 5) próximos passos
c.titulo('Tudo pronto. Próximos passos:');
console.log('');
console.log('  npm run lab       # sobe a API e o painel do Red Team');
console.log('  →  abra  http://localhost:3000/logs/painel');
console.log('');
console.log('  Porta 3000 ocupada? use outra:');
console.log('    PORT=3001 npm run lab      (macOS/Linux)');
console.log('    set PORT=3001&& npm run lab (Windows cmd)');
console.log('');
c.info('Swagger da API em http://localhost:3000/api/docs');
