import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { NotifierService } from 'angular-notifier';
import { NoteService } from '../../note.service';

@Component({
  selector: 'app-public-notes-page',
  templateUrl: './public-notes-page.component.html',
  styleUrls: ['./public-notes-page.component.scss']
})
export class PublicNotesPageComponent implements OnInit {


  // all the public notes of all users
  notes: Note[];

  // current showcased note
  currentNote: Note;

  // to indicate if the modal is opened
  modalOpened = false;

  closeModal() {
    this.modalOpened = false;
  }

  openModal(note: Note) {
    if (note && note.id) {
      // store the current Note
      this.currentNote = Object.assign({}, note);
    }
    this.modalOpened = true;
  }

  constructor(
    private noteService: NoteService,
    private notifierService: NotifierService) { }

  // get all the public notes of all users
  getNotes() {
    this.noteService.getNotes(true).subscribe((notes) => {
      this.notes = notes;
    });
  }

  ngOnInit() {
    this.getNotes();
  }
}
