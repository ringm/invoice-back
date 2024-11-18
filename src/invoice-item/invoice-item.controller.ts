import {
  Controller,
  Get,
  Post,
  Bind,
  Req,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private invoiceItemService: InvoiceItemService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceItemDto) {
    return this.invoiceItemService.create(createInvoiceDto);
  }

  @Get()
  @Bind(Req())
  async findAll() {
    return this.invoiceItemService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.invoiceItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() invoiceItemData: UpdateInvoiceItemDto,
  ) {
    return this.invoiceItemService.update(+id, invoiceItemData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.invoiceItemService.delete(+id);
  }
}
