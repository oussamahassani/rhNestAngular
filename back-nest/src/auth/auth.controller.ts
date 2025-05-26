import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
interface UserPayload {
  _id: string;
  email: string;
  name: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ access_token: string; user: UserPayload }> {
    const user = await this.authService.validateUser(body.email, body.password);
    //console.log("eeeee");
    
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user); // return access_token
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // { userId, email }
  }
}
