import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/views/login/login.component';
import { RegisterComponent } from './user/views/register/register.component';
import { PublicNotesPageComponent } from './notes/views/public-notes-page/public-notes-page.component';
import { MyNotesPageComponent } from './notes/views/my-notes-page/my-notes-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginRegisterGuard } from './auth/guards/login-register.guard';
import { ProfileComponent } from './user/views/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard] },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard/notes', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'notes', component: MyNotesPageComponent, canActivate: [AuthGuard] },
      { path: 'notes/public', component: PublicNotesPageComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
