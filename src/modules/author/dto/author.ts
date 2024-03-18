import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class BaseAuthorDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdAuthorDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateAuthorDTO extends BaseAuthorDTO {
  @IsNotEmpty()
  @IsNumber()
  GenreId!: string;
}

export class UpdateAuthorDTO extends BaseAuthorDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  // @IsOptional()
  // @IsString()
  // GenreId?: string;
}
