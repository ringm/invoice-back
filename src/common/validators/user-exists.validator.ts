import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return `User with ID ${args.value} does not exist`;
  }
}
