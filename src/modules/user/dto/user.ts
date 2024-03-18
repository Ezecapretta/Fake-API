import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEmail,
  IsInt,
  IsBoolean,
} from 'class-validator';

class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdUserDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}

export class CreateUserDTO extends BaseUserDto {
  @IsNotEmpty()
  @IsInt()
  UserTypeId!: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  profilePic!: any;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
