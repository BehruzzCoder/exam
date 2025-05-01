import { ApiProperty } from "@nestjs/swagger"
import { IsInt } from "class-validator"

export class CreateOrderDto {
    @ApiProperty({ example: 10 })
    @IsInt()
    count: number
    @ApiProperty({ example: 3 })
    @IsInt()
    product_id: number
}
