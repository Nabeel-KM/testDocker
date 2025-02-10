import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApp(): string {
    return 'STX Wallet - API';
  }
}
