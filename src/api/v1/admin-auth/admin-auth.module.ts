import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from 'src/api/v1/admin-auth/strategy/admin.jwt.strategy';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminJwt2FaStrategy } from './strategy/admin-jwt-2fa.strategy';
import { GatewaysModule } from 'src/utils/gateways/gateways.module';
import { TwoFactorAuthenticationController } from './controllers/2fa.controller';
import { TwoFactorAuthenticationService } from './services/2fa.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRY_TIME'),
        },
      }),
    }),
    GatewaysModule,
  ],
  providers: [
    AdminAuthService,
    AdminJwtStrategy,
    AdminJwt2FaStrategy,
    TwoFactorAuthenticationService,
  ],
  controllers: [AdminAuthController, TwoFactorAuthenticationController],
  exports: [],
})
export class AdminAuthModule {}
