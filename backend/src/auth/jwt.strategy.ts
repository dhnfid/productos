import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRETO_SUPER_SEGURO_CAMBIAR_EN_PROD', // Debe coincidir con el secret de auth.module.ts
    });
  }

  async validate(payload: any) {
    // Si el token es válido, este método retorna el usuario y Nest lo inyecta en req.user
    if (!payload) {
      throw new UnauthorizedException('Token no válido');
    }
    return { userId: payload.sub, email: payload.email };
  }
}