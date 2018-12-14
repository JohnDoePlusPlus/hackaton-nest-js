import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';

import { CursesController } from './curses.controller';
import { CursesSchema } from './curses.schema';
import { CursesService } from './curses.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Curses', schema: CursesSchema }]),
    UsersModule,
  ],
  controllers: [CursesController],
  providers: [CursesService],
})
export class CursesModule { }