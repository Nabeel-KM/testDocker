import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BlockCypherService {
  constructor() {}

  async generateBtcHook(coinSymbol: string, address: string) {
    const blockCypherUrl = process.env.BLOCKCYPHER_HOOK_URL_BTC;

    const webhookConfig = {
      event: 'confirmed-tx',
      address,
      url: `${process.env.BLOCKCYPHER_CALLBACK_URL}/${coinSymbol}/${address}`,
    };

    const res = await axios.post(blockCypherUrl, webhookConfig);

    return true;
  }

  async generateEthHook(coinSymbol: string, address: string) {
    const blockCypherUrl = process.env.BLOCKCYPHER_HOOK_URL_ETH;

    const webhookConfig = {
      event: 'confirmed-tx',
      address,
      url: `${process.env.BLOCKCYPHER_CALLBACK_URL}/${coinSymbol}/${address}`,
    };

    const res = await axios.post(blockCypherUrl, webhookConfig);

    return true;
  }
}
