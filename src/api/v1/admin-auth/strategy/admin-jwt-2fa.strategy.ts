import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/api/v1/admin-auth/strategy/jwt-payload.interface';
import {
  AdminEntity,
  AdminDocument,
} from 'src/api/v1/admin-auth/entity/admin.schema';

@Injectable()
export class AdminJwt2FaStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt-two-factor',
) {
  constructor(
    @InjectModel(AdminEntity.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {
    console.log(process.env.JWT_SECRET);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.adminModel.findOne({ _id: payload.userId });

    if (!user?.isTwoFaEnabled) {
      return user;
    }

    if (user?.isTwoFaEnabled) {
      return user;
    }
  }
}
