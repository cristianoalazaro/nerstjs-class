import { AuthResetDTO } from "../auth/dto/auth-reset.dto";
import { resetToken } from "./reset.tocken.mock";

export const authResetDtoMock: AuthResetDTO = {
    password: '643211',
    token: resetToken,
}