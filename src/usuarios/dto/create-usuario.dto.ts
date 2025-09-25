import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsOptional, IsBoolean } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { message: "A senha deve conter pelo menos: 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial" }
  )
  senha!: string;

  @IsOptional()
  @IsBoolean()
  superUser?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}


