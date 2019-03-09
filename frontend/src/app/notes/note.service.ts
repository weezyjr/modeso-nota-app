import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseObject } from '../models/Response';
import { RequestObject } from '../models/Request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Note } from '../models/Note';

// retrive the environment variable `api host` which stands for the backend url
const apiHost = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // endpoints
  private uploadImageEndPoint = apiHost + 'user/note/upload/image';
  private notesEndPoint = apiHost + 'user/note';
  private publicNotesEndPoint = apiHost + 'user/note/public';

  constructor(private http: HttpClient) { }

  /**
   * Login
   * @param username user->username
   * @param password user->password
   */
  public getMyNotes(): Observable<Note[]> {
    return this.http.get<ResponseObject>(this.notesEndPoint)
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
}
