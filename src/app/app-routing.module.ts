import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: NewuserComponent },
  { path: 'share/:id', component: ShareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
