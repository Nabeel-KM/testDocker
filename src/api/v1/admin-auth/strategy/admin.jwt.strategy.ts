import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  AdminEntity,
  AdminDocument,
} from 'src/api/v1/admin-auth/entity/admin.schema';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/api/v1/admin-auth/strategy/jwt-payload.interface';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    private readonly config: ConfigService,
    @InjectModel(AdminEntity.name)
    private readonly userModel: Model<AdminDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    return this.userModel.findOne({ _id: payload.userId });
  }
}
