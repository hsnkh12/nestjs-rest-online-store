import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from './jwt.service';


@Injectable()
export class JwtMiddlewareService implements NestMiddleware {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = await this.jwtAuthService.verifyToken(token);
      req['user'] = decoded; 
      next();
    } catch (err) {
        throw new UnauthorizedException();
    }
  }
}
