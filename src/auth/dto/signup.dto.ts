import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password must contain at least one letter and one number and be at least 6 characters long.',
  })
  password: string;
}
