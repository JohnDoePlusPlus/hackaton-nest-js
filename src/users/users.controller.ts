import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { List } from 'interfaces/list';

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
  public async getList(@Query() query: QueryRequest): Promise<List<User>> {
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
    const data = await this.usersService.create(user);
    this.removePasswordFromUser(data);
    return data;
  }

  @Post('/login')
  public async login(@Body() credentials: Readonly<Credentials>): Promise<boolean> {
    return await this.usersService.logIn(credentials);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() user: Readonly<User>,
  ): Promise<User> {
    const data = await this.usersService.update(id, user);
    this.removePasswordFromUser(data);
    return data;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<User> {
    const data = await this.usersService.remove(id);
    this.removePasswordFromUser(data);
    return data;
  }

  private removePasswordsFromUsers(users: User[]): void {
    users.forEach(user => this.removePasswordFromUser(user));
  }

  private removePasswordFromUser(user: User): void {
    delete user.password;
    delete user.isEmailEnabled;
  }
}
