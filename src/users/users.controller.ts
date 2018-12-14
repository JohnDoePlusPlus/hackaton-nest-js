import { Body, Controller, Post, Get, Query, Param, Put, Delete } from '@nestjs/common';

import { User } from './users.interface';
import { UsersService } from './users.service';
import { QueryRequest } from 'interfaces/queries';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  public async getList(@Query() query: QueryRequest) {
    return await this.usersService.getMany(query);
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getOne(id);
  }

  @Post()
  public async post(@Body() user: Readonly<User>): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() user: Readonly<User>,
  ): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
