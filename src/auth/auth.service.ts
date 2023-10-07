import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    createToken = async () => {
        //return this.jwtService.sign();
    }

    checkToken = async () => {
        //return
    }
}