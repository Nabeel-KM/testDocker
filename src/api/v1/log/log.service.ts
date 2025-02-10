import { Global, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LogEntity, LogDocument } from 'src/api/v1/log/entity/log.schema';
import { LogDto } from './dto/log.dto';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  PaginationDto,
} from 'src/shared/dto/paginated-page-limit.dto';

@Injectable()
@Global()
export class LogService {
  constructor(
    @InjectModel(LogEntity.name)
    private readonly logModel: Model<LogDocument>,
  ) {}

  async create(payload: LogDto): Promise<object> {
    return await this.logModel.create(payload);
  }

  async get(query: PaginationDto) {
    query.page = +query.page === 0 ? 1 : +query.page;
    const page = query.page || DEFAULT_PAGINATION_PAGE;
    const limit = +query.limit || DEFAULT_PAGINATION_LIMIT;
    const skip = (page - 1) * limit;

    const total = await this.logModel.countDocuments();

    const data = await this.logModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    return { data, total };
  }
}
