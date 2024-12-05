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
      {path: 'monitoring', loadComponent: () => import('./routes/admin/monitoring-view-component/monitoring-view-component.component').then(m => m.MonitoringViewComponent)},
      {path: 'monitoring/1', loadComponent: () => import('./routes/admin/monitoring-view-component/1/monitoring-view-1-medical-examination.component').then(m => m.MonitoringViewMedicalExaminationComponent)},
      // {path: 'home', loadComponent: () => import('./routes/admin/home-view-component/home-view-component.component').then(m => m.AdminHomeViewComponentComponent)},
    ],
  },
  {
    path: 'user',
    component: ClientSidebarComponent,
    children: [
      { path: 'home', loadComponent: () => import('./routes/user/home-view-component/home-view-component.component').then(m => m.HomeViewComponentComponent) },
    ],
  },
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'invalid' },
];
