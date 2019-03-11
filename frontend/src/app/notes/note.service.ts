import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseObject } from '../models/Response';
import { RequestObject } from '../models/Request';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Note } from '../models/Note';

// retrive the environment variable `api host` which stands for the backend url
const apiHost = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // endpoints
  private uploadImageEndPoint = apiHost + 'note/upload/img';
  private notesEndPoint = apiHost + 'note';
  private publicNotesEndPoint = apiHost + 'note/public';

  constructor(private http: HttpClient) { }

  /**
   * Get notes
   * @param isPublic specify whether to get the public notes of all users or the user notes
   */
  public getNotes(isPublic?: boolean): Observable<Note[]> {
    // set the endpoint to user notes
    let endPoint = this.notesEndPoint;

    // if public get change the endpont to the public notes of all users
    if (isPublic) {
      endPoint = this.publicNotesEndPoint;
    }

    // get the notes
    return this.http.get<ResponseObject>(endPoint)
      .pipe(
        take(1),
        map((response) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // get the notes
          const notes: Note[] = response.data as Note[];
          return notes;
        }));
  }

  /**
   * Update a current note
   * @param note the note that should be updated
   */
  public updateNote(note: Note): Observable<string> {
    return this.http.put<ResponseObject>(this.notesEndPoint, new RequestObject(note))
      .pipe(
        take(1),
        map((response: ResponseObject) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // return success message
          const message: string = response.message;
          return message;
        }));
  }

  /**
   * Delete a current note
   * @param note the note that should be updated
   */
  public deleteNote(note: Note): Observable<string> {
    return this.http.delete<ResponseObject>(this.notesEndPoint + '/' + note.id)
      .pipe(
        take(1),
        map((response: ResponseObject) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // return success message
          const message: string = response.message;
          return message;
        }));
  }

  /**
   * Create a new note
   * @param note the note that should be created
   */
  public createNote(note: Note): Observable<string> {
    return this.http.post<ResponseObject>(this.notesEndPoint, new RequestObject(note))
      .pipe(
        take(1),
        map((response: ResponseObject) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // return the new note and the notify message
          return response.message;
        }));
  }

  /**
   * Upload Image to the server
   * @param imageFile file of types (.jpg, .png, .svg, .jpeg, .jfif, gif)
   */
  public uploadImage(imageFile: File): Observable<string> {

    // create form data including "imageFile" attribute
    const formData: FormData = new FormData();

    // attach the file to form data
    formData.append('imageFile', imageFile, imageFile.name);

    // assign the encoding type
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data'
    });

    return this.http.post<ResponseObject>(this.uploadImageEndPoint, formData, { headers })
      .pipe(
        take(1),
        map((response) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          console.log(response);
          // get the notes
          const image: string = response.data.imageUrl;
          return image;
        }));
  }
}
