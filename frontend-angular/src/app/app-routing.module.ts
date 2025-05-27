// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      //user
      {
        path: 'users/add',
        loadComponent: () => import('./demo/pages/Users/add-user/add-user.component')
      },
      {
        path: 'users/edit/:id',
        loadComponent: () => import('./demo/pages/Users/user-update/user-update.component').then((m) => m.UserUpdateComponent)
      },
      {
        path: 'users/show',
        loadComponent: () => import('./demo/pages/Users/show-user/show-user.component')
      },
     //role
      {
      path: 'roles/add',
      loadComponent: () => import('./demo/pages/Roles/add-role/add-role.component')
    },
      {
      path: 'roles/edit/:id',
      loadComponent: () => import('./demo/pages/Roles/role-update/role-update.component').then((m) => m.RoleUpdateComponent)
    },
    {
      path: 'roles/show',
      loadComponent: () => import('./demo/pages/Roles/show-role/show-role.component')
    }, 
    
    //stagiaire
    {
      path: 'stagaires/add',
      loadComponent: () => import('./demo/pages/Stagaires/add-stagaire/add-stagaire.component')
    },
    /* {
      path: 'stagaires/edit/:id',
      loadComponent: () => import('./demo/pages/Stagaires/stagaire-update/stagaire-update.component').then((m) => m.StagaireUpdateComponent)
    }, */
    {
      path: 'stagaires/show',
      loadComponent: () => import('./demo/pages/Stagaires/show-stagaire/show-stagaire.component')
    },
    //                                            
 //demande
/*  {
  path: 'demandes/add',
  loadComponent: () => import('./demo/pages/Demandes/add-demande/add-demande.component')
}, */
/* {
  path: 'stagaires/edit/:id', 
  loadComponent: () =>
    import('./demo/pages/Stagaires/stagaire-update/stagaire-update.component')
      .then(m => m.StagaireUpdateComponent),
}, */


 // Presence
      {
        path: 'presences/add',
        loadComponent: () => import('./demo/pages/Presences/add-presence/add-presence.component').then(m => m.PresenceAddComponent   )
      },
      {
        path: 'presences/show',
        loadComponent: () => import('./demo/pages/Presences/show-presence/show-presence.component').then(m => m.ShowPresenceComponent)
      }, 

{
  path: 'demandes/show',
  loadComponent: () => import('./demo/pages/Demandes/show-demande/show-demande.component')
},    

      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component')
      },
        {
        path: 'auth/forgetPass',
        loadComponent: () => import('./demo/pages/authentication/Forget-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
