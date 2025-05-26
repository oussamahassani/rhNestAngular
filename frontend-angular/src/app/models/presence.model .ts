import { User } from "./user.model";

export interface Presence {
  _id: string;
  code: string;          
  date: string;
  heureArrive: string;
  heureDepart?: string;
   status?: string;
  user: string | User; // <- soit juste l'ID, soit l'objet complet
}

export type NewPresence = Omit<Presence, '_id'>;