import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Feature } from '../modules/feature/feature.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'caminho_dos_ventos',
  entities: [User, Feature],
  synchronize: true,
});