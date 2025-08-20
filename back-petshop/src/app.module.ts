import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/supabase/supabase';
import { AuthModule } from './Modulos/Auth/auth.module';
import { ProductModule } from './Modulos/Products/products.module';
import { CartModule } from './Modulos/Cart/cart.module';
import { CarrouselModule } from './Modulos/Carrousel/carrousel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    ProductModule,
    CartModule,
    CarrouselModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
