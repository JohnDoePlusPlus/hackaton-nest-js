import { Model, Document } from 'mongoose';

export async function getLimitFromModel<T extends Document>(model: Model<T>): Promise<number> {
  return await model.count({}).lean();
}
