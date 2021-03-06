import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { NotifierModule } from 'angular-notifier';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [NoteComponent, NoteFormComponent, SidebarComponent, ModalComponent, UserFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NotifierModule,
  ], exports: [NoteComponent, NoteFormComponent, SidebarComponent, ModalComponent, UserFormComponent]
})
export class UiModule { }
