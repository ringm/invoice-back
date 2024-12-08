import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordHasherService } from './password-hasher.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserExistsMiddleware } from 'src/common/middleware/user-exists.middleware';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ClientService } from 'src/client/client.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordHasherService,
    InvoiceService,
    ClientService,
  ],
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
        { path: 'user/:id/invoices', method: RequestMethod.GET },
        { path: 'user/:id/clients', method: RequestMethod.GET },
      );
  }
}
