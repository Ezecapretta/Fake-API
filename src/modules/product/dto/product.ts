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

export class SearchIdProductDTO extends BaseProductDTO {
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
