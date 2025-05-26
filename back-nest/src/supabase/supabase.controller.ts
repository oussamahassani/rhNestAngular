// src/supabase/supabase.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const result = await this.supabaseService.uploadFile(file.path, file.filename);
    return {
      message: 'File uploaded to Supabase',
      data: result,
    };
  }
}
