import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user', component: UserComponent},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}