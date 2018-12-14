import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursesModule } from 'curses/curses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsersModule,
    CursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
