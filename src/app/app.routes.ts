import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApiDataComponent } from './pages/api-data/api-data.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'api', component: ApiDataComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: '' }
];
