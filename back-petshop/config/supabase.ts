import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.SUPABASE_HOST,
  port: Number(process.env.SUPABASE_PORT),
  username: process.env.SUPABASE_USERNAME,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
  entities: ['dist/**/*.entity{.js,.ts}'],
  ssl: {
    rejectUnauthorized: false,
  },
};
