/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrousel } from 'src/Entities/Carrousel.entity';
import { Repository } from 'typeorm';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CarrouselService {
  constructor(
    @InjectRepository(Carrousel)
    private readonly carrouselRepository: Repository<Carrousel>,
    @Inject('CLOUDINARY') private cloudinaryClient: typeof cloudinary,
  ) {}

  //crear
  async createCarrousel(
    file: Express.Multer.File,
    titulo: string,
    descripcion: string,
  ) {
    if (!file || !titulo) throw new BadRequestException('Faltan datos');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!file.path) {
      throw new BadRequestException('Archivo sin ruta (no es diskStorage)');
    }

    const uploadResult: UploadApiResponse =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      await this.cloudinaryClient.uploader.upload(file.path, {
        folder: 'carrousel',
        resource_type: 'image',
      });

    if (!uploadResult.secure_url)
      throw new BadRequestException('Error al subir la imagen');

    const newCarrousel = this.carrouselRepository.create({
      titulo,
      descripcion,

      imageUrl: uploadResult.secure_url,
      activo: true,
      publicId: uploadResult.public_id,
    });
    return await this.carrouselRepository.save(newCarrousel);
  }

  //eiminar
  async deleteCarrousel(idCarrousel: string) {
    const findCarrousel = await this.carrouselRepository.findOne({
      where: { idCarrousel },
    });
    if (!findCarrousel)
      throw new NotFoundException('No se encontró el carrusel');

    const deleteCloudinary = await this.cloudinaryClient.uploader.destroy(
      findCarrousel.publicId,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (deleteCloudinary.result !== 'ok') {
      throw new BadRequestException(
        'Hubo un problema al eliminar la imagen en Cloudinary',
      );
    }

    await this.carrouselRepository.delete(idCarrousel);
    return { message: 'Eliminado correctamente' };
  }
}
