import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/transactions.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sbadmin',
      password: 'mypassword',
      database: 'smartbudget',
      entities: [Transaction, User],
      autoLoadEntities: true,
      synchronize: true, // W DEV pozwala automatycznie tworzyć tabele, ale w produkcji lepiej używać migracji!
      logging: true,
    };
  }
}
