import { IsInt, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class BaseClientDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
