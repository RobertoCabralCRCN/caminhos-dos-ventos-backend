import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class AssignResponsibleDto {
  @IsString()
  @IsNotEmpty()
  responsibleName!: string;
}
