import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  private async generateCustomId(): Promise<string> {
    const { customAlphabet } = await import('nanoid');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const nanoid = customAlphabet(alphabet, 8);
    return nanoid();
  }

  async create(data: CreateInvoiceDto): Promise<ResponseDto<Invoice>> {
    try {
      const customId = await this.generateCustomId();
      const invoice = await this.prisma.invoice.create({
        data: {
          ...data,
          id: customId,
        },
      });
      return {
        message: 'Invoice created successfully.',
        data: invoice,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't create invoice.");
    }
  }

  async findOne(id: string): Promise<ResponseDto<Invoice>> {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id: id },
        include: {
          invoiceItems: true,
        },
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID: ${id} not found.`);
      }
      return {
        message: 'Invoice retrieved successfully.',
        data: invoice,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't retrieve invoice.");
    }
  }

  async update(
    id: string,
    invoiceData: UpdateInvoiceDto,
  ): Promise<ResponseDto<Invoice>> {
    try {
      await this.findOne(id);

      const invoice = await this.prisma.invoice.update({
        where: { id: id },
        data: invoiceData,
      });

      return {
        message: 'Invoice updated successfully.',
        data: invoice,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't update invoice.");
    }
  }

  async findAll(): Promise<ResponseDto<Invoice[]>> {
    try {
      const invoices = await this.prisma.invoice.findMany({
        include: { billTo: { select: { name: true } }, invoiceItems: true },
      });

      const invoicesWithTotal = invoices?.map((invoice) => ({
        ...invoice,
        total: invoice?.invoiceItems?.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        ),
      }));

      return {
        message: 'Invoices retrieved successfully.',
        data: invoicesWithTotal,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't retrieve invoices.");
    }
  }

  async findAllByUser(id: number): Promise<ResponseDto<Invoice[]>> {
    try {
      const invoices = await this.prisma.invoice.findMany({
        where: { userId: id },
      });

      // const invoicesWithTotal = invoices?.map((invoice) => ({
      //   ...invoice,
      //   total: invoice?.invoiceItems?.reduce(
      //     (sum, item) => sum + item.price * item.qty,
      //     0,
      //   ),
      // }));

      return {
        message: 'User invoices retrieved successfully?',
        data: invoices,
      };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't retrieve invoices.");
    }
  }

  async delete(id: string): Promise<ResponseDto<Invoice>> {
    try {
      await this.findOne(id);
      const invoice = await this.prisma.invoice.delete({ where: { id: id } });

      return {
        message: 'Invoice deleted successfully.',
        data: invoice,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't delete invoice.");
    }
  }
}
