import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {

    // intertamente usa la estrategia local , si es correcto devuelve el user
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}
