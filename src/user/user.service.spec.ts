import { Test, TestingModule } from "@nestjs/testing"

import { UserService } from "./user.service"
import { userRepositoryMock } from "../testing/user-repository.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { createUserDto } from "../testing/create-user-dto.mock";

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
            const result = await userService.create(createUserDto);

            expect(result).toEqual(userEntityList[0]);
        })
    });
    describe('Read', () => {
        it('method getAll', async () => {
            const result = await userService.getAll();

            expect(result).toEqual(userEntityList);
        });

        it('method getById', async () => {
            const result = await userService.getById(1);

            expect(result).toEqual(userEntityList[0]);
        });
    });
    describe('Update', () => {});
    describe('Delete', () => {});
});