import { Document, Model } from 'mongoose';

export async function updateById<T extends Document>(
  id: string,
  data: T,
  model: Model<T>,
): Promise<T> {
  return await model.findByIdAndUpdate(id, data);
}