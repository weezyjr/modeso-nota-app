import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    UiModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    // Notification module configuration
    NotifierModule.withConfig( {
      // Custom options in here
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
    } )
  ],
})
export class UserModule { }
