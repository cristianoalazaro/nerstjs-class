import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly fileService: FileService,
    ) {}

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return await this.authService.login(email, password)
    };

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

        return this.authService.register(body);
    };

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return await this.authService.forget(email)
    };

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return await this.authService.reset(password, token)
    };

    @Post('photo')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.jpg`);

        try {
            await this.fileService.upload(path, photo);
        } catch(e) {
            throw new BadRequestException(e); 
        }
        
        return { success: true };
    }
}