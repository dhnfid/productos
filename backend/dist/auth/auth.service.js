"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    mockUser = {
        id: '1',
        email: 'jorge51@taller.com',
        pass: 'jorge517AZZ',
    };
    async validarUsuario(email, pass) {
        console.log('=== DATOS RECIBIDOS EN BACKEND ===');
        console.log('Email enviado:', JSON.stringify(email));
        console.log('Pass enviada :', JSON.stringify(pass));
        if (!email || !pass) {
            console.log('RECHAZADO: Email o Pass es null/undefined');
            return null;
        }
        const emailLimpio = email.trim().toLowerCase();
        const passLimpia = String(pass).trim();
        if (emailLimpio !== this.mockUser.email.toLowerCase()) {
            console.log('RECHAZADO: El email no coincide');
            return null;
        }
        if (passLimpia !== this.mockUser.pass) {
            console.log('RECHAZADO: La contraseña no coincide');
            return null;
        }
        console.log('SUCCESS: Credenciales correctas');
        const { pass: _, ...resultado } = this.mockUser;
        return resultado;
    }
    async login(credenciales) {
        const email = credenciales?.email;
        const password = credenciales?.pass || credenciales?.password;
        const usuario = await this.validarUsuario(email, password);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: usuario.id, email: usuario.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map