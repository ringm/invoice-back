import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';
import { SharedModule } from 'src/shared/shared.module';
import { InvoiceExistsMiddleware } from 'src/common/middleware/invoice-exists.middleware';

@Module({
  imports: [SharedModule],
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
})
export class InvoiceItemModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InvoiceExistsMiddleware)
      .forRoutes({ path: 'invoice-item', method: RequestMethod.POST });
  }
}
