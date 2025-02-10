import { MoralisService } from './moralis.service';
import { Module } from '@nestjs/common';
const Moralis = require('moralis').default;

@Module({
  providers: [
    MoralisService,
    {
      provide: 'Moralis',
      inject: [],
      useFactory: async () => {
        await Moralis.start({
          apiKey: process.env.MORALIS_API_KEY,
        });
        return Moralis;
      },
    },
  ],
  exports: [MoralisService],
})
export class MoralisModule {}
