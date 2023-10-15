import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
//@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  //@UseInterceptors(LogInterceptor)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @Get()
  @Roles(Role.Admin)
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  async getOne(@ParamId() id: number) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Body() body: UpdatePutUserDTO,
    @ParamId() id: number,
  ) {
    return await this.userService.update(body, id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @ParamId() id: number,
  ) {
    return this.userService.updatePartial(body, id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
