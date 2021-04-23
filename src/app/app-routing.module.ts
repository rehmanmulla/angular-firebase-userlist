import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: '', component:RegisterFormComponent
  },
  {
    path: 'register', component:RegisterFormComponent
  },
  {
    path: 'dashboard', component:DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
