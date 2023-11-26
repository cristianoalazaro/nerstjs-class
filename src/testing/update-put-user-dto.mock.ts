import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';
import { Role } from '../enums/role.enum';

export const updatePutUserDTO: UpdatePutUserDTO = {
  name: 'Usuário teste',
  email: 'usuario@teste.com',
  password: '123456',
  birthAt: '1900-01-01',
  role: Role.User,
};
