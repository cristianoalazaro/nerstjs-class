import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions:{
                expiresIn: process.env.AUTH_EXPIRES_IN,
            }
        })
    ],
    controllers: [AuthController],
})
export class AuthModule {}