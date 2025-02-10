// @ts-nocheck
import { Inject, Injectable } from '@nestjs/common';
const Moralis = require('moralis').default;
import { EvmChain } from '@moralisweb3/common-evm-utils';

@Injectable()
export class MoralisService {
  constructor(
    @Inject('Moralis')
    private readonly moralis,
  ) {}

  async watchAddress(address: string) {
    try {
      const stream = {
        chains: [EvmChain.GOERLI, EvmChain.BSC_TESTNET, EvmChain.MUMBAI],
        description: `monitor test goerli || ${address}`,
        tag: 'test-goerli',
        webhookUrl: `${process.env.MORALIS_CALLBACK_URL}/transaction/moralis/hooks/callback`,
        includeNativeTxs: true,
      };

      const newStream = await this.moralis.Streams.add(stream);
      const { id } = newStream.toJSON();

      const res = await Moralis.Streams.addAddress({ address, id });

      return true;
    } catch (err) {
      console.log('moralis: ', err.message);

      throw err.message;
    }
  }

  async transformBscLikeTrx(trx: any) {
    return {
      coinSymbol: 'bnb',
      value: trx.value / Math.pow(10, 18),
      confirmations: trx.confirmed ? 6 : 0,
      from: trx.from_address.toLowerCase(),
      to: trx.to_address.toLowerCase(),
      txId: trx.hash,
      blockHeight: String(trx.block_number).includes('x')
        ? parseInt(trx.block_number, 16) // sometimes its hex, other times its not
        : trx.block_number,
      explorerUrl: process.env.BSC_EXPLORER + '/tx/' + trx.hash,
    };
  }

  async transformEthLikeTrx(trx: any) {
    return {
      coinSymbol: 'eth',
      value: trx.value / Math.pow(10, 18),
      confirmations: trx.confirmed ? 6 : 0,
      from: trx.from_address.toLowerCase(),
      to: trx.to_address.toLowerCase(),
      txId: trx.hash,
      blockHeight: String(trx.block_number).includes('x')
        ? parseInt(trx.block_number, 16) // sometimes its hex, other times its not
        : trx.block_number,
      explorerUrl: process.env.ETH_EXPLORER + '/tx/' + trx.hash,
    };
  }

  // async transformTokenTrx(trx: any, coin: Coin) {
  //   return {
  //     coinSymbol: coin.coinSymbol,
  //     value: trx.value / Math.pow(10, coin.decimal ?? 18),
  //     confirmations: trx.confirmed ? 6 : 0,
  //     from: trx.from_address.toLowerCase(),
  //     to: trx.to_address.toLowerCase(),
  //     txId: trx.transaction_hash,
  //     blockHeight: String(trx.block_number).includes('x')
  //       ? parseInt(trx.block_number, 16) // sometimes its hex, other times its not
  //       : trx.block_number,
  //     explorerUrl:
  //       coin.blockchain === 'binance'
  //         ? process.env.BSC_EXPLORER + '/tx/' + trx.hash
  //         : process.env.ETH_EXPLORER + '/tx/' + trx.hash,
  //   };
  // }
}
