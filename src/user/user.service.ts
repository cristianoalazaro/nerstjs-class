import { Injectable, NotFoundException } from "@nestjs/common";
//import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    //constructor( private readonly prisma: PrismaService ) {}
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {};

    async create(data: CreateUserDTO) {
        //const { name, email, password, birthAt, role } = data;
        if (data.birthAt) {
            data.birthAt = new Date(data.birthAt).toISOString();
        };
        
        data.password = await this.generateHashPassword(data.password);

        this.userRepository.create(data);

        return this.userRepository.save(data);

        /*return await this.prisma.user.create({
            data,
        });*/
    };

    async getAll() {
        //return await this.prisma.user.findMany();

        return await this.userRepository.find();
    };

    async getById(id: number) {
        
        await this.exists(id);

        /*return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });*/

        return await this.userRepository.findOneBy({ id });
    };

    async update(data: UpdatePutUserDTO, id: number) {
        await this.exists(id);

        data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;

        data.password = await this.generateHashPassword(data.password);

        /*return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });*/

        await this.userRepository.update(
            id,
            data,            
        );

        return await this.getById(id);
    };

    async updatePartial(data: UpdatePatchUserDTO, id: number) {
        await this.exists(id);

        data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;
        
        if (data.password) {
            data.password = await this.generateHashPassword(data.password);
        };

        /*return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });*/

        await this.userRepository.update(
            id,
            data
        );

        return await this.userRepository.findOneBy({ id });
    };

    async delete(id: number) {
        await this.exists(id);

        //return await this.prisma.user.delete({ where: { id } })
        return await this.userRepository.delete( id );
    };

    async exists(id: number) {
        /*if (!await this.prisma.user.count({
            where: {
                id,
            }
        }))*/ 
        
        if (await this.userRepository.exist({
            where: {
                id,
            }
        })) {
            return true
        } else {
            throw new NotFoundException(`User ${id} not exist!`);
        }
    };

    async generateHashPassword (password: string) {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(password, salt);
    }
}