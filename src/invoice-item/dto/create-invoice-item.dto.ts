import { OmitType } from '@nestjs/mapped-types';
import { BaseInvoiceItemDto } from './base-invoice-items.dto';

export class CreateInvoiceItemDto extends OmitType(BaseInvoiceItemDto, [
  'id',
]) {}
