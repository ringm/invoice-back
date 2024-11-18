import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UserExistsMiddleware } from 'src/common/middleware/user-exists.middleware';

@Module({
  imports: [SharedModule],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'user-address', method: RequestMethod.POST });
  }
}
