import { Model } from 'mongoose';
import { User } from 'users/users.interface';

import { Curs } from './curses.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getById } from 'utils/getById';
import { create } from 'utils/create';
import { updateById } from 'utils/update';
import { deleteById } from 'utils/delete';
import { List } from 'interfaces/list';
import { QueryRequest } from 'interfaces/queries';
import { getList } from 'utils/getList';

export class CursesService {
  constructor(
    @InjectModel('Curses') private readonly model: Model<Curs<string | User>>,
    @InjectModel('Users') private readonly userModel: Model<User>,
  ) { }

  public async getOne(id: string): Promise<Curs<User>> {
    const result = await getById(id, this.model);
    return this.transformToUser(result);
  }

  public async getMany(query: QueryRequest): Promise<List<Curs<User>>> {
    const data = await getList(query, this.model);
    const promises = data.items.map(curs => this.transformToUser(curs));
    const items = await Promise.all(promises);
    return {
      ...data,
      items,
    };
  }

  public async create(curs: Readonly<Curs<string | User>>): Promise<Curs<User>> {
    const result = await create(await this.transformToDB(curs), this.model);
    return await this.transformToUser(result);
  }

  public async update(id: string, curs: Readonly<Curs<string | User>>): Promise<Curs<User>> {
    const result = await updateById(id, await this.transformToDB(curs), this.model);
    return await this.transformToUser(result);
  }

  public async delete(id: string): Promise<Curs<User>> {
    const result = await deleteById(id, this.model);
    return await this.transformToUser(result);
  }

  private async transformToUser(curs: Curs<string | User>): Promise<Curs<User>> {
    if (typeof curs.author === typeof {}) {
      return curs as Curs<User>;
    }

    return {
      ...curs,
      author: await getById(curs.author as string, this.userModel),
    } as Curs<User>;
  }

  private async transformToDB(curs: Curs<string | User>): Promise<Curs<string>> {
    if (typeof curs.author === typeof '') {
      return curs as Curs<string>;
    }

    return {
      ...curs,
      author: (curs as Curs<User>).author._id,
    } as Curs<string>;
  }
}
