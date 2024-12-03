import {
  BadRequestException,
  Injectable,
  Dependencies,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
@Dependencies(UserService, JwtService)
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (user.data && bcrypt.compareSync(password, user.data.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user.data;
        return rest;
      } else {
        throw new UnauthorizedException('Invalid credentials.');
      }
    } catch (error) {
      if (error instanceof NotFoundException || UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't validate user.");
    }
  }

  async login(user: Pick<User, 'id' | 'email' | 'name'>) {
    const payload = { username: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async signUp(userData: SignUpDto): Promise<ResponseDto<User>> {
    try {
      console.log('user data', userData);
      const user = await this.userService.create(userData);
      return {
        message: 'User created successfully.',
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't create user.");
    }
  }
}
