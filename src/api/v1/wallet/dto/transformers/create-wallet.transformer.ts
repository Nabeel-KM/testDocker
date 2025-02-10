import { ApiProperty } from "@nestjs/swagger";
import { WalletEntity } from "../../entity/wallet.entity";

export class CreateWalletTransformer {
  @ApiProperty()
  walletAddress: string;

  @ApiProperty()
  chain: string;

  @ApiProperty()
  protocol: string;

  constructor(entityObj: WalletEntity) {
    this.walletAddress = entityObj.walletAddress;
    this.chain = entityObj.chain;
    this.protocol = entityObj.protocol;
  }
}
