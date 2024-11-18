import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id || req.body.userId, 10);

      if (isNaN(userId)) {
        throw new BadRequestException('Must provide valid user ID');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      next();
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't process the request.");
    }
  }
}
