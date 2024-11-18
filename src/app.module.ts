import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { UserAddressModule } from './user-address/user-address.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    InvoiceModule,
    ClientModule,
    UserAddressModule,
    InvoiceItemModule,
    AuthModule,
  ],
})
export class AppModule {}
