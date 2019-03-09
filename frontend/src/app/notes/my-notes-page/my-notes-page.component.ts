import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { NotifierService } from 'angular-notifier';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-my-notes-page',
  templateUrl: './my-notes-page.component.html',
  styleUrls: ['./my-notes-page.component.scss']
})
export class MyNotesPageComponent implements OnInit {

  myNotes: Note[];

  constructor(private noteService: NoteService, private notifierService: NotifierService) { }

  ngOnInit() {
    this.noteService.getMyNotes();
  }

}
