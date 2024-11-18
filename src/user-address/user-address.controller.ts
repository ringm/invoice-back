import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userAddressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.update(+id, updateUserAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userAddressService.remove(+id);
  }
}
