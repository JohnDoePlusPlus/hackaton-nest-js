import { defaultLimit, defaultPage } from 'constants/defaults';
import { List } from 'interfaces/list';
import { QueryRequest } from 'interfaces/queries';
import { Document, Model } from 'mongoose';

import { getLimitFromModel } from './getLimitFromModel';
import { strToInt } from './utils';

export async function getList<T extends Document>(
  { limit: qLimit, page }: QueryRequest,
  model: Model<T>,
): Promise<List<T>> {
  const limit = strToInt(qLimit) || defaultLimit;
  const skip = ((strToInt(page) || defaultPage) - 1) * limit;
  const items = await model
    .find()
    .skip(skip)
    .limit(limit)
    .lean();
  const limitResponse = await getLimitFromModel(model);
  return { items, limit: limitResponse };
}