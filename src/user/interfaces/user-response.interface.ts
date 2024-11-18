import { User, UserAddress, Client, Invoice } from '@prisma/client';

export interface UserInterface extends User {
  addresses: UserAddress[];
  clients: Client[];
  invoices: Invoice[];
}
