import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
//import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
//import { Role } from "../enums/role.enum";

@Injectable()
export class UserService {
    //constructor( private readonly prisma: PrismaService ) {}
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { };

    async create(data: CreateUserDTO) {
        try {
            console.log('aqui ', data)
            
            //const { name, email, password, birthAt, role } = data;
            const user = await this.userRepository.findOneBy({ email: data.email });
            console.log('aqui2 ', data)

            if (user) {
                throw new BadRequestException('Email already exists.');
            }


            if (data.birthAt) {
                data.birthAt = new Date(data.birthAt).toISOString();
            };

            data.password = await this.generateHashPassword(data.password);

            this.userRepository.create(data);

            return this.userRepository.save(data);

            /*return await this.prisma.user.create({
                data,
            });*/
        } catch (e) {
            throw new BadRequestException(e)
        }
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

        const user = await this.userRepository.findOneBy({ id });
        console.log('userrr ', user)
        return user;
    };

    async update({ name, email, password, birthAt, role }: UpdatePutUserDTO, id: number) {
        await this.exists(id);


        password = await this.generateHashPassword(password);

        /*return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });*/

        await this.userRepository.update(
            id,
            {
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt) : null,
                role,
            },
        );

        return await this.getById(id);
    };

    async updatePartial({name, email, password, birthAt, role}: UpdatePatchUserDTO, id: number) {
        await this.exists(id);

        if (password) {
            password = await this.generateHashPassword(password);
        };

        /*return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });*/

        await this.userRepository.update(
            id,
            {
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt) : null,
                role,
            }
        );

        return await this.userRepository.findOneBy({ id });
    };

    async delete(id: number) {
        await this.exists(id);

        //return await this.prisma.user.delete({ where: { id } })
        return await this.userRepository.delete(id);
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

    async generateHashPassword(password: string) {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(password, salt);
    }
}