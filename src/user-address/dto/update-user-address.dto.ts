import { PartialType, OmitType } from '@nestjs/mapped-types';
import { BaseUserAddressDto } from './base-user-address.dto';

export class UpdateUserAddressDto extends PartialType(
  OmitType(BaseUserAddressDto, ['id', 'userId']),
) {}
