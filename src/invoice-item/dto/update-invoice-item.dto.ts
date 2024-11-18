import { PartialType, OmitType } from '@nestjs/mapped-types';
import { BaseInvoiceItemDto } from './base-invoice-items.dto';

export class UpdateInvoiceItemDto extends PartialType(
  OmitType(BaseInvoiceItemDto, ['id', 'invoiceId']),
) {}
