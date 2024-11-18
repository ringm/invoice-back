import { PartialType, OmitType } from '@nestjs/mapped-types';
import { BaseInvoiceDto } from './base-invoice.dto';

export class UpdateInvoiceDto extends PartialType(
  OmitType(BaseInvoiceDto, ['id']),
) {}
