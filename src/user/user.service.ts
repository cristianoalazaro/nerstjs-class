import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

@Injectable()
export class UserService {
    constructor( private readonly prisma: PrismaService ) {}

    async create(data: CreateUserDTO) {
        const { name, email, password, birthAt } = data;
        let date: Date;
        if (data.birthAt) {
            date = new Date(birthAt)
        }

        return await this.prisma.user.create({
            data: {
                name,
                email,
                password,
                birthAt: date,
            },
        });
    };

    async getAll() {
        return await this.prisma.user.findMany();
    };

    async getById(id: number) {
        await this.exists(id);

        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    };

    async update(data: UpdatePutUserDTO, id: number) {
        await this.exists(id);

        data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;

        return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });
    };

    async updatePartial(data: UpdatePatchUserDTO, id: number) {
        await this.exists(id);

        data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;
        console.log(data);

        return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });
    };

    async delete(id: number) {
        await this.exists(id);

        return await this.prisma.user.delete({ where: { id } })
    };

    async exists(id: number) {
        if (!await this.prisma.user.count({
            where: {
                id,
            }
        })) {
            throw new NotFoundException(`User ${id} not exist!`);
        }
    }
}