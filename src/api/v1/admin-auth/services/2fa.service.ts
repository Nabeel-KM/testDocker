import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { AdminEntity } from 'src/api/v1/admin-auth/entity/admin.schema';
import { AdminAuthService } from 'src/api/v1/admin-auth/services/admin-auth.service';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async generateTwoFactorAuthenticationSecret(admin: AdminEntity) {
    console.log(admin);

    if (admin.isTwoFaEnabled === false) {
      throw new HttpException(
        'Two factor authentication is disabled!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // If 2fa is already enabled, then we will throw an error
    if (admin.isTwoValid === true) {
      throw new HttpException(
        'Two factor authentication is already valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate the secret and set it for the authenticated user
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      admin.email,
      'STX Wallet 2FA APPLICATION',
      secret,
    );

    await this.adminAuthService.setTwoFactorAuthenticationSecret(
      admin._id,
      secret,
    );

    // Return the response in form of QR
    return {
      secret,
      qrCode: await this.generateQrCodeDataURL(otpauthUrl),
    };
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    admin: AdminEntity,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: admin.twoFaSecret,
    });
  }

  async authenticate(twoFactorAuthenticationCode: string, admin: AdminEntity) {
    console.log(admin);

    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode,
      admin,
    );

    // If Code is not valid we will throw an error
    if (!isCodeValid) {
      throw new BadRequestException('Wrong authentication code');
    }

    const accessToken: string = await this.adminAuthService.getJwtToken(admin);

    admin.password = undefined;
    return {
      message: 'Session authenticated successfully',
      accessToken,
      data: admin,
      isAuth: true,
    };
  }
}
