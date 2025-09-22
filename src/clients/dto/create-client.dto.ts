import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  senha!: string;

  @IsString()
  @IsNotEmpty()
  rua!: string;

  @IsString()
  @IsNotEmpty()
  cidade!: string;

  @IsString()
  @IsNotEmpty()
  cep!: string;

  @IsString()
  @IsNotEmpty()
  telefone!: string;
}
