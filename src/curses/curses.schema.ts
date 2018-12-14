import * as mongoose from 'mongoose';

export const CursesSchema = new mongoose.Schema({
  name: String,
  author: String,
  domain: String,
  speciality: String,
  credits: Number,
});
