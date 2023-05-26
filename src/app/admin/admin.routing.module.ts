import { ProfileComponent } from './profile/profile.component';
import { AdminAuthGuard } from './authentication/adminAuth.guard';
import { LoginComponent } from './../admin/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: DashboardComponent,
        canActivate: [AdminAuthGuard],
        data: { expectedRole: 'admin' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'userdetails',
        component: UserDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
