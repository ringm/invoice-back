import { UserAddress, Client, Invoice } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  addresses: UserAddress[];

  @Expose()
  clients: Client[];

  @Expose()
  invoices: Invoice[];

  @Exclude()
  password: string;
}
