import { Routes } from '@angular/router';
import { HomeViewComponentComponent } from './routes/home-view-component/home-view-component.component';
import { DummyViewComponentComponent } from './routes/dummy-view-component/dummy-view-component.component';
import SidebarComponent from './sidebar-component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeViewComponentComponent },
  { path: 'dummy', component: DummyViewComponentComponent},
  { path: 'test', component: SidebarComponent },
];
