import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AdminJwt2FaAuthGuard } from 'src/api/v1/admin-auth/strategy/admin-jwt-2fa.guard';
import { Roles } from 'src/api/v1/admin-auth/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { PaginationDto } from 'src/shared/dto/paginated-page-limit.dto';
import { LogService } from './log.service';

@ApiTags('Logs')
@Controller('logs')
@UseGuards(ThrottlerGuard)
export class LogController {
  constructor(private logService: LogService) {}

  @ApiOperation({ summary: 'Get all logs' })
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwt2FaAuthGuard)
  @Get('/')
  async get(@Query() query: PaginationDto) {
    return await this.logService.get(query);
  }
}
