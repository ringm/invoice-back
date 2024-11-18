import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UserExistsMiddleware } from 'src/common/middleware/user-exists.middleware';

@Module({
  imports: [SharedModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'client', method: RequestMethod.POST });
  }
}
