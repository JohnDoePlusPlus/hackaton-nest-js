import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesController } from './roles.controller';
import { RoleSchema } from './roles.schema';
import { RolesService } from './roles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Roles', schema: RoleSchema }])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}