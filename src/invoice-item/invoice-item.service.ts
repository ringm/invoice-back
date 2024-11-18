import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItem } from '@prisma/client';

@Injectable()
export class InvoiceItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInvoiceItemDto): Promise<ResponseDto<InvoiceItem>> {
    try {
      const invoiceItem = await this.prisma.invoiceItem.create({
        data: data,
      });
      return {
        message: 'Invoice Item created successfully.',
        data: invoiceItem,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't create invoice item.");
    }
  }

  async findOne(id: number): Promise<ResponseDto<InvoiceItem>> {
    try {
      const invoiceItem = await this.prisma.invoiceItem.findUnique({
        where: { id: id },
      });

      if (!invoiceItem) {
        throw new NotFoundException(`Invoice Item with ID: ${id} not found.`);
      }
      return {
        message: 'Invoice Item retrieved successfully.',
        data: invoiceItem,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't retrieve invoice item.");
    }
  }

  async update(
    id: number,
    invoiceItemData: UpdateInvoiceItemDto,
  ): Promise<ResponseDto<InvoiceItem>> {
    try {
      await this.findOne(id);

      const invoiceItem = await this.prisma.invoiceItem.update({
        where: { id: id },
        data: invoiceItemData,
      });

      return {
        message: 'Invoice Item updated successfully.',
        data: invoiceItem,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't update invoice item.");
    }
  }

  async getAll(): Promise<ResponseDto<InvoiceItem[]>> {
    try {
      const invoicesItems = await this.prisma.invoiceItem.findMany();

      return {
        message: 'Invoice items retrieved successfully.',
        data: invoicesItems,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Couldn't retrieve invoice items.",
      );
    }
  }

  async delete(id: number): Promise<ResponseDto<InvoiceItem>> {
    try {
      await this.findOne(id);
      const invoice = await this.prisma.invoiceItem.delete({
        where: { id: id },
      });

      return {
        message: 'Invoice item deleted successfully.',
        data: invoice,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't delete invoice item.");
    }
  }
}
