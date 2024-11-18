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
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
@UseInterceptors(new TransformInterceptor(UserResponseDto))
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return this.service.update(+id, userData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.service.remove(+id);
  }
}
