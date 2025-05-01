import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min, Max } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: 'Yaxshi mahsulot' })
    @IsString()
    description: string;

    @ApiProperty({ example: 4 })
    @IsInt()
    @Min(1)
    @Max(5)
    star: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    product_id: number;
}