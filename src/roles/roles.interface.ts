import { Document } from 'mongoose';

export interface Role extends Document {
  name: string;
  permissions: Permission[];
}

export interface Permission {
  key: string;
  value: boolean;
}
