import { Document } from 'mongoose';

export interface Curs<T> extends Document {
  name: string;
  author: T;
  domain: string;
  speciality: string;
  credits: number;
  description: string;
  clicksCount: number;
  image: string;
}
