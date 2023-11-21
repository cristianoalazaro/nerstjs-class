import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller";
import { AuthGuard } from "../guards/auth.guard";
import { guardMock } from "../testing/guard.mock";
import { RoleGuard } from "../guards/role.guard";
import { UserService } from "./user.service";
import { userServiceMock } from "../testing/user-service.mock";
import { createUserDto } from "../testing/create-user-dto.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { updatePutUserDTO } from "../testing/update-put-user-dto.mock";
import { updatePatchUserDTO } from "../testing/update-put-partial-user-dto.mock";

describe('User controller', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [userServiceMock]
        })
            .overrideGuard(AuthGuard)
            .useValue(guardMock)
            .overrideGuard(RoleGuard)
            .useValue(guardMock)
            .compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('Validate definition', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('guards test on this controller', () => {
        it('if guards are being used', () => {
            const guards = Reflect.getMetadata('__guards__', UserController);

            expect(guards.length).toEqual(2);
            expect(new guards[0]()).toBeInstanceOf(AuthGuard);
            expect(new guards[1]()).toBeInstanceOf(RoleGuard);
        });
    });

    it('Create method', async () => {
        const result = await userController.create(createUserDto);

        expect(result).toEqual(userEntityList[0]);
    });

    it('GetAll method', async () => {
        const result = await userController.getAll();

        expect(result).toEqual(userEntityList);
    });

    it('GetOne method', async () => {
        const result = await userController.getOne(1);

        expect(result).toEqual(userEntityList[0]);
    });

    it('Put Method', async () => {
        const result = await userController.update(updatePutUserDTO, 1);

        expect(result).toEqual(userEntityList[0]);
    });

    it('Patch Method', async () => {
        const result = await userController.updatePartial(updatePatchUserDTO, 1);

        expect(result).toEqual(userEntityList[0]);
    });

    it('Delete Method', async () => {
        const result = await userController.delete(1);

        expect(result).toEqual(true);
    });
});