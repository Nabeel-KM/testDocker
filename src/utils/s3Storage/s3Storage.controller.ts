import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminJwt2FaAuthGuard } from 'src/api/v1/admin-auth/strategy/admin-jwt-2fa.guard';
import { Roles } from 'src/api/v1/admin-auth/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { UploadDto } from './dto/upload.dto';
import { S3StorageService } from './s3Storage.service';

@ApiTags('storage')
@Controller('storage')
export class S3StorageController {
  constructor(private readonly s3Storage: S3StorageService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Post('admin/upload')
  @UseInterceptors(FileInterceptor('file'))
  async adminUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPayload: UploadDto,
  ) {
    console.log(uploadPayload.type, file);
    return this.s3Storage.uploadFile(uploadPayload.type, file);
  }
}
