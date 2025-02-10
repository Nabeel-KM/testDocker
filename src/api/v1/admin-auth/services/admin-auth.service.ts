import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { adminJwtPayload } from 'src/api/v1/admin-auth/strategy/jwt-payload.interface';
import {
  AdminEntity,
  AdminDocument,
} from 'src/api/v1/admin-auth/entity/admin.schema';
import { AdminAuthCredentialsDto } from '../dto/admin-auth-credentials.dto';
import { AdminLoginCredentialsDto } from '../dto/admin-login-credentials.dto';
import { Role } from 'src/shared/enums/role.enum';
import { BlockSubAdminDto } from '../dto/block-sub-admin.dto';
import { GatewaysService } from 'src/utils/gateways/gateways.service';
import { ResponseMessages } from 'src/shared/responseMessages';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(AdminEntity.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly gatewayService: GatewaysService,
  ) {}

  async register(authCredentialsDto: AdminAuthCredentialsDto) {
    try {
      const { password } = authCredentialsDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser: any = await this.adminModel.create({
        ...authCredentialsDto,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      if (err.message.indexOf('11000') != -1) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserInfo(email: string) {
    const user: AdminEntity = await this.adminModel.findOne({ email }).lean();

    if (!user)
      throw new NotFoundException({
        message: ResponseMessages.EN.USER_NOT_FOUND,
      });
    return user;
  }

  async getJwtToken(user: any, is2FaAuthenticated = false) {
    const payload: adminJwtPayload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async login(
    loginAuthCredential: AdminLoginCredentialsDto,
  ): Promise<{ accessToken: string; isAuth: boolean }> {
    const { email, password } = loginAuthCredential;
    let user = await this.adminModel.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = await this.getJwtToken(user);

      user.password = undefined;
      return { accessToken, isAuth: false };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async changePassword(
    userId: string,
    newPassword: string,
    oldPassword: string,
  ) {
    try {
      const user = await this.adminModel.findById(userId);
      if (!user)
        throw new NotFoundException({
          message: ResponseMessages.EN.USER_NOT_FOUND,
        });

      const verified = bcrypt.compareSync(oldPassword, user.password);

      if (!verified)
        throw new ForbiddenException({ message: "password didn't match" });

      const hashPassword = bcrypt.hashSync(newPassword, 8);

      const _user = await this.adminModel.findOneAndUpdate(
        { _id: userId },
        { password: hashPassword },
      );

      _user.password = undefined;
      return _user;
    } catch (e) {
      throw e;
    }
  }

  async setTwoFactorAuthenticationSecret(_id, secret) {
    await this.adminModel.findOneAndUpdate({ _id }, { twoFaSecret: secret });

    return true;
  }

  async getAllSubAdmins() {
    try {
      return await this.adminModel.find({ role: Role.SUB_ADMIN });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async blockSubAdminAccount(payload: BlockSubAdminDto) {
    const updatedUser = await this.adminModel.findOneAndUpdate(
      {
        _id: payload.userId,
      },
      {
        isBlocked: payload.isblocked,
        blockReason: payload.reasonToBlock,
      },
      { new: true },
    );

    return {
      message: 'Status updated successfully!',
    };
  }

  async deleteSubAdmin(_id: string) {
    await this.adminModel.findOneAndDelete({ _id });

    return {
      message: 'Sub admin deleted successfully',
    };
  }
}
