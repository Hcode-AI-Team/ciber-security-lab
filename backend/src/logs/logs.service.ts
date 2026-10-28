import { Injectable } from '@nestjs/common';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * ⚠️ MÓDULO DE LABORATÓRIO — Encontro 4 (CyberSecurity).
 * Vulnerabilidades PLANTADAS DE PROPÓSITO. Mapeamento OWASP no cabeçalho de
 * cada método. É isto que a dupla Red Team vai explorar e depois a esteira
 * (subagente + hook) tem que pegar.
 */
@Injectable()
export class LogsService {
  // OWASP 2025 A02 Security Misconfiguration + A04 Cryptographic Failures:
  // segredo de integração colado no código "pra funcionar rápido".
  // (LLM02 Sensitive Information Disclosure se o agente copiar isto num PR.)
  private readonly FLUIG_LOG_TOKEN = 'fluig_logs_7f3a9c2e-combio-PRD-2026';

  private readonly BASE_LOGS = join(process.cwd(), 'logs-upv');

  // OWASP 2025 A01 Broken Access Control + A05 Injection (Path Traversal).
  // Sem autenticação, sem validar `arquivo`: aceita ../../ e lê qualquer file.
  lerLogDaUpv(upvId: string, arquivo: string): string {
    const caminho = join(this.BASE_LOGS, upvId, arquivo);
    return readFileSync(caminho, 'utf8');
  }

  // OWASP 2025 A05 Injection (OS Command Injection): `termo` vai direto p/ shell.
  buscarNoLog(upvId: string, termo: string): string {
    const comando = `grep -i "${termo}" ${this.BASE_LOGS}/${upvId}/*.log`;
    return execSync(comando).toString();
  }
}
