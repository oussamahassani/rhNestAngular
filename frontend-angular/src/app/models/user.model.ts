import { Role } from "./role.model";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  poste?: string;
  date?: string;
}

export type NewUser = Omit<User, '_id'>;
