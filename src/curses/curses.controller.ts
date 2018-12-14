import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { List } from 'interfaces/list';
import { QueryRequest } from 'interfaces/queries';
import { User } from 'users/users.interface';

import { Curs } from './curses.interface';
import { CursesService } from './curses.service';

@Controller('curses')
export class CursesController {
  constructor(
    private readonly cursesService: CursesService,
  ) { }

  @Get()
  public async getList(@Query() query: QueryRequest): Promise<List<Curs<User>>> {
    return await this.cursesService.getMany(query);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<Curs<User>> {
    return await this.cursesService.getOne(id);
  }

  @Post()
  public async create(@Body() body: Readonly<Curs<string | User>>): Promise<Curs<User>> {
    return await this.cursesService.create(body);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: Readonly<Curs<string | User>>,
  ): Promise<Curs<User>> {
    return await this.cursesService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Curs<User>> {
    return await this.cursesService.delete(id);
  }
}
