import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserInterface } from './interfaces/user-response.interface';
import { PasswordHasherService } from './password-hasher.service';
import { UpdateClientDto } from 'src/client/dto/update-client.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordHasherService: PasswordHasherService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await this.passwordHasherService.hashPassword(
        data.password,
      );

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user.');
    }
  }

  async findOne(id: number): Promise<ResponseDto<UserInterface>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID: ${id} not found`);
      }

      return {
        message: 'User retrieved successfully.',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving user');
    }
  }

  async findOneByEmail(email: string): Promise<ResponseDto<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException(`User with email: ${email} not found.`);
      }

      return {
        message: 'User retrieved successfully.',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving user');
    }
  }

  async update(
    id: number,
    userData: UpdateClientDto,
  ): Promise<ResponseDto<User>> {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: userData,
      });

      return {
        message: 'User updated successfully.',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't update user.");
    }
  }

  async remove(id: number): Promise<ResponseDto<User>> {
    try {
      const user = await this.prisma.user.delete({ where: { id: id } });

      return { message: 'User deleted successfully.', data: user };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't delete user.");
    }
  }
}
