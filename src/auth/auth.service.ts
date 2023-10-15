import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
            },{
                subject: String(user.id),
                issuer: 'login',
                expiresIn: process.env.AUTH_EXPIRES_IN,
                audience: 'users',
            })
        }
    };

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
            });

            return data;
        } catch(e) {
            return new BadRequestException(e);
        }
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

        return this.createToken(user);
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

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        });

        return this.createToken(user);
    };

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);   

        return this.createToken(user);
    };

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch(e) {
            return false;
        }
    };
}