//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule }    from '@angular/http';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { SignUpComponent } from './user/sign-up/sign-up.component';
//router
import { appRoutes} from './routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import { BarComponent } from './bar/bar.component';
import { WriteComponent } from './write/write.component';
import { TestComponent } from './test/test.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UsereditComponent } from './useredit/useredit.component';
import { PostSearchComponent } from './post-search/post-search.component'; 




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    WelcomeComponent,
    AdminComponent,
    SignInComponent,
    SignInComponent,
    UserProfileComponent,
    BarComponent,
    WriteComponent,
    TestComponent,
    ViewComponent,
    EditComponent,
    UsereditComponent,
    PostSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
