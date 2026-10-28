import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LogsService } from './logs.service';

/**
 * Consulta de logs operacionais das UPVs.
 *
 * ⚠️ MÓDULO DE LABORATÓRIO — Encontro 4 (CyberSecurity).
 * Este endpoint foi gerado "do zero" em aula para demonstrar o que uma IA
 * sem guardrails produz. Ele contém vulnerabilidades PLANTADAS DE PROPÓSITO.
 * NÃO É CÓDIGO DE REFERÊNCIA. A versão corrigida é construída no lab.
 */
@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  // GET /painel -> a interface do Red Team (HTML servido pelo próprio Nest).
  // Lê o arquivo ao lado deste controller, funcionando em dist/ e em ts-node.
  @Get('/painel')
  @ApiExcludeEndpoint()
  @Header('Content-Type', 'text/html; charset=utf-8')
  painel(): string {
    const candidatos = [
      join(__dirname, 'painel.html'),
      join(process.cwd(), 'src', 'logs', 'painel.html'),
      join(process.cwd(), 'dist', 'logs', 'painel.html'),
    ];
    const caminho = candidatos.find((c) => existsSync(c));
    return caminho
      ? readFileSync(caminho, 'utf8')
      : '<h1>Painel não encontrado</h1><p>Rode <code>npm run build</code> no backend.</p>';
  }

  // GET /logs/upv/:upvId?arquivo=2026-10-28.log
  // Red Team: /logs/upv/1?arquivo=../../../../etc/passwd
  @Get('upv/:upvId')
  lerLog(@Param('upvId') upvId: string, @Query('arquivo') arquivo: string) {
    return this.logsService.lerLogDaUpv(upvId, arquivo);
  }

  // GET /logs/grep?upvId=1&termo=erro
  // Red Team: termo=x; cat /etc/passwd  (injeção de comando)
  @Get('grep')
  buscar(@Query('upvId') upvId: string, @Query('termo') termo: string) {
    return this.logsService.buscarNoLog(upvId, termo);
  }
}
