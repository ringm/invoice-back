import {
  Controller,
  Bind,
  UseGuards,
  Request,
  Body,
  Res,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UserSignUpResponseDto } from './dto/user-signup-res.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
@UseInterceptors(new TransformInterceptor(UserSignUpResponseDto))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Bind(Request())
  async login(req: { user: any }, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.send({ message: 'Login successful' });
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() userData: SignUpDto): Promise<ResponseDto<User>> {
    return this.authService.signUp(userData);
  }
}
