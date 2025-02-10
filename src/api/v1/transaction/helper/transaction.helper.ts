import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionHelper {
  transformBCTx(coinSymbol: string, tx, toAddress?: string) {
    if (!toAddress) {
      toAddress = tx.outputs[0].addresses[0];
    }
    return {
      coinSymbol,
      confirmations: tx.confirmations ?? 0,
      explorer: 'blockcypher',
      explorerUrl: tx.hash,
      fee: tx.fees,
      from: tx.inputs[0].addresses[0],
      timeStamp: tx.received,
      to: toAddress,
      txId: tx.hash,
      blockHeight: tx.block_height,
      amount: String(tx.outputs[0]?.value / Math.pow(10, 8)),
    };
  }

  getChainExplorer(hex: string) {
    const chain = Number(hex);
    let explorer: string;
    let explorerUrl: string;

    switch (chain) {
      case 5:
        explorer = 'etherscan';
        explorerUrl = 'https://goerli.etherscan.io';
        break;

      case 97:
        explorer = 'bscscan';
        explorerUrl = 'https://testnet.bscscan.com';
        break;

      case 80001:
        explorer = 'polygonscan';
        explorerUrl = 'https://mumbai.polygonscan.com';
        break;

      default:
        explorer = '';
        explorerUrl = '';
        break;
    }

    return { explorer, explorerUrl };
  }

  transformMoralisTx(tx: any) {
    const { fromAddress, toAddress, hash, gas, value } = tx.txs[0];

    const { explorer, explorerUrl } = this.getChainExplorer(tx.chainId);
    return {
      coinSymbol: '',
      confirmations: tx.confirmed ? 6 : 0,
      explorer,
      explorerUrl,
      fee: gas,
      from: fromAddress,
      timeStamp: tx.block.timestamp,
      to: toAddress,
      txId: hash,
      blockHeight: '',
      amount: value,
    };
  }
}
