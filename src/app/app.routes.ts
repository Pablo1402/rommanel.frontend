import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './guards/auth.guard';
import { ClientEditComponent } from './views/clients/client-edit/client-edit.component';
import { ClientListComponent } from './views/clients/client-list/client-list.component';
import { ClientNewComponent } from './views/clients/client-new/client-new.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AuthGuard] 
      }
     ,
      {
        path:'client/list',
        component: ClientListComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'client/new',
        component: ClientNewComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'client/edit/:id',
        component: ClientEditComponent,
        canActivate:[AuthGuard]
      }

    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  
  
  
  { path: '**', redirectTo: 'dashboard' }
];

