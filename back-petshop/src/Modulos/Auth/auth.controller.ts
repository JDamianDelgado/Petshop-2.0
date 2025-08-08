import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/Modulos/Auth/Guard/auth.Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  RegisterUser(@Body() user: RegisterDto) {
    return this.authService.registerUser(user);
  }

  @Post('login')
  LoginUser(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
