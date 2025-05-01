import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsInt,
    Min,
    Max,
    Length,
    IsEnum,
} from 'class-validator';
import { RoleStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @ApiProperty()
    @IsInt({ message: 'Year must be an integer' })
    @Min(1900, { message: 'Year must be after 1900' })
    @Max(new Date().getFullYear(), { message: 'Year cannot be in the future' })
    year: number;

    @ApiProperty()
    @IsEmail({}, { message: 'Email is invalid' })
    email: string;

    @ApiProperty()
    @IsString()
    @Length(6, 32, {
        message: 'Password must be between 6 and 32 characters',
    })
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Image must be a string (URL or filename)' })
    image?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt({ message: 'Region ID must be an integer if provided' })
    region_id: number;

    @ApiProperty({ enum: RoleStatus, example: RoleStatus.USER })
    @IsEnum(RoleStatus, { message: 'Role must be a valid RoleStatus enum' })
    role: RoleStatus;
}  