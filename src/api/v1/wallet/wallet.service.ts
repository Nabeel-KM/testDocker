import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/classes/base.service';
import { BitqueryService } from 'src/utils/bitquery/bitquery.service';
import { BlockCypherService } from 'src/utils/blockcypher';
import { ExchangeRateService } from 'src/utils/exchange-rate/exchange-rate.service';
import { MoralisService } from 'src/utils/moralis/moralis.service';
import {
  AssetsDto,
  TransactionsDto,
  TronTransactionsDto,
  WalletCreateDto,
} from './dto/requests/wallet-create.dto';
import { WalletDocument, WalletEntity } from './entity/wallet.entity';

@Injectable()
export class WalletService extends BaseService<WalletEntity, WalletDocument> {
  constructor(
    @InjectModel(WalletEntity.name)
    private readonly walletModel: Model<WalletDocument>,

    private readonly bitqueryService: BitqueryService,

    private readonly exchangeRateService: ExchangeRateService,

    private readonly blockCypher: BlockCypherService,

    @Inject(forwardRef(() => MoralisService))
    private readonly moralis,
  ) {
    super(walletModel);
  }

  async importWallet(payload: WalletCreateDto): Promise<object> {
    try {
      const { walletAddress, chain } = payload;

      const existing = await this.findOne({ walletAddress, chain });

      const res = await this.findOneOrCreate(
        { walletAddress, chain },
        { ...payload },
      );

      if (!existing) {
        if (payload.chain === 'bitcoin') {
          await this.blockCypher.generateBtcHook('BTC', walletAddress);
        }

        if (payload.chain === 'ethereum') {
          await this.moralis.watchAddress(walletAddress);
        }
      }

      return {
        status: 201,
        message: 'Wallet imported successfully!',
        payload: res,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getWalletAssets(payload: AssetsDto) {
    try {
      const { bitcoin, litecoin, dashcoin, dogecoin, ethereum, tron, testnet } =
        payload;
      const ethereumAssets =
        await this.bitqueryService.fetchWalletAssetsEethereum(
          ethereum,
          testnet,
        );

      const bitcoinAssets = await this.bitqueryService.fetchWalletAssetsBitcoin(
        bitcoin,
        litecoin,
        dashcoin,
        dogecoin,
      );

      const tronAssets = await this.bitqueryService.fetchWalletAssetsTron(tron);

      return {
        ...ethereumAssets,
        ...bitcoinAssets,
        ...tronAssets,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getWalletTransactions(payload: TransactionsDto) {
    try {
      const { walletAddress, network } = payload;
      const transactions = await this.bitqueryService.fetchWalletTransactions(
        walletAddress,
        network,
      );

      return transactions;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }

  async getTronWalletTransactions(payload: TronTransactionsDto) {
    try {
      const { walletAddress } = payload;
      const transactions =
        await this.bitqueryService.fetchTronWalletTransactions(walletAddress);

      return transactions;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }

  async getExchangeRate(from, to) {
    try {
      const rate = await this.exchangeRateService.fetchExchangeRate(from, to);

      return rate;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
