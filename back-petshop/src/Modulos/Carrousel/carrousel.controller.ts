import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarrouselService } from './carrousel.service';

@Controller('carrousel')
export class CarrouselController {
  constructor(private readonly carrouselService: CarrouselService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { titulo: string; descripcion: string },
  ) {
    const { titulo, descripcion } = body;

    return await this.carrouselService.createCarrousel(
      file,
      titulo,
      descripcion,
    );
  }
  @Delete(':idCarrousel')
  async deleteCarrousel(@Param('idCarrousel') idCarrousel: string) {
    return await this.carrouselService.deleteCarrousel(idCarrousel);
  }
}
