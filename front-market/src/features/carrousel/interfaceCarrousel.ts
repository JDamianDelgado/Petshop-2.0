export interface carrouselItems {
  idCarrousel: string;
  titulo: string;
  descripcion: string;
  imageUrl: string;
  publicId: string;
  activo: boolean;
}

export interface initialStateCarrousel {
  item: carrouselItems[];
  error: string | null;
  loading: boolean;
  success: boolean;
}
