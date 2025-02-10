import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/classes/base.service';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  PaginationDto,
} from 'src/shared/dto/paginated-page-limit.dto';
import { AddressBookCreateDto } from './dto/requests/address-book-create.dto';
import {
  AddressBookDocument,
  AddressBookEntity,
} from './entity/address-book.entity';

@Injectable()
export class AddressBookService extends BaseService<
  AddressBookEntity,
  AddressBookDocument
> {
  constructor(
    @InjectModel(AddressBookEntity.name)
    private readonly addressBookModel: Model<AddressBookDocument>,
  ) {
    super(addressBookModel);
  }

  async createWallet(payload: AddressBookCreateDto): Promise<object> {
    try {
      const res = await this.findOneOrCreate(
        { creator: payload.creator, walletAddress: payload.walletAddress },
        payload,
      );
      return {
        status: 201,
        message: 'New contact added successfully!',
        payload: res,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserData(creator: string, query: PaginationDto): Promise<object> {
    try {
      query.page = +query.page === 0 ? 1 : +query.page;
      const page = query.page || DEFAULT_PAGINATION_PAGE;
      const limit = +query.limit || DEFAULT_PAGINATION_LIMIT;
      const skip = (page - 1) * limit;

      const total = await this.addressBookModel.countDocuments();

      const data = await this.addressBookModel.aggregate([
        {
          $match: {
            creator,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: { isDeleted: 0, __v: 0 },
        },
      ]);

      return {
        data,
        total,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
