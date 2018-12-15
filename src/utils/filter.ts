import { Curs } from 'curses/curses.interface';
import { Filter } from 'interfaces/filter';
import { Document, Model } from 'mongoose';
import { User } from 'users/users.interface';

export async function getListWithFilter<T extends Document>(
  filters: Filter<T>,
  model: Model<T>,
  coursesModel?: Model<Curs<string>>,
): Promise<T[]> {
  const courses = coursesModel ? await coursesModel.find().lean() : null;
  return await model
    .find()
    .lean()
    .then((items: T[]) => courses ? filterUsersByCourses(items, courses, filters) : items)
    .then(items => items.filter(item => checkItemsFilter(item, filters)));
}

function checkItemsFilter<T extends Document>(item: T, filters: Filter<T>): boolean {
  return Object.keys(filters).every(key => checkItem(item, key as any, filters[key]));
}

function checkItem<T extends Document>(
  item: T,
  key: keyof T,
  filter: T[keyof T][],
): boolean {
  return filter.some(value => item[key] === value);
}

function filterUsersByCourses<T>(
  items: T[],
  courses: Curs<string>[],
  filters: Filter<T>,
): T[] {
  const value = (filters as any as User).courses as any as number;
  return items.filter(item => filterUserByCourses(item as any, courses, value));
}

function filterUserByCourses(
  item: User,
  courses: Curs<string>[],
  value: number,
): boolean {
  const itemCourses = courses.filter(curs => item.courses.some(_id => _id === curs._id));
  return itemCourses.reduce((prev, curent) => prev + curent.credits, 0) >= value;
}
