import { UserAddress, Client, Invoice } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserSignUpResponseDto {
  @Exclude()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Exclude()
  addresses: UserAddress[];

  @Exclude()
  clients: Client[];

  @Exclude()
  invoices: Invoice[];

  @Exclude()
  password: string;
}
