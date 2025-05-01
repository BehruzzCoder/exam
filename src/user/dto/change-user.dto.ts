import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ChangedPassword {
    @ApiProperty({ example: "example@gmail.com" })
    @IsEmail()
    email: string;
    @ApiProperty({ example: "password" })
    @IsString()
    password: string;
    @ApiProperty({example: "new Password"})
    @IsString()
    new_password: string
}  