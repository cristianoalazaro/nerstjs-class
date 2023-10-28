import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Column } from 'typeorm';
import { Role } from 'src/enums/role.enum';

export class UpdatePatchUserDTO {
    @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password?: string;

  @IsOptional()
  @IsDateString()
  birthAt?: Date = null;

  @IsOptional()
  @Column({
    default: Role.User
  })
  role?: Role;
}
