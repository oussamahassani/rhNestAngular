export interface Demande {
  _id: string;
  code: string;
  nom: string;
  poste: string;
  status: 'en attente' | 'accepté' | 'refusé'; // <- Type strict ici
}
    export type NewDemande = Omit<Demande, '_id'>;
  