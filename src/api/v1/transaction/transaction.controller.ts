import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { TransactionService } from './transaction.service';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiParam({ name: 'address' })
  @ApiParam({ name: 'coinSymbol' })
  @Post('blockCypher/hooks/callback/:coinSymbol/:address')
  async blockCypherHook(@Body() body, @Param() param) {
    return await this.transactionService.createTransactionBtc(
      param.coinSymbol,
      body,
      param.address,
    );
  }

  @Post('/moralis/hooks/callback')
  async moralisHook(@Body() body) {
    return await this.transactionService.createTransactionEvmChain(body);
  }

  @ApiParam({ name: 'address' })
  @Get('/transactions/:address')
  async getTransactions(@Param() { address }) {
    return await this.transactionService.getTransactions(address);
  }
}
