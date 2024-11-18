import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BaseInvoiceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  userAddressId: number;

  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  invoiceDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  paymentDue: Date;

  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;
}
