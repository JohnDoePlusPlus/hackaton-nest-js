import { Document, Model } from 'mongoose';

export async function deleteById<T extends Document>(id: string, model: Model<T>): Promise<T> {
  return await model.findByIdAndRemove(id).lean();
}
