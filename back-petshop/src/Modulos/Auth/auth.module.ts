import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Carrito } from 'src/Entities/Carrito.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/Modulos/Auth/Guard/JWT/jwt.strategy';
import { nodemailerModule } from '../nodemailer/nodemailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Carrito]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    nodemailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
