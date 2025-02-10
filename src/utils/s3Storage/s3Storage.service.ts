import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FILE_TYPE } from './types/storageTypes';
import { v4 as uuidv4 } from 'uuid';
import { LogService } from 'src/api/v1/log/log.service';
import { ErrorStatus } from 'src/shared/enums/role.enum';
const path = require('path');
const filename = path.basename(__filename);

@Injectable()
export class S3StorageService {
  constructor(
    @Inject('S3') private readonly S3: S3,

    @Inject(LogService) private readonly logService: LogService,
  ) {}

  async uploadFile(type: string, file: any) {
    try {
      if (!file) {
        throw new BadRequestException('File not attached');
      }

      let path = '';

      switch (type) {
        case FILE_TYPE.COIN:
          path = `${FILE_TYPE.COIN}/${uuidv4()}`;
          break;

        default:
          break;
      }

      const uploadResult = await this.S3.upload({
        Bucket: process.env.AWS_BUCKET,
        Body: file.buffer,
        Key: path,
        ContentType: file.mimetype,
      }).promise();

      return {
        url: process.env.AWS_ACCESS_URL + '/' + uploadResult.Key,
        key: uploadResult.Key,
      };
    } catch (error) {
      await this.logService.create({
        message: error.message,
        dir: filename,
        type: ErrorStatus.ERROR,
        errorCode: HttpStatus.FORBIDDEN,
      });

      throw new BadRequestException(error.message);
    }
  }
}
