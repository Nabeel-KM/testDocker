import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONSTANTS } from '../constants';

@Injectable()
export class BitqueryService {
  constructor() {}

  async fetchWalletAssetsEethereum(
    ethAddress: string,
    testnet: boolean,
  ): Promise<[]> {
    try {
      var data = JSON.stringify({
        query: `{\n  ethereum: ethereum(network: ${
          testnet ? 'goerli' : 'ethereum'
        }) {\n    address(address: {is: \"${ethAddress}\"}) {\n      balances {\n        currency {\n          address\n          name\n  symbol\n       }\n        value\n      }\n    }\n  }\n  bsc: ethereum(network: ${
          testnet ? 'bsc_testnet' : 'bsc'
        }) {\n    address(address: {is: \"${ethAddress}\"}) {\n      balances {\n        currency {\n          address\n          name\n    symbol\n    }\n        value\n      }\n    }\n  }\n}\n`,
        variables: '{}',
      });

      const res = await axios({
        method: 'post',
        url: CONSTANTS.BITQUERY_DOMAIN,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQYfWuVsrttSRjKtLjUh2ktQNQsPSZrW',
        },
        data: data,
      });

      return res?.data?.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fetchWalletAssetsBitcoin(
    bitCoinAddress: string,
    liteCoinAddress: string,
    dogeCoinAddress: string,
    dashCoinAddress: string,
  ): Promise<[]> {
    try {
      var data = JSON.stringify({
        query: `{\n  bitcoin: bitcoin(network: bitcoin) {\n    inputs(inputAddress: {is: "${bitCoinAddress}"}) {\n      value\n    }\n  }\n  litecoin: bitcoin(network: litecoin) {\n    inputs(inputAddress: {is: "${liteCoinAddress}"}) {\n      value\n    }\n  }\n  dashcoin: bitcoin(network: dash) {\n    inputs(inputAddress: {is: "${dashCoinAddress}"}) {\n      value\n    }\n  }\n  dogecoin: bitcoin(network: dogecoin) {\n    inputs(inputAddress: {is: "${dogeCoinAddress}"}) {\n      value\n    }\n  }\n}\n`,
        variables: '{}',
      });

      const res = await axios({
        method: 'post',
        url: CONSTANTS.BITQUERY_DOMAIN,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQYfWuVsrttSRjKtLjUh2ktQNQsPSZrW',
        },
        data: data,
      });

      return res?.data?.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fetchWalletAssetsTron(tronAddress: string): Promise<[]> {
    try {
      var data = JSON.stringify({
        query: `{\n  tron {\n    address(address: {is: \"${tronAddress}\"}) {\n      balances {\n        currency {\n          symbol\n          tokenId\n          decimals\n          address\n          name\n          tokenType\n        }\n        value\n      }\n    }\n  }\n}\n`,
        variables: `{\n  \"address\":\"${tronAddress}\"\n}`,
      });

      const res = await axios({
        method: 'post',
        url: CONSTANTS.BITQUERY_DOMAIN,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQYfWuVsrttSRjKtLjUh2ktQNQsPSZrW',
        },
        data: data,
      });

      return res?.data?.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // query  {
  //   solana(network: solana) {
  //     address(address: {is: "Fw7oGoK5gbWZ1Aj4QLa39TnePJzK5N6hwBbknKpicLt1"}) {
  //       balance
  //     }
  //   }
  // }

  async fetchWalletTransactions(
    walletAddress: string,
    network: string,
  ): Promise<[]> {
    try {
      var bitcoin = JSON.stringify({
        query:
          'query ($network: BitcoinNetwork!, $address: String!, $inboundDepth: Int!, $outboundDepth: Int!) {\n  bitcoin(network: $network) {\n    inbound: coinpath(\n      initialAddress: {is: $address}\n      depth: {lteq: $inboundDepth}\n      options: {direction: inbound, asc: "depth", desc: "amount"}\n    ) {\n      sender {\n        address\n      }\n      receiver {\n        address\n      }\n      amount\n      depth\n      count\n      transaction {\n        hash\n      }\n  block {\n        timestamp {\n          time\n        }\n      }\n  }\n    outbound: coinpath(\n      initialAddress: {is: $address}\n      depth: {lteq: $outboundDepth}\n      options: {asc: "depth", desc: "amount"}\n    ) {\n      sender {\n        address\n      }\n      receiver {\n        address\n      }\n      amount\n      depth\n      count\n      transaction {\n        hash\n      }\n    }\n  }\n}\n',
        variables: `{\n  "inboundDepth": 1,\n  "outboundDepth": 1,\n  "network": "${network}",\n  "address": "${walletAddress}"\n}`,
      });

      var ethereum = JSON.stringify({
        query: `query MyQuery {\n  ethereum(network: ${network}) {\n    transactions {\n      sender(txSender: {in: \"${walletAddress}\"}) {\n        address\n      }\n      hash\n      currency {\n        symbol\n        address\n        name\n      }\n      to {\n        address\n        smartContract {\n          contractType\n          currency {\n            name\n            tokenType\n            symbol\n          }\n        }\n      }\n      amount(date: {since: null, till: null}, amount: {})\n  block {\n        height\n        timestamp {\n          time\n        }\n      }\n  }\n     transfers(\n      options: {asc: \"block.timestamp.time\"}\n      amount: {gt: 0}\n      receiver: {is: \"${walletAddress}\"}\n    ) {\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%dT%H:%M:%SZ\")\n          dayOfWeek\n        }\n        height\n      }\n      address: sender {\n        address\n        annotation\n      }\n      currency {\n        address\n        symbol\n        name\n        tokenType\n      }\n      amount\n      amountInUSD: amount(in: USD)\n      transaction {\n        hash\n      }\n      external\n    }\n  }\n}\n`,
        variables: '{}',
      });

      const res = await axios({
        method: 'post',
        url: CONSTANTS.BITQUERY_DOMAIN,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQYfWuVsrttSRjKtLjUh2ktQNQsPSZrW',
        },
        data: network === 'bitcoin' ? bitcoin : ethereum,
      });

      return res?.data;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }

  async fetchTronWalletTransactions(walletAddress: string) {
    let data = JSON.stringify({
      query:
        'query ($address: String!) {\n  tron {\n    inbound: transfers(receiver: {is: $address}) {\n      receiver {\n        address\n      }\n      sender {\n        address\n      }\n      amount\n      currency {\n        name\n        symbol\n        decimals\n      }\n      fee\n      contractType\n      txHash\n      block {\n        height\n        timestamp {\n          iso8601\n        }\n      }\n    }\n    outbound: transfers(sender: {is: $address}) {\n      receiver {\n        address\n      }\n      sender {\n        address\n      }\n      amount\n      currency {\n        name\n        symbol\n        decimals\n      }\n      fee\n      contractType\n      txHash\n      block {\n        height\n        timestamp {\n          iso8601\n        }\n      }\n    }\n  }\n}\n',
      variables: `{\n  "address":"${walletAddress}"\n}`,
    });

    const resData = await axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: CONSTANTS.BITQUERY_DOMAIN,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYfWuVsrttSRjKtLjUh2ktQNQsPSZrW',
      },
      data: data,
    });

    return resData?.data?.data;
  }
}
