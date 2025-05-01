import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class createChatDto {
    @ApiProperty({example: 1})
    @IsInt()
    to_id: number
    @ApiProperty({example: "Hello"})
    @IsString()
    text: string
}