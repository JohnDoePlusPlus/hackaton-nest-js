import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { CursesModule } from 'curses/curses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    CursesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }