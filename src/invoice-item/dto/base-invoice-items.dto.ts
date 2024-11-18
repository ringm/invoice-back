import { IsInt, IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';

export class BaseInvoiceItemDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0, { message: 'Qty must be greater than 0.' })
  qty: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Qty amount must be a valid number with up to two decimal places',
    },
  )
  @IsNotEmpty()
  price: number;
}
