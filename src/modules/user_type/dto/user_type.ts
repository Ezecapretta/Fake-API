import { IsNotEmpty, IsString } from 'class-validator';

class BaseUserTypeDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdUserTypeDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateUserTypeDTO extends BaseUserTypeDTO {}

export class UpdateUserTypeDTO extends BaseUserTypeDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
