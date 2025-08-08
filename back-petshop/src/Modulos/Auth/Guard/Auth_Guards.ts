import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// GUARD PARA RUTAS JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
