'use client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './auth.Dto';
import { Carrito } from 'src/Entities/Carrito.entity';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Carrito)
    private readonly cartRepository: Repository<Carrito>,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
  ) {}
  // Validador de password
  validPassword(pass1: string, pass2: string): boolean {
    const hasNumber = /\d/.test(pass1);
    const hasSpecialChar = /[!@#$%^&*]/.test(pass1);

    if (pass1.length < 10 || !hasNumber || !hasSpecialChar || pass1 !== pass2) {
      return false;
    }

    return true;
  }

  // Registro de usuario
  async registerUser(user: RegisterDto): Promise<User> {
    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (findUser) throw new BadRequestException('Usuario ya registrado');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      age: user.age,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const cartNew = this.cartRepository.create({
      user: savedUser,
      cartItems: [],
    });
    if (!savedUser || !cartNew) {
      throw new BadRequestException(
        'No se pudo crear el usuario y/o el carrito',
      );
    }
    const savedCart = await this.cartRepository.save(cartNew);
    if (!savedCart) {
      await this.userRepository.remove(savedUser);
      throw new BadRequestException('No se pudo crear carrito de usuario');
    }

    return savedUser;
  }

  //Login de usuario
  async login(userData: LoginDto): Promise<{ token: string }> {
    const { email, password } = userData;
    const findUser = await this.userRepository.findOne({ where: { email } });
    if (!findUser) {
      throw new NotFoundException('No se encontro usuario ');
    } else {
      const validatPassword = await bcrypt.compare(password, findUser.password);
      if (!validatPassword) {
        throw new UnauthorizedException('Informacion incorrecta');
      }
      const payload = {
        id: findUser.idUser,
        email: findUser.email,
        rol: findUser.rol,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    }
  }

  async allUsers() {
    return this.userRepository.find();
  }

  async forgotPassword(email: string) {
    console.log('Email recibido en forgotPassword:', email);

    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!findUser) {
      throw new NotFoundException('No se encontro el email solicitado');
    } else {
      console.log('Usuario encontrado:', findUser);

      const payload = { sub: findUser.idUser, email: findUser.email };
      const token = this.jwtService.sign(payload, { expiresIn: '15m' });

      const resetLink = `${process.env.NODEMAILER_LINK_RESETPASSWORD}/${token}`;
      await this.nodemailerService.sendMail({
        to: findUser.email,
        subject: 'Restablecer la contraseña',
        text: 'Haz click en el siguiente enlace para restablecer tu contraseña',
        html: `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña.</p>`,
      });
      return { message: 'Se envio un correo para restablecer password' };
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { idUser: payload.sub },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
      return { message: 'Contraseña restablecida con exito' };
    } catch {
      throw new UnauthorizedException('Token invalido o expirado');
    }
  }
}
