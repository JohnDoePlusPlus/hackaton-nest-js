import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';

import { Credentials } from '../interfaces/credentials';
import { QueryRequest } from '../interfaces/queries';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  public async getList(@Query() query: QueryRequest) {
    const data = await this.usersService.getMany(query);
    this.removePasswordsFromUsers(data.items);
    return data;
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<User> {
    const data = await this.usersService.getOne(id);
    this.removePasswordFromUser(data);
    return data;
  }

  @Post()
  public async post(@Body() user: Readonly<User>): Promise<User> {
    return await this.usersService.create(user);
  }

  @Post()
  public async register(@Body() credentials: Readonly<Credentials>): Promise<boolean> {
    return await this.usersService.logIn(credentials);
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

  private removePasswordsFromUsers(users: User[]): void {
    users.forEach(user => this.removePasswordFromUser(user));
  }

  private removePasswordFromUser(user: User): void {
    delete user.password;
  }
}
