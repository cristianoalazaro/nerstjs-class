import { Role } from "../enums/role.enum";
import { AuthRegisterDTO } from "../auth/dto/auth-register.dto";

export const authRegisterDto: AuthRegisterDTO = {
    name: 'Usuário teste',
    email: 'usuario@teste.com',
    password: '123456',
    birthAt: '1900-01-01',
    role: Role.User,
}