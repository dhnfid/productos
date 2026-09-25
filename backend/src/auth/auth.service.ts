import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly mockUser = {
    id: '1',
    email: 'jorge51@taller.com',
    pass: 'jorge517AZZ',
  };

  async validarUsuario(email: string, pass: string): Promise<any> {
    console.log('=== DATOS RECIBIDOS EN BACKEND ===');
    console.log('Email enviado:', JSON.stringify(email));
    console.log('Pass enviada :', JSON.stringify(pass));

    if (!email || !pass) {
      console.log('RECHAZADO: Email o Pass es null/undefined');
      return null;
    }

    // Normalizamos quitando espacios y pasando email a minúsculas
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

  async login(credenciales: any) {
    const email = credenciales?.email;
    const password = credenciales?.pass || credenciales?.password;

    const usuario = await this.validarUsuario(email, password);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}