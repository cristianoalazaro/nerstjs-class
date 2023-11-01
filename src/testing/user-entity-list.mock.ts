import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";


export const userEntityList: UserEntity[] = [
    {
        id: 1,
        name: 'Usuário teste',
        email: 'usuario@teste.com',
        password: '$2b$10$MaPgugi.dlMv4uzo5SYIs.sILlncf1Pp9EHWrqDdbJa75eLsCYXaW',
        birthAt: new Date('1900-01-01'),
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
    },    {
        id: 2,
        name: 'Usuário teste2',
        email: 'usuario@teste2.com',
        password: '$2b$10$MaPgugi.dlMv4uzo5SYIs.sILlncf1Pp9EHWrqDdbJa75eLsCYXaW',
        birthAt: new Date('1900-01-01'),
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
    },    {
        id: 3,
        name: 'Usuário teste3',
        email: 'usuario@teste3.com',
        password: '$2b$10$MaPgugi.dlMv4uzo5SYIs.sILlncf1Pp9EHWrqDdbJa75eLsCYXaW',
        birthAt: new Date('1900-01-01'),
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
    },    {
        id: 4,
        name: 'Usuário teste4',
        email: 'usuario@teste4.com',
        password: '$2b$10$MaPgugi.dlMv4uzo5SYIs.sILlncf1Pp9EHWrqDdbJa75eLsCYXaW',
        birthAt: new Date('1900-01-01'),
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];