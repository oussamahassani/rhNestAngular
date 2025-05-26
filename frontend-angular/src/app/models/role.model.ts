export interface Role {
    _id: string;
    name: string;
  }
  
  export type NewRole = Omit<Role, '_id'>;
  