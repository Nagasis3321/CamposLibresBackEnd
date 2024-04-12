import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalesModule } from './animales/animales.module';
import { VacunacionesModule } from './vacunaciones/vacunaciones.module';
import { DuenosModule } from './duenos/duenos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI_2, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
    AnimalesModule,
    VacunacionesModule,
    DuenosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
