import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authLoginDtoMock } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/access.tocken.mock';
import { authRegisterDto } from '../testing/auth-register-dto.mock';
import { authForgetDtoMock } from '../testing/auth-Forget-dto.mock';
import { authResetDtoMock } from '../testing/auth-reset-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';
import { getPhotos } from '../testing/get-photos.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    fileService = module.get<FileService>(FileService);
  });

  it('validate definition', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe('Authtentication flow', () => {
    it('Login method', async () => {
      const result = await authController.login(authLoginDtoMock);
      expect(result).toEqual({ accessToken });
    });

    it('register method', async () => {
      const result = await authController.register(authRegisterDto);
      expect(result).toEqual({ accessToken });
    });

    it('forget method', async () => {
      const result = await authController.forget(authForgetDtoMock);
      expect(result).toEqual({ success: true });
    });

    it('reset method', async () => {
      const result = await authController.reset(authResetDtoMock);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Authenticated routes', () => {
    it('photo upload method', async () => {
      const photo = await getPhoto();

      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual({ success: true });
    });

    it('photos upload method', async () => {
      const photos = await getPhotos();

      const result = await authController.uploadPhotos(
        userEntityList[0],
        photos,
      );
      expect(result).toEqual({ success: true });
    });
  });
});
