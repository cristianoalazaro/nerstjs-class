import { Role } from '../enums/role.enum';
import { AuthRegisterDTO } from '../auth/dto/auth-register.dto';

export const authRegisterDto: AuthRegisterDTO = {
  name: 'Usuário teste',
  email: 'usuario@teste.com',
  password: '123456',
  birthAt: null, //'2011-10-05T14:48:00.000Z',
  role: Role.User,
};
