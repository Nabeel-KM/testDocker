import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONSTANTS } from '../constants';

@Injectable()
export class ExchangeRateService {
  constructor() {}

  async fetchExchangeRate(from: string, to: string): Promise<[]> {
    try {
      const res = await axios.get(
        `${CONSTANTS.EXCHANGE_RATE_API_DOMAIN}/data/price?fsym=${from}&tsyms=${to}&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`,
      );

      return res.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
