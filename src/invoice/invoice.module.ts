import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UserExistsMiddleware } from 'src/common/middleware/user-exists.middleware';

@Module({
  imports: [SharedModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'invoice', method: RequestMethod.POST });
  }
}
