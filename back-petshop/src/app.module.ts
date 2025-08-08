import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/supabase';
import { AuthModule } from './Modulos/Auth/auth.module';
import { ProductModule } from './Modulos/Products/products.module';
import { CartModule } from './Modulos/Cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    ProductModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
