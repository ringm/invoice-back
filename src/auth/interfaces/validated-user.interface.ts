import { User } from '@prisma/client';

export type ValidatedUser = Omit<User, 'password'>;
