import { Document, Model } from 'mongoose';

export async function create<T extends Document>(data: T, model: Model<T>): Promise<T> {
  const response = new model(data);
  return await response.save();
}