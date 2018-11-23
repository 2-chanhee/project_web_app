import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent} from './user/sign-in/sign-in.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './view/view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WriteComponent } from './write/write.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    
        {path: '', component: WelcomeComponent},
        {path: 'signup', component: SignUpComponent},
        {path: 'admin', component: AdminComponent},
        {path: 'signin', component: SignInComponent},
        {path: 'view', component: ViewComponent},
        {path: 'userprofile', component:  UserProfileComponent, canActivate:[AuthGuard]},
        {path: 'write', component: WriteComponent,canActivate:[AuthGuard]},
        {path: 'employee', component: EmployeeComponent}
        
        ];
      