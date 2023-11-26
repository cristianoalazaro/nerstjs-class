import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDto } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-put-partial-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('Validate definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('method create', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    it('method getAll', async () => {
      const result = await userService.getAll();

      expect(result).toEqual(userEntityList);
    });

    it('method getById', async () => {
      const result = await userService.getById(userEntityList[0].id);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    it('method update', async () => {
      const result = await userService.update(updatePutUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('UpdatePartial', () => {
    it('method UpdatePartial', async () => {
      const result = await userService.updatePartial(updatePatchUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('method Delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
