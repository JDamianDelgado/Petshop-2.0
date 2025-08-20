import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarrouselService } from './carrousel.service';
// import { JwtAuthGuard } from 'src/Modulos/Auth/Guard/JWT/jwt-auth.guards';

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
    console.log(titulo, descripcion);
    return await this.carrouselService.createCarrousel(
      file.buffer,
      titulo,
      descripcion,
    );
  }
  @Delete(':idCarrousel')
  async deleteCarrousel(@Param('idCarrousel') idCarrousel: string) {
    return await this.carrouselService.deleteCarrousel(idCarrousel);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async allImages() {
    return await this.carrouselService.allImages();
  }
}
