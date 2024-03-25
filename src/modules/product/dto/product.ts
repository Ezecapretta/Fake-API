import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

class BaseProductDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
}

export class GetProductDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  amount!: string;

  @IsOptional()
  @IsString()
  AuthorId?: string;

  @IsOptional()
  @IsString()
  CategoryId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  keyword?: string;
}

export class SearchIdProductDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateProductDTO extends BaseProductDTO {
  @IsNotEmpty()
  @IsString()
  AuthorId!: string;

  @IsNotEmpty()
  @IsString()
  CategoryId!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsOptional()
  image!: any;
}

export class UpdateProductDTO extends CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
