import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
//import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        //private readonly prisma: PrismaService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
    ) { }

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
            }, {
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
        } catch (e) {
            return new BadRequestException(e);
        }
    };

    async login(email: string, password: string) {
        /*const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        });*/

        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Incorrect email and/or password!');
        };

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Incorrect email and/or password!');
        }

        return this.createToken(user);
    };

    async forget(email: string) {
        /*const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        });*/

        /*if (!user) {
            throw new UnauthorizedException('Incorrect email!');
        };

        const token = this.jwtService.sign({
            id: user.id
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        })

        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'cristianoalazaro@hotmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token,
            }
        });*/

        return true;
    };

    async reset(password: string, token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });

            if (isNaN(Number(data.id))) {
                throw new BadRequestException('Invalid token!');
            };

            const hash = await this.userService.generateHashPassword(password);

            /*const user = await this.prisma.user.update({
                where: {
                    id: data.id,
                },
                data: {
                    password: hash,
                }
            });*/

            //return this.createToken(user);
        } catch (e) {
            return new BadRequestException(e);
        }


    };

    async register(data: AuthRegisterDTO) {

        const user = await this.userService.create(data);


        //return this.createToken(user);
    };

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    };
}