import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./sto/auth-login.dto";
import { AuthRegisterDTO } from "./sto/auth-register.dto";
import { AuthForgetDTO } from "./sto/auth-forget.dto";
import { AuthResetDTO } from "./sto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return await this.authService.login(email, password)
    };

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.userService.create(body);
    };

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return await this.authService.forget(email)
    };

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return await this.authService.reset(password, token)
    }
}