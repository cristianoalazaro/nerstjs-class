import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinationPath: jest.fn().mockResolvedValue(''),
    upload: jest.fn().mockResolvedValue(''),
    uploadFiles: jest.fn().mockResolvedValue(''),
  },
};
