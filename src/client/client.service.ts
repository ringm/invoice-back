import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ResponseDto<Client>> {
    try {
      const client = await this.prisma.client.create({
        data: createClientDto,
      });
      return {
        message: 'Client created successfully',
        data: client,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating client.');
    }
  }

  async findAll(): Promise<ResponseDto<Client[]>> {
    try {
      const clients = await this.prisma.client.findMany();

      return {
        message: 'Clients retrieved successfully.',
        data: clients,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't retrieve invoices.");
    }
  }

  async findAllByUser(id: number): Promise<ResponseDto<Client[]>> {
    try {
      const clients = await this.prisma.client.findMany({
        where: { userId: id },
      });

      return {
        message: 'User Clients retrieved successfully.',
        data: clients,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't retrieve invoices.");
    }
  }

  async findOne(id: number): Promise<ResponseDto<Client>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id: id,
        },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID: ${id} doesn't exist.`);
      }

      return {
        message: 'Client retrieved successfully.',
        data: client,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving client.');
    }
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ResponseDto<Client>> {
    try {
      await this.findOne(id);

      const client = await this.prisma.client.update({
        where: {
          id: id,
        },
        data: updateClientDto,
      });
      return {
        message: 'Client updated successfully',
        data: client,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating client.');
    }
  }

  async remove(id: number): Promise<ResponseDto<Client>> {
    try {
      await this.findOne(id);

      const client = await this.prisma.client.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Client deleted successfully.',
        data: client,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't delete client.");
    }
  }
}
