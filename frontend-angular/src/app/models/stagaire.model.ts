export interface Stagaire {
       _id: string;
        nom: string;
        prenom: string;
        tel: string;
        adresse: string;
        date: string;
        supervise: string;
        objectif: string;
  }
  
  export type NewStagaire = Omit<Stagaire, '_id'>;
  