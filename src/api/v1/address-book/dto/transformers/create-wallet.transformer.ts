import { ApiProperty } from '@nestjs/swagger';
import { AddressBookEntity } from '../../entity/address-book.entity';

export class CreateAddressBookTransformer {
  @ApiProperty()
  creator: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  walletAddress: string;

  @ApiProperty()
  chain: string;

  constructor(entityObj: AddressBookEntity) {
    this.creator = entityObj.creator;
    this.contactName = entityObj.contactName;
    this.walletAddress = entityObj.walletAddress;
    this.chain = entityObj.chain;
  }
}
