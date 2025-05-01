import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('upload')
export class AppController {

  @Post('image')
  @ApiOperation({ summary: 'Upload an image file' })  
  @ApiConsumes('multipart/form-data')  
  @ApiBody({
    description: 'File to upload',
    type: UploadFileDto,  
  })
  @ApiResponse({
    status: 200,
    description: 'File uploaded successfully',  
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',  
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file); 
    return { message: 'File uploaded successfully', file };  
  }
}
