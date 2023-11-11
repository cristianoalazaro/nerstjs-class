import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/user-repository.mock";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { mailerServiceMock } from "../testing/mailer-service.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { accessToken } from "../testing/access.tocken.mock";
import { jwtPayloadMock } from "../testing/jwt-payload.mock";

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                jwtServiceMock,
                userServiceMock,
                mailerServiceMock,
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('Validate definition', () => {
        expect(authService).toBeDefined();
    });

    describe('token', () => {
        it('createToken method', () => {
            const result = authService.createToken(userEntityList[0]);

            expect(result).toEqual({accessToken});
        });

        it('checkToken method', () => {
            const result = authService.checkToken(accessToken);

            expect(result).toEqual(jwtPayloadMock);
        });

        it('isValidToken method', () => {
            const result = authService.isValidToken(accessToken);

            expect(result).toEqual(true);
        });
    });

    describe('Authentication', () => {
        it('login method', async() => {
            const result = await authService.login('usuario@teste.com', '123123');

            expect(result).toEqual({accessToken});
        });

        it('forget method', async() => {
            const result = await authService.forget('usuario@teste.com');

            expect(result).toEqual(true);
        });

        it ('reset method', async() => {
            const result = await authService.reset('123456', accessToken);

            expect(result).toEqual({accessToken});
        })
    });
})