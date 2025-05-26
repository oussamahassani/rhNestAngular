export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Settings',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'users',
        title: 'Utilisateurs',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'show-user',
            title: 'Liste',
            type: 'item',
            url: '/users/show'
          },
          {
            id: 'add-user',
            title: 'Ajouter utilisateur',
            type: 'item',
            url: '/users/add'
          }
        ]
      },
      {
        id: 'roles',
        title: 'Rôles',
        type: 'collapse',
        icon: 'feather icon-shield',
        children: [
          {
            id: 'show-role',
            title: 'Liste',
            type: 'item',
            url: '/roles/show'
          },
          {
            id: 'add-role',
            title: 'Ajouter rôle',
            type: 'item',
            url: '/roles/add'
          }
        ]
      },
      {
        id: 'interns',
        title: 'Stagiaires',
        type: 'collapse',
        icon: 'feather icon-user-check',
        children: [
          {
            id: 'show-intern',
            title: 'Liste',
            type: 'item',
            url: '/stagaires/show'
          },
          {
            id: 'add-intern',
            title: 'Ajouter stagiaire',
            type: 'item',
            url: '/stagaires/add'
          }
        ]
      },

      {
        id: 'job-requests',
        title: 'Demandes de Postes',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'show-job-request',
            title: 'Liste',
            type: 'item',
            url: '/demandes/show'
          },
        /*   {
            id: 'add-job-request',
            title: 'Ajouter demande',
            type: 'item',
            url: '/demandes/add'
          } */
        ]
      },

      {
        id: 'documents',
        title: 'Documents',
        type: 'collapse',
        icon: 'feather icon-folder',
        children: [
          {
            id: 'show-documents',
            title: 'Attestation de Travail',
            type: 'item',
            url: '/documents/show'
          },
          {
            id: 'show-documents',
            title: 'Attestation de Stage',
            type: 'item',
            url: '/documents/show'
          },
          {
            id: 'add-document',
            title: 'Fiche de paie',
            type: 'item',
            url: '/documents/add'
          }
        ]
      },
      {
        id: 'presences',
        title: 'Présences',
        type: 'collapse',
        icon: 'feather icon-calendar',
        children: [
          {
            id: 'show-attendance',
            title: 'Liste',
            type: 'item',
            url: '/presences/show'
          },
          {
            id: 'add-attendance',
            title: 'Ajouter présence',
            type: 'item',
            url: '/presences/add'
          }
        ]
      },

     

    ]
  }

  
];

