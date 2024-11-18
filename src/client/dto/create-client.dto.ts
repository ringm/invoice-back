import { OmitType } from '@nestjs/mapped-types';
import { BaseClientDto } from './base-client.dto';

export class CreateClientDto extends OmitType(BaseClientDto, ['id']) {}
