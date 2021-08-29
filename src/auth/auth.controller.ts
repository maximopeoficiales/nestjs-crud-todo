import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/ jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // intertamente usa la estrategia local , si es correcto devuelve el user
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);

    }

    // Tiene proteccion jwt
    @UseGuards(JwtAuthGuard)
    @Get('test')
    getProfile(@Request() req) {
        return req.user;
    }
}
