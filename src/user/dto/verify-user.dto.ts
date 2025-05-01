import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class VerifyDto{
    @ApiProperty({example: "example@gmail.com"})
    @IsString()
    email: string
    @ApiProperty({example: 1234})
    @IsString()
    otp: string
}