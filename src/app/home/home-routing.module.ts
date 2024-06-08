import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '**', redirectTo: '/users' },
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
