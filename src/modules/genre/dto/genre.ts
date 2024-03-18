import { IsNotEmpty, IsString } from 'class-validator';

class BaseGenreDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdGenreDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateGenreDTO extends BaseGenreDTO {}

export class UpdateGenreDTO extends BaseGenreDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
