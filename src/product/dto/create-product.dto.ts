import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConditionStatus } from '@prisma/client';


export class CreateProductDto {
    @ApiProperty({ example: 'iPhone 15 Pro Max' })
    @IsString()
    name: string;

    @ApiProperty({ example: 1499.99 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ enum: ConditionStatus, example: ConditionStatus.NEW })
    @IsEnum(ConditionStatus)
    situation: ConditionStatus;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @Min(0)
    count: number;

    @ApiProperty({ example: 5.5 })
    @IsNumber()
    @Min(0)
    sale: number;

    @ApiProperty({ example: 'This is a powerful smartphone with A17 Bionic chip' })
    @IsString()
    description: string;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    category_id?: number;
}