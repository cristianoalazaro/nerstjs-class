import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { userRepositoryMock } from "../testing/user.repository.mock";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";

const userEntityList: UserEntity[] = [
    {
        id: 1,
        name: 'Usuário teste',
        email: 'usuario@teste.com',
        password: '123456',
        birthAt: new Date('1900-01-01'),
        role: 1,
        createdAt: '2023-10-31',
    }
]

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRepositoryMock,
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('Validate definition', () => {
        expect(userService).toBeDefined();
    });

    describe('Create', () => {
        it('method create', async () => {
            const data: CreateUserDTO = {
                name: 'Usuário teste',
                email: 'usuario@teste.com',
                password: '123456',
                birthAt: '1900-01-01',
                role: 1,
            }
            const result = await userService.create(data);
        })
    });
    describe('Read', () => {});
    describe('Update', () => {});
    describe('Delete', () => {});
});