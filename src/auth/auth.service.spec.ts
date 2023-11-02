import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AuthService } from "./auth.service"
import { UserEntity } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";
import { userRepositoryMock } from "src/testing/user-repository.mock";

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                UserService,
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        userRepository = module.get(getRepositoryToken(UserEntity));
    });

    it('Validate definition', () => {
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    })
})