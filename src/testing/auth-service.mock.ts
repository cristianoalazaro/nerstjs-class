import { AuthService } from '../auth/auth.service';
import { accessToken } from './access.tocken.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken }),
    checkToken: jest.fn().mockResolvedValue(jwtPayloadMock),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ accessToken }),
    register: jest.fn().mockResolvedValue({ accessToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockResolvedValue({ accessToken }),
    photo: jest.fn().mockResolvedValue({ success: true }),
    photos: jest.fn().mockResolvedValue({ success: true }),
  },
};
