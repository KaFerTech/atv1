import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Produtos } from './models/Produtos';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: '1234', 
      database: 'atv1',
      models: [Produtos],
    }),
    SequelizeModule.forFeature([Produtos]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}