import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Credentials } from '../interfaces/credentials';
import { List } from '../interfaces/list';
import { QueryRequest } from '../interfaces/queries';
import { create } from '../utils/create';
import { deleteById } from '../utils/delete';
import { getById } from '../utils/getById';
import { getList } from '../utils/getList';
import { updateById } from '../utils/update';
import { User } from './users.interface';
import { getListWithFilter } from 'utils/filter';
import { Filter } from 'interfaces/filter';
import { Curs } from 'curses/curses.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly model: Model<User>,
    @InjectModel('Curses') private readonly cursModel: Model<Curs<string>>,
  ) { }

  public async create(user: Readonly<User>): Promise<User> {
    return await create(user, this.model);
  }

  public async getOne(id: string): Promise<User> {
    return await getById(id, this.model);
  }

  public async getMany(query: QueryRequest): Promise<List<User>> {
    return await getList(query, this.model);
  }

  public async update(id: string, data: Readonly<User>): Promise<User> {
    return await updateById(id, data, this.model);
  }

  public async remove(id: string): Promise<User> {
    return await deleteById(id, this.model);
  }

  public async addCourse(id: string, course: string): Promise<User> {
    const item = await this.getOne(id);
    return await this.update(id, { ...item, courses: [...item.courses, course] } as User);
  }

  public async logIn(credentials: Readonly<Credentials>): Promise<boolean> {
    const model = await this.model.findOne({ email: credentials.email }).lean();
    return model.password === credentials.password;
  }

  public async filter(filters: Filter<User>): Promise<User[]> {
    return await getListWithFilter(filters, this.model, this.cursModel);
  }
}
