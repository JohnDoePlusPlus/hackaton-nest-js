import { InjectModel } from '@nestjs/mongoose';
import { Filter } from 'interfaces/filter';
import { List } from 'interfaces/list';
import { QueryRequest } from 'interfaces/queries';
import { Model } from 'mongoose';
import { User } from 'users/users.interface';
import { create } from 'utils/create';
import { deleteById } from 'utils/delete';
import { getListWithFilter } from 'utils/filter';
import { getById } from 'utils/getById';
import { getList } from 'utils/getList';
import { updateById } from 'utils/update';

import { Curs } from './curses.interface';

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

  public async filter(filters: Filter<Curs<string>>): Promise<Curs<User>[]> {
    const result = await getListWithFilter(filters, this.model);
    const promises = result.map(curs => this.transformToUser(curs));
    const items = await Promise.all(promises);
    return items;
  }

  public async getPopular(limit: number): Promise<Curs<User>[]> {
    return await this.model
      .find()
      .sort({ $clicksCount: 1 })
      .limit(limit)
      .lean();
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
