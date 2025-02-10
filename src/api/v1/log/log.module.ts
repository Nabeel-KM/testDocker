import { Global, Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Global()
@Module({
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}
