import { User } from '@prisma/client';

export interface UserInterface extends User {
  // addresses: UserAddress[];
  // clients: Client[];
  // invoices: Invoice[];
}
