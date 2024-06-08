import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';

const routes: Routes = [

  {
    path: 'auth',

    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
  },
  {
    path: '**',
    redirectTo: 'auth'
  },


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
