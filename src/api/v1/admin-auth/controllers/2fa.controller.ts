import {
  Controller,
  Post,
  Body,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from '../services/2fa.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TwoFactorAuthenticationCodeDto } from '../dto/admin-login-credentials.dto';
import { Roles } from 'src/api/v1/admin-auth/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { AdminJwt2FaAuthGuard } from '../strategy/admin-jwt-2fa.guard';

@ApiBearerAuth()
@ApiTags('Two Factor Authentication')
@Controller('auth/2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @ApiOperation({ summary: 'Generate a QR code for 2fa authentication' })
  @Post('generate')
  @HttpCode(200)
  async generateCode(@Req() { user }) {
    return await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
      user,
    );
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @ApiOperation({ summary: 'Authenticate 2fa code' })
  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Body() body: TwoFactorAuthenticationCodeDto,

    @Req() { user },
  ) {
    return await this.twoFactorAuthenticationService.authenticate(
      body.twoFactorAuthenticationCode,
      user,
    );
  }
}
