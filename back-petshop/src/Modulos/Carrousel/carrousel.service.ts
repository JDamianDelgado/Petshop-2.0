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
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse } from './interfaceCarrousel';

@Injectable()
export class CarrouselService {
  constructor(
    @InjectRepository(Carrousel)
    private readonly carrouselRepository: Repository<Carrousel>,
    @Inject('CLOUDINARY') private cloudinaryClient: typeof cloudinary,
  ) {}

  //crear
  async createCarrousel(
    fileBuffer: Buffer,
    titulo: string,
    descripcion: string,
  ) {
    const uploadResult: CloudinaryUploadResponse = await new Promise<any>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'carrousel' },
          (error, result) => {
            if (error)
              return reject(new Error(error.message || JSON.stringify(error)));
            resolve(result);
          },
        );
        stream.end(fileBuffer);
      },
    );
    const carrousel = this.carrouselRepository.create({
      titulo,
      descripcion,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return this.carrouselRepository.save(carrousel);
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
  //todas las iamgenes
  async allImages() {
    return this.carrouselRepository.find();
  }
}
