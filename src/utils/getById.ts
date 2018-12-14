import { Document, Model } from 'mongoose';

export async function getById<T extends Document>(id: string, model: Model<T>): Promise<T> {
  return await model.findById(id).lean();
}