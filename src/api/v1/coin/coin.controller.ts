import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoinCreateDto } from './dto/requests/coin-create.dto';
import { CoinService } from './coin.service';

@ApiTags('Coins')
@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}

  @ApiOperation({ summary: 'Get all coins' })
  @Get('/')
  @ApiBearerAuth()
  async getAll() {
    return await this.coinService.getActiveCoins();
  }

  @ApiOperation({ summary: 'Add a new coin entry' })
  @Post('/')
  @ApiBearerAuth()
  async create(@Body() payload: CoinCreateDto) {
    return await this.coinService.createEntry(payload);
  }

  @ApiOperation({ summary: 'Fetch coins market data' })
  @Get('/fetch-market-data')
  @ApiBearerAuth()
  async fetchtatistics() {
    return await this.coinService.fetchStatistics();
  }
}
