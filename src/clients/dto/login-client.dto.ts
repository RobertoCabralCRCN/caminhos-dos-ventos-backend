import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginClientDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;
}
