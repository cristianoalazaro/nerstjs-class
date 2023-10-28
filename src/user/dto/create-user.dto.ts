import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { Column } from 'typeorm';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string = null;

  @Column({
    default: Role.User
  })
  role?: Role;
}
