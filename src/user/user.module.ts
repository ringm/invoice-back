import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordHasherService } from './password-hasher.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserExistsMiddleware } from 'src/common/middleware/user-exists.middleware';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, PasswordHasherService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.PATCH },
        { path: 'user/:id', method: RequestMethod.DELETE },
      );
  }
}
