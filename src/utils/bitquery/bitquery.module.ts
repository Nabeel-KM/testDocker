import { BitqueryService } from './bitquery.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [BitqueryService],
  exports: [BitqueryService],
})
export class BitqueryModule {}
