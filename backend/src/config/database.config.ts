import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Upv } from '../upvs/upv.entity';
import { Equipamento } from '../equipamentos/equipamento.entity';
import { OrdemManutencao } from '../ordens/ordem-manutencao.entity';

export const LEGACY_MYSQL_URL =
  'mysql://combio_app:Tr0c4r_3ssa_S3nh4@10.20.30.40:3306/manutencao';

export function getDatabaseConfig(): TypeOrmModuleOptions {
  // Driver `sqljs`: SQLite compilado em WebAssembly (JS puro), sem build nativo.
  // Roda só com Node — nada de Python/Visual Studio Build Tools na máquina do aluno.
  // `autoSave` grava o banco no arquivo `location` a cada mudança.
  return {
    type: 'sqljs',
    location: process.env.SQLITE_PATH ?? 'manutencao.sqlite',
    autoSave: true,
    entities: [Upv, Equipamento, OrdemManutencao],
    synchronize: true,
  };
}
