import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List } from '../interfaces/list';
import { QueryRequest } from '../interfaces/queries';
import { create } from '../utils/create';
import { deleteById } from '../utils/delete';
import { getById } from '../utils/getById';
import { getList } from '../utils/getList';
import { updateById } from '../utils/update';
import { Role } from './roles.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel('Roles') private readonly model: Model<Role>,
  ) { }

  public async getOne(id: string): Promise<Role> {
    return await getById(id, this.model);
  }

  public async getMany(query: QueryRequest): Promise<List<Role>> {
    return await getList(query, this.model);
  }

  public async create(role: Readonly<Role>): Promise<Role> {
    return await create(role, this.model);
  }

  public async update(id: string, role: Readonly<Role>): Promise<Role> {
    return await updateById(id, role, this.model);
  }

  public async delete(id: string): Promise<Role> {
    return await deleteById(id, this.model);
  }
}
