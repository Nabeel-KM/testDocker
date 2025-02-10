import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const DEFAULT_PAGINATION_PAGE = 1;
export const DEFAULT_PAGINATION_LIMIT = 10;

const paginationDefaultPageTransformer = (obj): number => {
  const { value } = obj;
  return +value >= 0 ? Number.parseInt(value) : DEFAULT_PAGINATION_PAGE;
};

const paginationDefaultLimitTransformer = (obj): number => {
  const { value } = obj;
  return +value > 0 ? Number.parseInt(value) : DEFAULT_PAGINATION_LIMIT;
};

const undefinedToStringTransformer = (obj): any => {
  const { value } = obj;
  return value || '';
};

export class PaginationDto {
  @ApiProperty({ type: Number, required: false, name: 'page' })
  @IsOptional()
  @Transform(paginationDefaultPageTransformer)
  page?: number;

  @ApiProperty({ type: Number, required: false, name: 'limit' })
  @IsOptional()
  @Transform(paginationDefaultLimitTransformer)
  limit?: number;
}

export class OrderPaginationDto {
  @ApiProperty({ type: String, required: false, name: 'status' })
  @IsOptional()
  status?: string;

  @ApiProperty({ type: Number, required: false, name: 'page' })
  @IsOptional()
  @Transform(paginationDefaultPageTransformer)
  page?: number;

  @ApiProperty({ type: Number, required: false, name: 'limit' })
  @IsOptional()
  @Transform(paginationDefaultLimitTransformer)
  limit?: number;
}

export class SearchPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    name: 'searchQuery',
    default: '',
  })
  @IsString()
  @Transform(undefinedToStringTransformer)
  searchQuery?: string;

  @ApiProperty({ type: String, required: false, name: 'location', default: '' })
  @IsString()
  @Transform(undefinedToStringTransformer)
  location?: string;

  @ApiProperty({ type: Number, required: false, name: 'page' })
  @IsOptional()
  @Transform(paginationDefaultPageTransformer)
  page?: number;

  @ApiProperty({ type: Number, required: false, name: 'limit' })
  @IsOptional()
  @Transform(paginationDefaultLimitTransformer)
  limit?: number;
}

export class VendorAvailabilityDto {
  @ApiProperty({ type: String, required: true, name: 'availability' })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  @IsBoolean()
  availability: boolean;
}

export class AdminUserSearchPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    name: 'searchQuery',
    default: '',
  })
  @IsString()
  @Transform(undefinedToStringTransformer)
  @Transform(({ value }) => value?.trim())
  searchQuery?: string;

  @ApiProperty({ type: Number, required: false, name: 'page' })
  @IsOptional()
  @Transform(paginationDefaultPageTransformer)
  page?: number;

  @ApiProperty({ type: Number, required: false, name: 'limit' })
  @IsOptional()
  @Transform(paginationDefaultLimitTransformer)
  limit?: number;
}
