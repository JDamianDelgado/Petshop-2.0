import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interface-jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'Joako_Admin_1234',
    });
  }

  validate(payload: JwtPayload) {
    if (payload.rol !== 'admin') return;
    return {
      idUser: payload.idUser,
      email: payload.email,
      rol: payload.rol,
    };
  }
}
