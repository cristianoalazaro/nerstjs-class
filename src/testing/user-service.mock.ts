import { UserService } from "../user/user.service";

export const userServiceMock = {
    provide: UserService,
    useValue: {
        create: jest.fn(),
        getAll:jest.fn(),
        getById:jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        exists: jest.fn(),
        updatePartial: jest.fn(),
        generateHashPassword: jest.fn(),
    }
}