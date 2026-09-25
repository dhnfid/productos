import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private readonly mockUser;
    validarUsuario(email: string, pass: string): Promise<any>;
    login(credenciales: any): Promise<{
        access_token: string;
    }>;
}
