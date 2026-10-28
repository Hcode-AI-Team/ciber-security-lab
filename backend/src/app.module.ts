import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { UpvsModule } from './upvs/upvs.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { OrdensModule } from './ordens/ordens.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseConfig(),
    }),
    UpvsModule,
    EquipamentosModule,
    OrdensModule,
    LogsModule,
  ],
})
export class AppModule {}
