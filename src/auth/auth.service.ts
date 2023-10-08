import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async createToken() {
        //return this.jwtService.sign();
    };

    async checkToken() {
        //return
    };

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Incorrect email and/or password!');
        };

        return user;
    };

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (user) {
            throw new UnauthorizedException('Incorrect email!');
        };

        //TO DO: Send an email to change the password

        return true;
    };

    async reset(password: string, token: string) {
        //TOD DO: Validate the token

        const id =  0; //It'll be extracted from the token

        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        });

        return true;
    };
}