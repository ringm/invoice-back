import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserAddress } from '@prisma/client';

@Injectable()
export class UserAddressService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserAddressDto: CreateUserAddressDto,
  ): Promise<ResponseDto<UserAddress>> {
    try {
      const address = await this.prisma.userAddress.create({
        data: createUserAddressDto,
      });
      return {
        message: 'User address created successfully',
        data: address,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating user address.');
    }
  }

  async findOne(id: number): Promise<ResponseDto<UserAddress>> {
    try {
      const userAddress = await this.prisma.userAddress.findUnique({
        where: {
          id: id,
        },
      });

      if (!userAddress) {
        throw new NotFoundException(`User address with ID: ${id} not found.`);
      }

      return {
        message: 'User address retrieved successfully.',
        data: userAddress,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving user address.');
    }
  }

  async update(
    id: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<ResponseDto<UserAddress>> {
    try {
      await this.findOne(id);

      const address = await this.prisma.userAddress.update({
        where: {
          id: id,
        },
        data: updateUserAddressDto,
      });

      return {
        message: 'User address updated successfully',
        data: address,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating user address.');
    }
  }

  async remove(id: number): Promise<ResponseDto<UserAddress>> {
    try {
      await this.findOne(id);

      const userAddress = await this.prisma.userAddress.delete({
        where: { id: id },
      });

      return {
        message: 'User address deleted successfully.',
        data: userAddress,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete user address.');
    }
  }
}
