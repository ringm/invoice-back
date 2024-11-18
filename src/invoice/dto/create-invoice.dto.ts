import { OmitType } from '@nestjs/mapped-types';
import { BaseInvoiceDto } from './base-invoice.dto';

export class CreateInvoiceDto extends OmitType(BaseInvoiceDto, ['id']) {}
