import { OmitType } from '@nestjs/mapped-types';
import { BaseUserAddressDto } from './base-user-address.dto';

export class CreateUserAddressDto extends OmitType(BaseUserAddressDto, [
  'id',
]) {}
