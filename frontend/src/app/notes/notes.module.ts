import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NotifierModule } from 'angular-notifier';
import { UiModule } from '../ui/ui.module';
import { MyNotesPageComponent } from './views/my-notes-page/my-notes-page.component';
import { PublicNotesPageComponent } from './views/public-notes-page/public-notes-page.component';

@NgModule({
  declarations: [MyNotesPageComponent, PublicNotesPageComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    UiModule,
    // Notification module configuration
    NotifierModule.withConfig({
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
    })
  ], exports: [MyNotesPageComponent]
})
export class NotesModule { }
