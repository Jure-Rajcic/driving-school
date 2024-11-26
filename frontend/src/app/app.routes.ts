import { Routes } from '@angular/router';
import { ClientSidebarComponent } from './layouts/client-sidebar-component';
import { AdminSidebarComponent } from './layouts/admin-sidebar-component';


export const appRoutes: Routes = [
  {
    path: 'login',
    component: ClientSidebarComponent, // TODO change to login component
  },
  {
    path: 'invalid',
    component: ClientSidebarComponent, // TODO change to error component
  },
  {
    path: 'admin',
    component: AdminSidebarComponent,
    children: [
      { path: 'home', loadComponent: () => import('./routes/dummy-view-component/dummy-view-component.component').then(m => m.DummyViewComponentComponent)  },
    ],
  },
  {
    path: 'user',
    component: ClientSidebarComponent,
    children: [
      { path: 'home', loadComponent: () => import('./routes/home-view-component/home-view-component.component').then(m => m.HomeViewComponentComponent) },
    ],
  },
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'invalid' },
];
