import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; pass: string }) {
    console.log('=== DATOS RECIBIDOS EN BACKEND ===');
    console.log('Email enviado:', body?.email);
    console.log('Pass enviada :', body?.pass);

    // Llamada directa al método principal
    return await this.authService.login(body);
  }
}