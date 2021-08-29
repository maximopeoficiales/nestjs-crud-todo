import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export type AuthJwt = {
    user: User, jwt: string
};

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User): Promise<Partial<AuthJwt>> {
        const payload: User = { username: user.username, userId: user.userId };
        return {
            jwt: this.jwtService.sign(payload),
            user
        };
    }
}