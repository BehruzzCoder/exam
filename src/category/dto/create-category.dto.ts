import { ApiProperty } from "@nestjs/swagger";
import { TypesStatus } from "@prisma/client";
import { IsEnum, isEnum, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: "Samsung" })
    @IsString()
    name: string
    @ApiProperty({enum: TypesStatus, example: TypesStatus.PHONE})
    @IsEnum(TypesStatus)
    type: TypesStatus
}
