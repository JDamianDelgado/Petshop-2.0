import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/Modulos/Auth/auth.Dto';
import { JwtAuthGuard } from 'src/Modulos/Auth/Guard/JWT/jwt-auth.guards';

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

  //guard para administrador
  @UseGuards(JwtAuthGuard)
  @Get()
  allUsers() {
    return this.authService.allUsers();
  }

  @Post('forgotPassword')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post(`resetPassword/:token`)
  async resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
