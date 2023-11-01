import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";

export const createUserDto: CreateUserDTO = {
    name: 'Usuário teste',
    email: 'usuario@teste.com',
    password: '123456',
    birthAt: '1900-01-01',
    role: Role.User,
}