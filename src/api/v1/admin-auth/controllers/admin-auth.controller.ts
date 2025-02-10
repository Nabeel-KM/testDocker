import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Roles } from 'src/api/v1/admin-auth/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RolesGuard } from 'src/api/v1/admin-auth/strategy/roles.guard';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminAuthCredentialsDto } from '../dto/admin-auth-credentials.dto';
import { AdminChangePasswordDto } from '../dto/admin-change-password.dto';
import { AdminLoginCredentialsDto } from '../dto/admin-login-credentials.dto';
import {
  BlockSubAdminDto,
  DeleteSubAdminDto,
} from '../dto/block-sub-admin.dto';
import { AdminJwt2FaAuthGuard } from '../strategy/admin-jwt-2fa.guard';

@ApiTags('admin-auth')
@Controller('admin-auth')
@UseGuards(ThrottlerGuard)
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('/register')
  register(@Body() authCredentialsDto: AdminAuthCredentialsDto) {
    return this.adminAuthService.register(authCredentialsDto);
  }

  @Post('/login')
  login(
    @Body() loginCredentialsDto: AdminLoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.adminAuthService.login(loginCredentialsDto);
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Post('/change-password')
  async changePassword(@Body() body: AdminChangePasswordDto, @Req() { user }) {
    return await this.adminAuthService.changePassword(
      user.id,
      body.newPassword,
      body.oldPassword,
    );
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Get('/info')
  async getUserInfo(@Req() request) {
    return await this.adminAuthService.getUserInfo(request.user.email);
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(AdminJwt2FaAuthGuard)
  @Get('/getAllSubAdmins')
  async getAllSubAdmins() {
    return await this.adminAuthService.getAllSubAdmins();
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Post('/register-subAdmin')
  registerSubAdmin(@Body() authCredentialsDto: AdminAuthCredentialsDto) {
    return this.adminAuthService.register(authCredentialsDto);
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Post('/block-subAdmin')
  async blockUser(@Body() payload: BlockSubAdminDto) {
    return await this.adminAuthService.blockSubAdminAccount(payload);
  }

  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Delete('/delete-subAdmin/:_id')
  async deleteAddress(@Param() param: DeleteSubAdminDto) {
    return await this.adminAuthService.deleteSubAdmin(param._id);
  }
}
