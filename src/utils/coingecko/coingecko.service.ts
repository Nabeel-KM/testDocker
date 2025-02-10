import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONSTANTS } from '../constants';

@Injectable()
export class CoingeckoService {
  constructor() {}

  async fetchCoinIds(): Promise<[]> {
    try {
      const res = await axios.get(CONSTANTS.COIN_GECKO_IDS);

      return res.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fetchtatistics(
    coinIds: string,
    vsCurrency: string,
    sparkline: boolean,
  ): Promise<[]> {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=${sparkline}`,
      );

      return res.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
