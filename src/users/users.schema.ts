import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  isEmailActivated: Boolean,
  registerDate: Date,
  role: String,
});
