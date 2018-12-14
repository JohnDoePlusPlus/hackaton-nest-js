import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  type: String,
  permissions: Object,
});
