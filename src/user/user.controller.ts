import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UserResponseDto } from './dto/user-response.dto';
import { ClientService } from 'src/client/client.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
  ) {}

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/invoices')
  findAllInvoices(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.findAllByUser(id);
  }

  @Get(':id/clients')
  findAllClients(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findAllByUser(id);
  }

  @Patch(':id')
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.update(+id, userData);
  }

  @Delete(':id')
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
