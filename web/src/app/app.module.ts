//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//router
import { appRoutes} from './routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './view/view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WriteComponent } from './write/write.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor'; 




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    WelcomeComponent,
    AdminComponent,
    ViewComponent,
    WriteComponent,
    SignInComponent,
    SignInComponent,
    UserProfileComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
