
import { Routes } from '@angular/router';
import { AutomotoresListComponent } from '../features/automotores/automotores-list/automotores-list.component';
import { AutomotoresFormComponent } from './../features/automotores/automotores-form/automotores-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'automotores',
    pathMatch: 'full'
  },
  {
    path: 'automotores',
    component: AutomotoresListComponent
  },
  {
    path: 'automotores/crear',
    component: AutomotoresFormComponent
  },
  {
    path: 'automotores/editar/:domain',
    component: AutomotoresFormComponent
  }
];
