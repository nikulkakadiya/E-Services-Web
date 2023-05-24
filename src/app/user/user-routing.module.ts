import { LoginComponent } from '../user/login/login.component';
import { AboutComponent } from '../user/about/about.component';
import { HomeComponent } from '../user/home/home.component';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from '../user/registration/registration.component';
import { ServicesComponent } from './services/services.component';
import { AuthGuard } from '../allServices/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'customer' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'crud',
        loadChildren: () =>
          import('../user/crud/crud.module').then((m) => m.CrudModule),
        canActivate: [AuthGuard],
        data: { expectedRole: 'customer' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
