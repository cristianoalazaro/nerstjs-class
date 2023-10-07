import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';

//@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  //@UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@ParamId() id: number) {
    return this.userService.getById(id);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @ParamId() id: number,
  ) {
    return await this.userService.update(body, id);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @ParamId() id: number,
  ) {
    return this.userService.updatePartial(body, id);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
