import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
} from 'class-validator';

class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
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

  @IsOptional()
  createdAt?: Date;
}
