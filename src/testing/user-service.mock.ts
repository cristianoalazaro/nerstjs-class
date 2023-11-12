import { UserService } from "../user/user.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
    provide: UserService,
    useValue: {
        create: jest.fn().mockResolvedValue(userEntityList[0]),
        getAll:jest.fn().mockResolvedValue(userEntityList),
        getById:jest.fn().mockResolvedValue(userEntityList[0]),
        update: jest.fn().mockResolvedValue(userEntityList[0]),
        delete: jest.fn().mockResolvedValue(true),
        exists: jest.fn().mockResolvedValue(true),
        updatePartial: jest.fn(),
        generateHashPassword: jest.fn(),
    }
}