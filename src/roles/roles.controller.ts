import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { List } from 'interfaces/list';

import { Credentials } from '../interfaces/credentials';
import { QueryRequest } from '../interfaces/queries';
import { RolesService } from './roles.service';
import { Role } from './roles.interface';
import { Filter } from 'interfaces/filter';
import { User } from 'users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) { }

  @Get()
  public async getList(@Query() query: QueryRequest): Promise<List<Role>> {
    return await this.rolesService.getMany(query);
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<Role> {
    return await this.rolesService.getOne(id);
  }

  @Post()
  public async create(@Body() body: Readonly<Role>): Promise<Role> {
    return await this.rolesService.create(body);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: Readonly<Role>,
  ): Promise<Role> {
    return await this.rolesService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Role> {
    return await this.rolesService.delete(id);
  }

  @Put('/search')
  public async filter(@Body() filters: Filter<Role>): Promise<Role[]> {
    return await this.rolesService.filter(filters);
  }
}
