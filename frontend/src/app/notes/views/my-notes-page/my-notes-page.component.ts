import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Note } from 'src/app/models/Note';
import { NoteService } from '../../note.service';

@Component({
  selector: 'app-my-notes-page',
  templateUrl: './my-notes-page.component.html',
  styleUrls: ['./my-notes-page.component.scss']
})
export class MyNotesPageComponent implements OnInit {

  // all the user notes
  myNotes: Note[];

  // current opened note
  currentNote: Note;

  // flag to indicate if the modal is opened
  modalOpened = false;

  closeModal() {
    this.modalOpened = false;

    // update notes list
    this.getNotes();
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

  // get the notes and store it in my notes
  getNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.myNotes = notes;
    });
  }

  ngOnInit() {
    // get the notes on init
    this.getNotes();
  }

}
