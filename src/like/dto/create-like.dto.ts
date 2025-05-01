import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateLikeDto {
    @ApiProperty({ example: 1 })
    @IsInt()  
    user_id: number;

    @ApiProperty({ example: 1 })
    @IsInt()  
    product_id: number;
}