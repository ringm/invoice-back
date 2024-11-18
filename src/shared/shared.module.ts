import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserExistsValidator } from 'src/common/validators/user-exists.validator';

@Module({
  imports: [PrismaModule],
  providers: [UserExistsValidator],
  exports: [PrismaModule, UserExistsValidator],
})
export class SharedModule {}
