import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions:{
                expiresIn: process.env.AUTH_EXPIRES_IN,
            }
        }),
        UserModule,
        PrismaService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}