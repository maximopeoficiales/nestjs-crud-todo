import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // se ejecutara antes de cualquier peticion
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        // da paso a las siguientes funciones declaradas en nuestro controlador
        next();
    }
}
