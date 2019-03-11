import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/views/login/login.component';
import { RegisterComponent } from './user/views/register/register.component';
import { PublicNotesPageComponent } from './notes/views/public-notes-page/public-notes-page.component';
import { MyNotesPageComponent } from './notes/views/my-notes-page/my-notes-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', component: MyNotesPageComponent },
      { path: 'notes', component: MyNotesPageComponent },
      { path: 'notes/public', component: PublicNotesPageComponent }
    ]
  },
  { path: 'notes', component: MyNotesPageComponent },
  { path: 'notes/public', component: PublicNotesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
