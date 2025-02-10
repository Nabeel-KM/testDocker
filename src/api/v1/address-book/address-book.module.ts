import { AddressBookService } from './address-book.service';
import { AddressBookController } from './address-book.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AddressBookController],
  providers: [AddressBookService],
})
export class AddressBookModule {}
