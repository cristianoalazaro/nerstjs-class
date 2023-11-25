import { BadRequestException, Body, Controller, ParseFilePipe, Post, UploadedFile, UploadedFiles, 
    UseGuards, UseInterceptors, FileTypeValidator, MaxFileSizeValidator 
} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { UserEntity } from "../user/entity/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
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
    async uploadPhoto(@User() user: UserEntity, @UploadedFile( new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: 'image/jpeg'}),
            new MaxFileSizeValidator({maxSize: 1024 * 100})]
    })) photo: Express.Multer.File) {
        const filename = `photo-${user.id}.jpg`;

        try {
            await this.fileService.upload(filename, photo);
        } catch(e) {
            throw new BadRequestException(e); 
        }
        
        return { success: true };
    };

    @Post('photos')
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    async uploadPhotos(@User() user: UserEntity, @UploadedFiles() photos: Array<Express.Multer.File>) {
        const filename = `photo-${user.id}.jpg`;

        try {
            await this.fileService.uploadFiles(filename, photos);
        } catch(e) {
            throw new BadRequestException(e);
        };

        return {success: true}
    };
};