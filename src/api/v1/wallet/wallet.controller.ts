import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  AssetsDto,
  TransactionsDto,
  TronTransactionsDto,
  WalletCreateDto,
} from './dto/requests/wallet-create.dto';
import { WalletService } from './wallet.service';

@ApiTags('Wallets')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiOperation({ summary: 'Add a new wallet entry' })
  @Post('/')
  @ApiBearerAuth()
  async newLogEntry(@Body() payload: WalletCreateDto) {
    return await this.walletService.importWallet(payload);
  }

  @ApiOperation({ summary: 'Get assets of wallet addresses' })
  @Post('/assets')
  async getWalletAssets(@Body() payload: AssetsDto) {
    return await this.walletService.getWalletAssets(payload);
  }

  @ApiOperation({ summary: 'Get wallet transactions' })
  @Post('/transactions')
  async getWalletTransactions(@Body() payload: TransactionsDto) {
    return await this.walletService.getWalletTransactions(payload);
  }

  @ApiOperation({ summary: 'Get wallet transactions for tron' })
  @Post('/tron-transactions')
  async getTronWalletTransactions(@Body() payload: TronTransactionsDto) {
    return await this.walletService.getTronWalletTransactions(payload);
  }

  @ApiOperation({ summary: 'Get exchange rate' })
  @ApiParam({ name: 'from' })
  @ApiParam({ name: 'to' })
  @Get('/exchange-rate/:from/:to')
  async getExchangeRate(@Param() { from, to }: { from: string; to: string }) {
    return await this.walletService.getExchangeRate(from, to);
  }
}
