import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddressBookCreateDto } from './dto/requests/address-book-create.dto';
import { AddressBookService } from './address-book.service';
import { PaginationDto } from 'src/shared/dto/paginated-page-limit.dto';

@ApiTags('Address book')
@Controller('address-book')
export class AddressBookController {
  constructor(private addressBookService: AddressBookService) {}

  @ApiOperation({ summary: 'Add a new entry' })
  @Post('/')
  @ApiBearerAuth()
  async newLogEntry(@Body() payload: AddressBookCreateDto) {
    return await this.addressBookService.createWallet(payload);
  }

  @ApiOperation({ summary: 'Get contacts of a wallet user' })
  @ApiParam({ name: 'walletAddress' })
  @Get('/:walletAddress')
  async getUserData(
    @Param('walletAddress') walletAddress: string,
    @Query() query: PaginationDto,
  ) {
    return await this.addressBookService.getUserData(walletAddress, query);
  }
}
