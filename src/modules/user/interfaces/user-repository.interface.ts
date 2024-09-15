import { User } from '@prisma/client';
import { CreateUserModel } from '../models/create-user.model';
import { UpdateUserModel } from '../models/update-user.model';

export interface UserRepository {
  find(studioId: string): Promise<User[]>;
  findById(id: string,studioId: string,): Promise<User | null>;
  create(user: CreateUserModel): Promise<void>;
  update(user: UpdateUserModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}
