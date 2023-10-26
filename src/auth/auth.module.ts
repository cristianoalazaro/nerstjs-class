import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
//import { PrismaModule } from "src/prisma/prisma.module";
import { FileModule } from "src/file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions:{
                expiresIn: process.env.AUTH_EXPIRES_IN,
            }
        }),
        forwardRef(() => UserModule ),
        //PrismaModule,
        TypeOrmModule.forFeature([UserEntity]),
        FileModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}