import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes: Routes = [{ path: '', component: HomeComponent},
{ path: 'new-user', component: NewuserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
