import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Login must have atleast 2 characters.' })
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'First name must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'First name does not allow other than alpha numeric chars.',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'First name must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'First name does not allow other than alpha numeric chars.',
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;
}
