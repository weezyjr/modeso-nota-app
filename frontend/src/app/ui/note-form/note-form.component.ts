import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/notes/note.service';
import { Note } from 'src/app/models/Note';
import { NotifierService } from 'angular-notifier';
import { ResponseObject } from 'src/app/models/Response';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  @Input() public note: Note = new Note();

  // to notify parent components that the form is submitted
  @Output() done = new EventEmitter<boolean>();

  // TODO: create a loading spinner
  public uploadingState = false;

  constructor(private noteService: NoteService, private notifierService: NotifierService) {

  }

  ngOnInit() {
  }

  // Share note (Share and create) or (share and update)
  async share() {
    // if the note already exist
    if (this.note.id) {
      this.note.public = true;
      await this.updateNote();
    } else {
      // the note is not created yet
      this.note.public = true;
      await this.createNote();
      // clear after create
      this.clearNote();
    }
    this.done.emit(true);
  }

  // Unshare public notes
  unshare() {
    if (this.note.id) {
      this.note.public = false;
      this.updateNote();
    }
  }

  // save current note
  async save() {
    if (this.note.id) {
      // if the note already exist
      await this.updateNote();
    } else {
      // the note is not created yet
      await this.createNote();
      // clear note after save
      this.clearNote();
    }
    this.done.emit(true);
  }

  close() {
    this.done.emit(true);
  }


  remove() {
    if (this.note.id) {
      // delete the note from the db
      this.deleteNote();
    } else {
      // just clear the feilds
      this.clearNote();
    }
    this.done.emit(true);
  }

  // replace current note with an empty one
  clearNote() {
    this.note = new Note();
  }

  // delete a note in the db
  async deleteNote() {
    await this.noteService.deleteNote(this.note).subscribe((msg) => {
      this.notifierService.notify('success', msg);
    });
  }

  // update a note in the db
  async updateNote() {
    await this.noteService.updateNote(this.note).subscribe((msg) => {
      this.notifierService.notify('success', msg);
    });
  }

  // create a note in the db
  async createNote() {
    await this.noteService.createNote(this.note).subscribe((msg) => {
      this.notifierService.notify('success', msg);
    });
  }

  // upload image (event { target ... } used just for the linter)
  async uploadImage(event: { target: { files: FileList; }; }) {

    // show loading spinner
    this.uploadingState = true;

    // get the file list
    const fileList: FileList = event.target.files;
    // if there is a file
    if (fileList.length > 0) {
      // store the fiel in imageFile
      const imageFile: File = fileList[0];
      // upload the file
      await this.noteService.uploadImage(imageFile)
        .subscribe((src) => {
          this.note.image = src;
        });
    }
    // hide the loading spinner
    this.uploadingState = false;
  }

}
