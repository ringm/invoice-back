import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvoiceExistsMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceId = req.body?.invoiceId;

      if (!invoiceId) {
        throw new BadRequestException('Must provide valid invoice ID');
      }

      const invoice = await this.prisma.invoice.findUnique({
        where: { id: invoiceId },
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID: ${invoiceId} not found`);
      }

      next();
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't process the request.");
    }
  }
}
