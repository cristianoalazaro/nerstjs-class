import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./sto/auth-login.dto";
import { AuthRegisterDTO } from "./sto/auth-register.dto";
import { AuthForgetDTO } from "./sto/auth-forget.dto";
import { AuthResetDTO } from "./sto/auth-reset.dto";

@Controller('auth')
export class AuthController {
    @Post('login')
    async login(@Body() body: AuthLoginDTO) {

    };

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

    };

    @Post('forget')
    async forget(@Body() body: AuthForgetDTO) {
        
    };

    @Post('reset')
    async reset(@Body() body: AuthResetDTO) {
        
    }
}